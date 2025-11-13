import type { RepairMetricsDocument, SafeResult } from "../../../types";
import {
    createSafeErrorResult,
    createSafeSuccessResult,
    parseSyncSafe,
} from "../../../utils";
import {
    NotFoundError,
    PromiseRejectionError,
    WorkerError,
    WorkerMessageError,
} from "../../error/classes";
import { MONTHS } from "../constants";
import type { DashboardCalendarView, Month, Year } from "../types";
import { createRepairMetricsCardsSafe, type RepairMetricsCards } from "./cards";
import {
    createRepairMetricsCalendarChartsSafe,
    createRepairMetricsChartsSafe,
    type RepairMetricCalendarCharts,
    type RepairMetricsCharts,
    returnSelectedDateRepairMetricsSafe,
} from "./chartsData";
import { messageEventRepairChartsMainToWorkerZod } from "./schemas";

type MessageEventRepairChartsWorkerToMain = MessageEvent<
    SafeResult<
        {
            calendarChartsData: {
                currentYear: RepairMetricCalendarCharts;
                previousYear: RepairMetricCalendarCharts;
            };
            repairMetricsCharts: RepairMetricsCharts;
            repairMetricsCards: RepairMetricsCards;
        }
    >
>;
type MessageEventRepairChartsMainToWorker = MessageEvent<
    {
        calendarView: DashboardCalendarView;
        grayBorderShade: string;
        greenColorShade: string;
        repairMetricsDocument: RepairMetricsDocument;
        redColorShade: string;
        selectedDate: string;
        selectedMonth: Month;
        selectedYYYYMMDD: string;
        selectedYear: Year;
    }
>;

self.onmessage = async (
    event: MessageEventRepairChartsMainToWorker,
) => {
    try {
        if (!event.data) {
            self.postMessage(
                createSafeErrorResult(
                    new WorkerMessageError(
                        "No data received in repair charts worker message",
                    ),
                ),
            );
            return;
        }

        const parsedMessageResult = parseSyncSafe({
            object: event.data,
            zSchema: messageEventRepairChartsMainToWorkerZod,
        });
        if (parsedMessageResult.err) {
            self.postMessage(parsedMessageResult);
            return;
        }
        const parsedMessageMaybe = parsedMessageResult.safeUnwrap();
        if (parsedMessageMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Parsed message is none in repair charts worker",
                    ),
                ),
            );
            return;
        }
        const parsedMessage = parsedMessageMaybe.safeUnwrap();

        const {
            calendarView,
            grayBorderShade,
            greenColorShade,
            redColorShade,
            repairMetricsDocument,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYYYYMMDD,
        } = parsedMessage;

        const selectedDateRepairMetricsSafeResult =
            returnSelectedDateRepairMetricsSafe({
                repairMetricsDocument,
                day: selectedDate,
                month: selectedMonth,
                months: MONTHS,
                year: selectedYear,
            });
        if (selectedDateRepairMetricsSafeResult.err) {
            self.postMessage(
                selectedDateRepairMetricsSafeResult,
            );
            return;
        }
        const selectedDateRepairMetricsMaybe =
            selectedDateRepairMetricsSafeResult.safeUnwrap();
        if (selectedDateRepairMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No repair metrics found for the selected date",
                    ),
                ),
            );
            return;
        }
        const selectedDateRepairMetrics = selectedDateRepairMetricsMaybe
            .safeUnwrap();

        const createRepairMetricsCalendarChartsSafeResult =
            createRepairMetricsCalendarChartsSafe(
                calendarView,
                selectedDateRepairMetrics,
                selectedYYYYMMDD,
            );
        if (createRepairMetricsCalendarChartsSafeResult.err) {
            self.postMessage(
                createRepairMetricsCalendarChartsSafeResult,
            );
            return;
        }
        const repairMetricsCalendarChartsMaybe =
            createRepairMetricsCalendarChartsSafeResult.safeUnwrap();
        if (repairMetricsCalendarChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No repair metrics calendar charts found",
                    ),
                ),
            );
            return;
        }
        const repairMetricsCalendarCharts = repairMetricsCalendarChartsMaybe
            .safeUnwrap();

        const repairMetricsChartsSafeResult = createRepairMetricsChartsSafe({
            repairMetricsDocument,
            months: MONTHS,
            selectedDateRepairMetrics,
        });
        if (repairMetricsChartsSafeResult.err) {
            self.postMessage(
                repairMetricsChartsSafeResult,
            );
            return;
        }
        const repairMetricsChartsMaybe = repairMetricsChartsSafeResult
            .safeUnwrap();
        if (repairMetricsChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No repair metrics charts found",
                    ),
                ),
            );
            return;
        }
        const repairMetricsCharts = repairMetricsChartsMaybe.safeUnwrap();

        const repairMetricsCardsSafeResult = createRepairMetricsCardsSafe({
            grayBorderShade,
            greenColorShade,
            redColorShade,
            selectedDateRepairMetrics,
        });
        if (repairMetricsCardsSafeResult.err) {
            self.postMessage(
                repairMetricsCardsSafeResult,
            );
            return;
        }
        const repairMetricsCardsMaybe = repairMetricsCardsSafeResult
            .safeUnwrap();
        if (repairMetricsCardsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No repair metrics cards found",
                    ),
                ),
            );
            return;
        }
        const repairMetricsCards = repairMetricsCardsMaybe.safeUnwrap();

        self.postMessage(
            createSafeSuccessResult({
                calendarChartsData: repairMetricsCalendarCharts,
                repairMetricsCharts: repairMetricsCharts,
                repairMetricsCards: repairMetricsCards,
            }),
        );
        return;
    } catch (error) {
        console.error("Repair Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(
                new WorkerError(
                    error,
                    "Error in repair charts worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Repair Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new WorkerError(
                event,
                "Unhandled error in repair charts worker",
            ),
        ),
    );
    return true; // Prevents default logging to console
};

self.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    console.error("Unhandled promise rejection in worker:", event.reason);
    self.postMessage(
        createSafeErrorResult(
            new PromiseRejectionError(
                event.reason,
                "Unhandled promise rejection in repair charts worker",
            ),
        ),
    );
});

export type {
    MessageEventRepairChartsMainToWorker,
    MessageEventRepairChartsWorkerToMain,
};
