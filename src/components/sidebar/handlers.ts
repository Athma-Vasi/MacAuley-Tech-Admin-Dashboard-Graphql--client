import type { NavigateFunction } from "react-router-dom";
import { globalAction } from "../../context/globalProvider/actions";
import { type GlobalDispatch } from "../../context/globalProvider/types";
import type {
  CustomerMetricsDocument,
  FinancialMetricsDocument,
  ProductMetricsDocument,
  RepairMetricsDocument,
  SafeResult,
} from "../../types";
import {
  catchHandlerErrorSafe,
  createMetricsURLCacheKey,
  createSafeErrorResult,
  createSafeSuccessResult,
  makeTransition,
  parseSyncSafe,
} from "../../utils";
import type { MessageEventDashboardCacheWorkerToMain } from "../dashboard/cacheWorker";
import type { ProductMetricCategory } from "../dashboard/product/types";
import type { RepairMetricCategory } from "../dashboard/repair/types";
import type {
  AllStoreLocations,
  DashboardMetricsView,
} from "../dashboard/types";
import { InvariantError } from "../error/classes";
import {
  handleMessageEventMetricsCacheWorkerToMainInputZod,
  handleMetricCategoryNavClickInputZod,
} from "./schemas";

async function handleMessageEventMetricsCacheWorkerToMain(input: {
  event: MessageEventDashboardCacheWorkerToMain;
  globalDispatch: React.Dispatch<GlobalDispatch>;
  isComponentMountedRef: React.RefObject<boolean>;
  navigate: NavigateFunction;
  showBoundary: (error: unknown) => void;
}): Promise<SafeResult<string>> {
  try {
    const parsedResult = parseSyncSafe({
      object: input,
      zSchema: handleMessageEventMetricsCacheWorkerToMainInputZod,
    });
    if (parsedResult.err) {
      input?.showBoundary?.(parsedResult);
      return parsedResult;
    }
    if (parsedResult.val.none) {
      const safeErrorResult = createSafeErrorResult(
        new InvariantError(
          "Unexpected None option in input parsing",
        ),
      );
      input?.showBoundary?.(safeErrorResult);
      return safeErrorResult;
    }

    const {
      event,
      globalDispatch,
      isComponentMountedRef,
      navigate,
      showBoundary,
    } = parsedResult.val.val;

    const messageEventResult = event.data;
    if (!messageEventResult) {
      return createSafeErrorResult(
        new InvariantError("No data received from worker"),
      );
    }

    if (!isComponentMountedRef.current) {
      return createSafeErrorResult(
        new InvariantError("Component is not mounted"),
      );
    }

    if (messageEventResult.err) {
      showBoundary(messageEventResult);
      return messageEventResult;
    }

    if (messageEventResult.val.none) {
      const safeErrorResult = createSafeErrorResult(
        new InvariantError("No data received from the worker"),
      );
      showBoundary(safeErrorResult);
      return safeErrorResult;
    }

    const {
      metricsView,
      metricsDocument,
    } = messageEventResult.val.val;

    if (metricsView === "financials") {
      makeTransition(() => {
        globalDispatch({
          action: globalAction.setFinancialMetricsDocument,
          payload: metricsDocument as FinancialMetricsDocument,
        });
      });
    }

    if (metricsView === "products") {
      makeTransition(() => {
        globalDispatch({
          action: globalAction.setProductMetricsDocument,
          payload: metricsDocument as ProductMetricsDocument,
        });
      });
    }

    if (metricsView === "customers") {
      makeTransition(() => {
        globalDispatch({
          action: globalAction.setCustomerMetricsDocument,
          payload: metricsDocument as CustomerMetricsDocument,
        });
      });
    }

    if (metricsView === "repairs") {
      makeTransition(() => {
        globalDispatch({
          action: globalAction.setRepairMetricsDocument,
          payload: metricsDocument as RepairMetricsDocument,
        });
      });
    }

    globalDispatch({
      action: globalAction.setIsFetching,
      payload: false,
    });

    navigate(`/dashboard/${metricsView}`);
    return createSafeSuccessResult("Metrics fetch successful");
  } catch (error) {
    return catchHandlerErrorSafe(
      error,
      input?.isComponentMountedRef,
      input?.showBoundary,
    );
  }
}

async function handleMetricCategoryNavClick(
  input: {
    metricsCacheWorker: Worker | null;
    globalDispatch: React.Dispatch<GlobalDispatch>;
    isComponentMountedRef: React.RefObject<boolean>;
    metricsUrl: string;
    metricsView: Lowercase<DashboardMetricsView>;
    productMetricCategory: ProductMetricCategory;
    repairMetricCategory: RepairMetricCategory;
    showBoundary: (error: unknown) => void;
    storeLocation: AllStoreLocations;
  },
): Promise<SafeResult<string>> {
  const parsedInputResult = parseSyncSafe({
    object: input,
    zSchema: handleMetricCategoryNavClickInputZod,
  });
  if (parsedInputResult.err) {
    input?.showBoundary?.(parsedInputResult);
    return parsedInputResult;
  }
  if (parsedInputResult.val.none) {
    const safeErrorResult = createSafeErrorResult(
      new InvariantError(
        "Unexpected None option in input parsing",
      ),
    );
    input?.showBoundary?.(safeErrorResult);
    return safeErrorResult;
  }

  const {
    metricsCacheWorker,
    globalDispatch,
    metricsUrl,
    metricsView,
    productMetricCategory,
    repairMetricCategory,
    storeLocation,
  } = parsedInputResult.val.val;

  const cacheKey = createMetricsURLCacheKey({
    metricsView,
    metricsUrl,
    productMetricCategory,
    repairMetricCategory,
    storeLocation,
  });

  globalDispatch({
    action: globalAction.setIsFetching,
    payload: true,
  });

  try {
    metricsCacheWorker?.postMessage({
      metricsView,
      routesZodSchemaMapKey: metricsView,
      cacheKey,
    });

    return createSafeSuccessResult("Metrics fetch in progress");
  } catch (error: unknown) {
    return catchHandlerErrorSafe(
      error,
      input?.isComponentMountedRef,
      input?.showBoundary,
    );
  }
}

export {
  handleMessageEventMetricsCacheWorkerToMain,
  handleMetricCategoryNavClick,
};
