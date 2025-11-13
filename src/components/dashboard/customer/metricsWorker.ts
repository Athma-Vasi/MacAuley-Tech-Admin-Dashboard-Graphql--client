import { Err, None, Ok } from "ts-results";
import { METRICS_URL, STORE_LOCATIONS } from "../../../constants";
import type {
    CustomerMetricsDocument,
    SafeError,
    SafeResult,
} from "../../../types";
import {
    createDaysInMonthsInYearsSafe,
    createMetricsURLCacheKey,
    createSafeErrorResult,
    createSafeSuccessResult,
    setCachedItemAsyncSafe,
} from "../../../utils";
import {
    CacheError,
    MetricsGenerationError,
    NotFoundError,
    PromiseRejectionError,
    WorkerMessageError,
} from "../../error/classes";
import type { AllStoreLocations, CustomerMetrics } from "../types";
import {
    createAllLocationsAggregatedCustomerMetricsSafe,
    createRandomCustomerMetricsSafe,
} from "./generators";

type MessageEventCustomerMetricsWorkerToMain = MessageEvent<
    Err<SafeError> | Ok<None>
>;
type MessageEventCustomerMetricsMainToWorker = MessageEvent<
    boolean
>;

self.onmessage = async (
    event: MessageEventCustomerMetricsMainToWorker,
) => {
    if (!event.data) {
        self.postMessage(
            createSafeErrorResult(
                new WorkerMessageError(
                    "No data received in customer metrics worker",
                ),
            ),
        );
        return;
    }

    try {
        const [
            calgaryCustomerMetricsSettledResult,
            edmontonCustomerMetricsSettledResult,
            vancouverCustomerMetricsSettledResult,
        ] = await Promise.allSettled(
            STORE_LOCATIONS.map(async ({ value: storeLocation }) => {
                try {
                    const daysInMonthsInYearsResult =
                        createDaysInMonthsInYearsSafe({
                            storeLocation,
                        });
                    if (daysInMonthsInYearsResult.err) {
                        return daysInMonthsInYearsResult;
                    }

                    const daysInMonthsInYearsMaybe = daysInMonthsInYearsResult
                        .safeUnwrap();
                    if (daysInMonthsInYearsMaybe.none) {
                        return createSafeErrorResult(
                            new NotFoundError(
                                `Days in months in years data not found for store location: ${storeLocation}`,
                            ),
                        );
                    }
                    const daysInMonthsInYears = daysInMonthsInYearsMaybe
                        .safeUnwrap();

                    const customerMetricsResult =
                        createRandomCustomerMetricsSafe({
                            storeLocation,
                            daysInMonthsInYears,
                        });
                    if (customerMetricsResult.err) {
                        return customerMetricsResult;
                    }
                    const customerMetricsMaybe = customerMetricsResult
                        .safeUnwrap();
                    if (customerMetricsMaybe.none) {
                        return createSafeErrorResult(
                            new NotFoundError(
                                `Customer metrics data not found for store location: ${storeLocation}`,
                            ),
                        );
                    }
                    const customerMetrics = customerMetricsMaybe
                        .safeUnwrap();

                    const setMetricsInCacheResult =
                        await setCustomerMetricsInCache(
                            storeLocation,
                            customerMetrics,
                        );
                    if (setMetricsInCacheResult.err) {
                        return setMetricsInCacheResult;
                    }

                    return createSafeSuccessResult(customerMetrics);
                } catch (error: unknown) {
                    return createSafeErrorResult(
                        new MetricsGenerationError(
                            error,
                            `Failed to generate customer metrics for store location: ${storeLocation}`,
                        ),
                    );
                }
            }),
        );

        if (calgaryCustomerMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        calgaryCustomerMetricsSettledResult.reason,
                        "Calgary customer metrics promise rejected",
                    ),
                ),
            );
            return;
        }

        if (calgaryCustomerMetricsSettledResult.value.err) {
            self.postMessage(
                calgaryCustomerMetricsSettledResult.value,
            );
            return;
        }
        const calgaryCustomerMetricsMaybe = calgaryCustomerMetricsSettledResult
            .value.safeUnwrap();

        if (calgaryCustomerMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Calgary customer metrics is none",
                    ),
                ),
            );
            return;
        }
        const calgaryCustomerMetrics = calgaryCustomerMetricsMaybe
            .safeUnwrap();

        if (edmontonCustomerMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        edmontonCustomerMetricsSettledResult.reason,
                        "Edmonton customer metrics promise rejected",
                    ),
                ),
            );
            return;
        }

        if (edmontonCustomerMetricsSettledResult.value.err) {
            self.postMessage(
                edmontonCustomerMetricsSettledResult.value,
            );
            return;
        }
        const edmontonCustomerMetricsMaybe =
            edmontonCustomerMetricsSettledResult
                .value.safeUnwrap();

        if (edmontonCustomerMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Edmonton customer metrics is none",
                    ),
                ),
            );
            return;
        }
        const edmontonCustomerMetrics = edmontonCustomerMetricsMaybe
            .safeUnwrap();

        if (vancouverCustomerMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        vancouverCustomerMetricsSettledResult.reason,
                        "Vancouver customer metrics promise rejected",
                    ),
                ),
            );
            return;
        }

        if (vancouverCustomerMetricsSettledResult.value.err) {
            self.postMessage(
                vancouverCustomerMetricsSettledResult.value,
            );
            return;
        }
        const vancouverCustomerMetricsMaybe =
            vancouverCustomerMetricsSettledResult
                .value.safeUnwrap();

        if (vancouverCustomerMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Vancouver customer metrics is none",
                    ),
                ),
            );
            return;
        }
        const vancouverCustomerMetrics = vancouverCustomerMetricsMaybe
            .safeUnwrap();

        const allLocationsAggregatedCustomerMetricsResult =
            createAllLocationsAggregatedCustomerMetricsSafe({
                calgaryCustomerMetrics,
                edmontonCustomerMetrics,
                vancouverCustomerMetrics,
            });

        if (allLocationsAggregatedCustomerMetricsResult.err) {
            self.postMessage(
                allLocationsAggregatedCustomerMetricsResult.err,
            );
            return;
        }
        const allLocationsAggregatedCustomerMetricsMaybe =
            allLocationsAggregatedCustomerMetricsResult
                .safeUnwrap();

        if (allLocationsAggregatedCustomerMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "All locations aggregated customer metrics is none",
                    ),
                ),
            );
            return;
        }
        const allLocationsAggregatedCustomerMetrics =
            allLocationsAggregatedCustomerMetricsMaybe
                .safeUnwrap();

        const setAllLocationsMetricsInCacheResult =
            await setCustomerMetricsInCache(
                "All Locations",
                allLocationsAggregatedCustomerMetrics,
            );

        if (setAllLocationsMetricsInCacheResult.err) {
            self.postMessage(
                setAllLocationsMetricsInCacheResult.err,
            );
            return;
        }

        self.postMessage(new Ok(None));
    } catch (error: unknown) {
        console.error("Customer Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(
                new MetricsGenerationError(
                    error,
                    "Failed to generate customer metrics in worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Customer Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new MetricsGenerationError(
                event,
                "Unhandled error in customer metrics worker",
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
                "Unhandled promise rejection in customer metrics worker",
            ),
        ),
    );
});

