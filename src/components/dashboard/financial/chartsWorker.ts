import type { FinancialMetricsDocument, SafeResult } from "../../../types";
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
import {
    createFinancialMetricsCardsSafe,
    type FinancialMetricsCards,
} from "./cards";
import {
    createFinancialMetricsCalendarChartsSafe,
    createFinancialMetricsChartsSafe,
    type FinancialMetricsCalendarCharts,
    type FinancialMetricsCharts,
    returnSelectedDateFinancialMetricsSafe,
} from "./chartsData";
import { messageEventFinancialChartsMainToWorkerZod } from "./schemas";

type MessageEventFinancialChartsWorkerToMain = MessageEvent<
    SafeResult<
        {
            calendarChartsData: {
                currentYear: FinancialMetricsCalendarCharts;
                previousYear: FinancialMetricsCalendarCharts;
            };
            financialMetricsCharts: FinancialMetricsCharts;
            financialMetricsCards: FinancialMetricsCards;
        }
    >
>;
type MessageEventFinancialChartsMainToWorker = MessageEvent<
    {
        calendarView: DashboardCalendarView;
        grayBorderShade: string;
        greenColorShade: string;
        financialMetricsDocument: FinancialMetricsDocument;
        redColorShade: string;
        selectedDate: string;
        selectedMonth: Month;
        selectedYYYYMMDD: string;
        selectedYear: Year;
    }
>;

self.onmessage = async (
    event: MessageEventFinancialChartsMainToWorker,
) => {
    try {
        if (!event.data) {
            self.postMessage(
                createSafeErrorResult(
                    new WorkerMessageError(
                        "No data received in financial charts worker message",
                    ),
                ),
            );
            return;
        }

        const parsedMessageResult = parseSyncSafe({
            object: event.data,
            zSchema: messageEventFinancialChartsMainToWorkerZod,
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
                        "Parsed message is none in financial charts worker",
                    ),
                ),
            );
            return;
        }

        const {
            calendarView,
            grayBorderShade,
            greenColorShade,
            redColorShade,
            financialMetricsDocument,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYYYYMMDD,
        } = parsedMessageMaybe.safeUnwrap();

        const selectedDateFinancialMetricsSafeResult =
            returnSelectedDateFinancialMetricsSafe({
                financialMetricsDocument,
                day: selectedDate,
                month: selectedMonth,
                months: MONTHS,
                year: selectedYear,
            });
        if (selectedDateFinancialMetricsSafeResult.err) {
            self.postMessage(selectedDateFinancialMetricsSafeResult);
            return;
        }
        const selectedDateFinancialMetricsMaybe =
            selectedDateFinancialMetricsSafeResult.safeUnwrap();
        if (selectedDateFinancialMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Selected date financial metrics is none in financial charts worker",
                    ),
                ),
            );
            return;
        }
        const selectedDateFinancialMetrics = selectedDateFinancialMetricsMaybe
            .safeUnwrap();

        const financialMetricsCalendarChartsSafeResult =
            createFinancialMetricsCalendarChartsSafe(
                calendarView,
                selectedDateFinancialMetrics,
                selectedYYYYMMDD,
            );
        if (financialMetricsCalendarChartsSafeResult.err) {
            self.postMessage(financialMetricsCalendarChartsSafeResult);
            return;
        }
        const financialMetricsCalendarChartsMaybe =
            financialMetricsCalendarChartsSafeResult.safeUnwrap();
        if (financialMetricsCalendarChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No financial metrics calendar charts found",
                    ),
                ),
            );
            return;
        }
        const financialMetricsCalendarCharts =
            financialMetricsCalendarChartsMaybe.safeUnwrap();

        const financialMetricsChartsSafeResult =
            createFinancialMetricsChartsSafe({
                financialMetricsDocument,
                months: MONTHS,
                selectedDateFinancialMetrics,
            });
        if (financialMetricsChartsSafeResult.err) {
            self.postMessage(financialMetricsChartsSafeResult);
            return;
        }
        const financialMetricsChartsMaybe = financialMetricsChartsSafeResult
            .safeUnwrap();
        if (financialMetricsChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No financial metrics charts found",
                    ),
                ),
            );
            return;
        }
        const financialMetricsCharts = financialMetricsChartsMaybe.safeUnwrap();

        const financialMetricsCardsSafeResult = createFinancialMetricsCardsSafe(
            {
                grayBorderShade,
                greenColorShade,
                redColorShade,
                selectedDateFinancialMetrics,
            },
        );
        if (financialMetricsCardsSafeResult.err) {
            self.postMessage(financialMetricsCardsSafeResult);
            return;
        }
        const financialMetricsCardsMaybe = financialMetricsCardsSafeResult
            .safeUnwrap();
        if (financialMetricsCardsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No financial metrics cards found",
                    ),
                ),
            );
            return;
        }
        const financialMetricsCards = financialMetricsCardsMaybe.safeUnwrap();

        self.postMessage(
            createSafeSuccessResult({
                calendarChartsData: financialMetricsCalendarCharts,
                financialMetricsCharts,
                financialMetricsCards,
            }),
        );
        return;
    } catch (error) {
        console.error("Financial Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(
                new WorkerError(
                    error,
                    "Error in Financial Charts Worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Financial Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new WorkerError(
                event,
                "Unhandled error in Financial Charts Worker",
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
                "Unhandled promise rejection in Financial Charts Worker",
            ),
        ),
    );
});

export type {
    MessageEventFinancialChartsMainToWorker,
    MessageEventFinancialChartsWorkerToMain,
};
