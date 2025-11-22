import {
    globalAction,
    type GlobalDispatch,
} from "../../context/globalProvider";
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
import {
    InvariantError,
    MessageHandlerError,
    NotFoundError,
} from "../error/classes";
import { dashboardAction } from "./actions";
import type { MessageEventDashboardCacheWorkerToMain } from "./cacheWorker";
import type { ProductMetricCategory } from "./product/types";
import type { RepairMetricCategory } from "./repair/types";
import {
    handleMessageEventDashboardCacheWorkerToMainInputZod,
    handleStoreAndCategoryClicksInputZod,
} from "./schemas";
import type {
    AllStoreLocations,
    DashboardDispatch,
    DashboardMetricsView,
} from "./types";

async function handleStoreAndCategoryClicks(
    input: {
        dashboardDispatch: React.Dispatch<DashboardDispatch>;
        dashboardCacheWorker: Worker | null;
        isComponentMountedRef: React.RefObject<boolean>;
        metricsUrl: string;
        metricsView: Lowercase<DashboardMetricsView>;
        productMetricCategory: ProductMetricCategory;
        repairMetricCategory: RepairMetricCategory;
        showBoundary: (error: unknown) => void;
        storeLocation: AllStoreLocations;
    },
): Promise<SafeResult<string>> {
    try {
        const parsedInputResult = parseSyncSafe({
            object: input,
            zSchema: handleStoreAndCategoryClicksInputZod,
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
            dashboardDispatch,
            dashboardCacheWorker,
            metricsUrl,
            metricsView,
            productMetricCategory,
            repairMetricCategory,
            storeLocation,
        } = parsedInputResult.val.val;

        const cacheKey = createMetricsURLCacheKey({
            metricsUrl,
            metricsView,
            productMetricCategory,
            repairMetricCategory,
            storeLocation,
        });

        dashboardDispatch({
            action: dashboardAction.setIsLoading,
            payload: true,
        });

        dashboardCacheWorker?.postMessage({
            metricsView,
            routesZodSchemaMapKey: "dashboard",
            cacheKey,
        });

        return createSafeSuccessResult("Data fetching started");
    } catch (error) {
        return catchHandlerErrorSafe(
            error,
            input?.isComponentMountedRef,
            input?.showBoundary,
        );
    }
}

async function handleMessageEventDashboardCacheWorkerToMain(
    input: {
        dashboardDispatch: React.Dispatch<DashboardDispatch>;
        event: MessageEventDashboardCacheWorkerToMain;
        globalDispatch: React.Dispatch<GlobalDispatch>;
        isComponentMountedRef: React.RefObject<boolean>;
    },
): Promise<undefined> {
    try {
        const parsedInputResult = parseSyncSafe({
            object: input,
            zSchema: handleMessageEventDashboardCacheWorkerToMainInputZod,
        });
        if (parsedInputResult.err) {
            input?.dashboardDispatch?.({
                action: dashboardAction.setSafeErrorResult,
                payload: parsedInputResult,
            });
            return;
        }
        const parsedInputMaybe = parsedInputResult.safeUnwrap();
        if (parsedInputMaybe.none) {
            input?.dashboardDispatch?.({
                action: dashboardAction.setSafeErrorResult,
                payload: createSafeErrorResult(
                    new NotFoundError(
                        "Parsed input is none in dashboard cache worker to main handler",
                    ),
                ),
            });
            return;
        }

        const {
            dashboardDispatch,
            event,
            globalDispatch,
            isComponentMountedRef,
        } = parsedInputMaybe.safeUnwrap();

        if (!isComponentMountedRef.current) {
            return;
        }

        const messageEventResult = event.data;
        if (messageEventResult.err) {
            dashboardDispatch({
                action: dashboardAction.setSafeErrorResult,
                payload: messageEventResult,
            });
            return;
        }
        const messageEventMaybe = messageEventResult.safeUnwrap();
        if (messageEventMaybe.none) {
            dashboardDispatch({
                action: dashboardAction.setSafeErrorResult,
                payload: createSafeErrorResult(
                    new NotFoundError(
                        "Message event data is none in dashboard cache worker to main handler",
                    ),
                ),
            });
            return;
        }

        const { metricsDocument, metricsView } = messageEventMaybe.safeUnwrap();

        console.group("Dashboard Cache Worker to Main Handler");
        console.log("metricsView:", metricsView);
        console.log("metricsDocument:", metricsDocument);
        console.groupEnd();

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

        makeTransition(() => {
            dashboardDispatch({
                action: dashboardAction.setIsLoading,
                payload: false,
            });
        });

        makeTransition(() => {
            dashboardDispatch({
                action: dashboardAction.setSafeErrorResult,
                payload: null,
            });
        });

        return;
    } catch (error: unknown) {
        input?.dashboardDispatch?.({
            action: dashboardAction.setSafeErrorResult,
            payload: createSafeErrorResult(
                new MessageHandlerError(
                    error,
                    "Error in handling message event from dashboard cache worker to main",
                ),
            ),
        });
        return;
    }
}

export {
    handleMessageEventDashboardCacheWorkerToMain,
    handleStoreAndCategoryClicks,
};