export type {
    MessageEventCustomerMetricsMainToWorker,
    MessageEventCustomerMetricsWorkerToMain,
};

function createCustomerMetricsDocument(
    storeLocation: AllStoreLocations,
    customerMetrics: CustomerMetrics,
): CustomerMetricsDocument {
    return {
        _id: createMetricsURLCacheKey({
            metricsUrl: METRICS_URL,
            metricsView: "customers",
            productMetricCategory: "All Products",
            repairMetricCategory: "All Repairs",
            storeLocation,
        }) ?? crypto.randomUUID(),
        __v: 0,
        createdAt: new Date().toISOString(),
        customerMetrics,
        storeLocation,
        updatedAt: new Date().toISOString(),
    };
}

async function setCustomerMetricsInCache(
    storeLocation: AllStoreLocations,
    metrics: CustomerMetrics,
): Promise<SafeResult<None>> {
    try {
        const metricCacheKey = createMetricsURLCacheKey(
            {
                metricsUrl: METRICS_URL,
                storeLocation,
                metricsView: "customers",
                productMetricCategory: "All Products",
                repairMetricCategory: "All Repairs",
            },
        );
        const setMetricsResult = await setCachedItemAsyncSafe(
            metricCacheKey,
            createCustomerMetricsDocument(
                storeLocation,
                metrics,
            ),
        );
        if (setMetricsResult.err) {
            return setMetricsResult;
        }

        return new Ok(None);
    } catch (error: unknown) {
        return createSafeErrorResult(
            new CacheError(
                error,
                `Failed to set customer metrics in cache for store location: ${storeLocation}`,
            ),
        );
    }
}
