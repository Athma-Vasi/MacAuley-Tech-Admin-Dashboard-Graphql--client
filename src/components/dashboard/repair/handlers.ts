import type { SafeResult } from "../../../types";
import {
    catchHandlerErrorSafe,
    createSafeErrorResult,
    createSafeSuccessResult,
    makeTransition,
    parseSyncSafe,
} from "../../../utils";
import { InvariantError } from "../../error/classes";
import { repairMetricsAction } from "./actions";
import type { MessageEventRepairChartsWorkerToMain } from "./chartsWorker";
import { handleMessageEventRepairWorkerToMainInputZod } from "./schemas";
import type { RepairMetricsDispatch } from "./types";

async function handleMessageEventRepairChartsWorkerToMain(input: {
    event: MessageEventRepairChartsWorkerToMain;
    isComponentMountedRef: React.RefObject<boolean>;
    repairMetricsDispatch: React.Dispatch<RepairMetricsDispatch>;
    showBoundary: (error: unknown) => void;
}): Promise<SafeResult<string>> {
    try {
        const parsedInputResult = parseSyncSafe({
            object: input,
            zSchema: handleMessageEventRepairWorkerToMainInputZod,
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
            event,
            isComponentMountedRef,
            repairMetricsDispatch,
            showBoundary,
        } = parsedInputResult.val.val;

        if (!isComponentMountedRef.current) {
            return createSafeErrorResult(
                new InvariantError("Component is not mounted"),
            );
        }

        const messageEventResult = event.data;
        if (!messageEventResult) {
            const safeErrorResult = createSafeErrorResult(
                new InvariantError("No data received from the worker"),
            );
            input?.showBoundary?.(safeErrorResult);
            return safeErrorResult;
        }
        if (messageEventResult.err) {
            showBoundary(messageEventResult);
            return messageEventResult;
        }
        if (messageEventResult.val.none) {
            const safeErrorResult = createSafeErrorResult(
                new InvariantError("Error parsing message event"),
            );
            showBoundary(safeErrorResult);
            return safeErrorResult;
        }

        const {
            calendarChartsData,
            repairMetricsCharts,
            repairMetricsCards,
        } = messageEventResult.val.val;

        makeTransition(() => {
            repairMetricsDispatch({
                action: repairMetricsAction.setCalendarChartsData,
                payload: calendarChartsData,
            });
        });

        makeTransition(() => {
            repairMetricsDispatch({
                action: repairMetricsAction.setCharts,
                payload: repairMetricsCharts,
            });
        });

        makeTransition(() => {
            repairMetricsDispatch({
                action: repairMetricsAction.setCards,
                payload: repairMetricsCards,
            });
        });

        return createSafeSuccessResult(
            "Repair metrics data updated successfully",
        );
    } catch (error: unknown) {
        return catchHandlerErrorSafe(
            error,
            input?.isComponentMountedRef,
            input?.showBoundary,
        );
    }
}

export { handleMessageEventRepairChartsWorkerToMain };
