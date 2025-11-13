import type { ProductMetricsDocument, SafeResult } from "../../../types";
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
    createProductMetricsCardsSafe,
    type ProductMetricsCards,
} from "./cards";
import {
    createProductMetricsCalendarChartsSafe,
    createProductMetricsChartsSafe,
    type ProductMetricsCalendarCharts,
    type ProductMetricsCharts,
    returnSelectedDateProductMetricsSafe,
} from "./chartsData";
import { messageEventProductChartsMainToWorkerZod } from "./schemas";

type MessageEventProductChartsWorkerToMain = MessageEvent<
    SafeResult<
        {
            calendarChartsData: {
                currentYear: ProductMetricsCalendarCharts;
                previousYear: ProductMetricsCalendarCharts;
            };
            productMetricsCharts: ProductMetricsCharts;
            productMetricsCards: ProductMetricsCards;
        }
    >
>;
type MessageEventProductChartsMainToWorker = MessageEvent<
    {
        calendarView: DashboardCalendarView;
        grayBorderShade: string;
        greenColorShade: string;
        productMetricsDocument: ProductMetricsDocument;
        redColorShade: string;
        selectedDate: string;
        selectedMonth: Month;
        selectedYYYYMMDD: string;
        selectedYear: Year;
    }
>;

self.onmessage = async (
    event: MessageEventProductChartsMainToWorker,
) => {
    try {
        if (!event.data) {
            self.postMessage(
                createSafeErrorResult(
                    new WorkerMessageError(
                        "No data received in product charts worker message",
                    ),
                ),
            );
            return;
        }

        const parsedMessageResult = parseSyncSafe({
            object: event.data,
            zSchema: messageEventProductChartsMainToWorkerZod,
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
                        "Parsed message is none in product charts worker",
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
            productMetricsDocument,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYYYYMMDD,
        } = parsedMessageMaybe.safeUnwrap();

        const selectedDateProductMetricsSafeResult =
            returnSelectedDateProductMetricsSafe({
                productMetricsDocument,
                day: selectedDate,
                month: selectedMonth,
                months: MONTHS,
                year: selectedYear,
            });
        if (selectedDateProductMetricsSafeResult.err) {
            self.postMessage(selectedDateProductMetricsSafeResult);
            return;
        }
        const selectedDateProductMetricsMaybe =
            selectedDateProductMetricsSafeResult.safeUnwrap();
        if (selectedDateProductMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Selected date product metrics not found",
                    ),
                ),
            );
            return;
        }
        const selectedDateProductMetrics = selectedDateProductMetricsMaybe
            .safeUnwrap();

        const productMetricsCalendarChartsSafeResult =
            createProductMetricsCalendarChartsSafe(
                calendarView,
                selectedDateProductMetrics,
                selectedYYYYMMDD,
            );
        if (productMetricsCalendarChartsSafeResult.err) {
            self.postMessage(productMetricsCalendarChartsSafeResult);
            return;
        }
        const productMetricsCalendarChartsMaybe =
            productMetricsCalendarChartsSafeResult.safeUnwrap();
        if (productMetricsCalendarChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No product metrics calendar charts found",
                    ),
                ),
            );
            return;
        }
        const productMetricsCalendarCharts = productMetricsCalendarChartsMaybe
            .safeUnwrap();

        const productMetricsChartsSafeResult = createProductMetricsChartsSafe({
            productMetricsDocument,
            months: MONTHS,
            selectedDateProductMetrics,
        });
        if (productMetricsChartsSafeResult.err) {
            self.postMessage(productMetricsChartsSafeResult);
            return;
        }
        const productMetricsChartsMaybe = productMetricsChartsSafeResult
            .safeUnwrap();
        if (productMetricsChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No product metrics charts found",
                    ),
                ),
            );
            return;
        }
        const productMetricsCharts = productMetricsChartsMaybe
            .safeUnwrap();

        const productMetricsCardsSafeResult = createProductMetricsCardsSafe({
            grayBorderShade,
            greenColorShade,
            redColorShade,
            selectedDateProductMetrics,
        });
        if (productMetricsCardsSafeResult.err) {
            self.postMessage(productMetricsCardsSafeResult);
            return;
        }
        const productMetricsCardsMaybe = productMetricsCardsSafeResult
            .safeUnwrap();
        if (productMetricsCardsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No product metrics cards found",
                    ),
                ),
            );
            return;
        }
        const productMetricsCards = productMetricsCardsMaybe
            .safeUnwrap();

        self.postMessage(
            createSafeSuccessResult({
                calendarChartsData: productMetricsCalendarCharts,
                productMetricsCharts,
                productMetricsCards,
            }),
        );
        return;
    } catch (error) {
        console.error("Product Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(
                new WorkerError(
                    error,
                    "Error in Product Charts Worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Product Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new WorkerError(
                event,
                "Unhandled error in Product Charts Worker",
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
                "Unhandled promise rejection in Product Charts Worker",
            ),
        ),
    );
});

export type {
    MessageEventProductChartsMainToWorker,
    MessageEventProductChartsWorkerToMain,
};
