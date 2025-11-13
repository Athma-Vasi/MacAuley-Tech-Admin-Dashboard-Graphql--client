import type { CustomerMetricsDocument, SafeResult } from "../../../types";
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
    createCustomerMetricsCardsSafe,
    type CustomerMetricsCards,
} from "./cards";
import {
    createCustomerMetricsCalendarChartsSafe,
    createCustomerMetricsChartsSafe,
    type CustomerMetricsCalendarCharts,
    type CustomerMetricsCharts,
    returnSelectedDateCustomerMetricsSafe,
} from "./chartsData";
import { messageEventCustomerChartsMainToWorkerZod } from "./schemas";

type MessageEventCustomerChartsWorkerToMain = MessageEvent<
    SafeResult<
        {
            calendarChartsData: {
                currentYear: CustomerMetricsCalendarCharts;
                previousYear: CustomerMetricsCalendarCharts;
            };
            customerMetricsCharts: CustomerMetricsCharts;
            customerMetricsCards: CustomerMetricsCards;
        }
    >
>;
type MessageEventCustomerChartsMainToWorker = MessageEvent<
    {
        calendarView: DashboardCalendarView;
        grayBorderShade: string;
        greenColorShade: string;
        customerMetricsDocument: CustomerMetricsDocument;
        redColorShade: string;
        selectedDate: string;
        selectedMonth: Month;
        selectedYYYYMMDD: string;
        selectedYear: Year;
    }
>;

self.onmessage = async (
    event: MessageEventCustomerChartsMainToWorker,
) => {
    try {
        if (!event.data) {
            self.postMessage(
                createSafeErrorResult(
                    new WorkerMessageError(
                        "No data received in customer charts worker message",
                    ),
                ),
            );
            return;
        }

        const parsedMessageResult = parseSyncSafe({
            object: event.data,
            zSchema: messageEventCustomerChartsMainToWorkerZod,
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
                        "Parsed customer charts message data is none",
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
            customerMetricsDocument,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYYYYMMDD,
        } = parsedMessageMaybe.safeUnwrap();

        const selectedDateCustomerMetricsSafeResult =
            returnSelectedDateCustomerMetricsSafe({
                customerMetricsDocument,
                day: selectedDate,
                month: selectedMonth,
                months: MONTHS,
                year: selectedYear,
            });
        if (selectedDateCustomerMetricsSafeResult.err) {
            self.postMessage(selectedDateCustomerMetricsSafeResult);
            return;
        }
        const selectedDateCustomerMetricsMaybe =
            selectedDateCustomerMetricsSafeResult.safeUnwrap();
        if (selectedDateCustomerMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No selected date customer metrics found",
                    ),
                ),
            );
            return;
        }
        const selectedDateCustomerMetrics = selectedDateCustomerMetricsMaybe
            .safeUnwrap();

        const customerMetricsCalendarChartsSafeResult =
            createCustomerMetricsCalendarChartsSafe(
                calendarView,
                selectedDateCustomerMetrics,
                selectedYYYYMMDD,
            );
        if (customerMetricsCalendarChartsSafeResult.err) {
            self.postMessage(customerMetricsCalendarChartsSafeResult);
            return;
        }
        const customerMetricsCalendarChartsMaybe =
            customerMetricsCalendarChartsSafeResult.safeUnwrap();
        if (customerMetricsCalendarChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No customer metrics calendar charts found",
                    ),
                ),
            );
            return;
        }
        const customerMetricsCalendarCharts = customerMetricsCalendarChartsMaybe
            .safeUnwrap();

        const customerMetricsChartsSafeResult = createCustomerMetricsChartsSafe(
            {
                customerMetricsDocument,
                months: MONTHS,
                selectedDateCustomerMetrics,
            },
        );
        if (customerMetricsChartsSafeResult.err) {
            self.postMessage(customerMetricsChartsSafeResult);
            return;
        }
        const customerMetricsChartsMaybe = customerMetricsChartsSafeResult
            .safeUnwrap();
        if (customerMetricsChartsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No customer metrics charts found",
                    ),
                ),
            );
            return;
        }
        const customerMetricsCharts = customerMetricsChartsMaybe.safeUnwrap();

        const customerMetricsCardsSafeResult = createCustomerMetricsCardsSafe(
            {
                grayBorderShade,
                greenColorShade,
                redColorShade,
                selectedDateCustomerMetrics,
            },
        );
        if (customerMetricsCardsSafeResult.err) {
            self.postMessage(customerMetricsCardsSafeResult);
            return;
        }
        const customerMetricsCardsMaybe = customerMetricsCardsSafeResult
            .safeUnwrap();
        if (customerMetricsCardsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No customer metrics cards found",
                    ),
                ),
            );
            return;
        }
        const customerMetricsCards = customerMetricsCardsMaybe.safeUnwrap();

        self.postMessage(
            createSafeSuccessResult({
                calendarChartsData: customerMetricsCalendarCharts,
                customerMetricsCharts,
                customerMetricsCards,
            }),
        );
        return;
    } catch (error) {
        console.error("Customer Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(
                new WorkerError(
                    error,
                    "Error in Customer Charts Worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Customer Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new WorkerError(
                event,
                "Unhandled error in Customer Charts Worker",
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
                "Unhandled promise rejection in Customer Charts Worker",
            ),
        ),
    );
});

export type {
    MessageEventCustomerChartsMainToWorker,
    MessageEventCustomerChartsWorkerToMain,
};
