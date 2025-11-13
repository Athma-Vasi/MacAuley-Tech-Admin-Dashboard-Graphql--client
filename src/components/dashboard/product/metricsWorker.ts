import { Err, None, Ok } from "ts-results";
import { METRICS_URL, STORE_LOCATIONS } from "../../../constants";
import type {
    ProductMetricsDocument,
    SafeError,
    SafeResult,
} from "../../../types";
import {
    createDaysInMonthsInYearsSafe,
    createMetricsURLCacheKey,
    createSafeErrorResult,
    createSafeSuccessResult,
    setCachedItemAsyncSafe,
    settleManyPromisesIntoSafeResult,
} from "../../../utils";
import {
    CacheError,
    MetricsGenerationError,
    NotFoundError,
    PromiseRejectionError,
    WorkerMessageError,
} from "../../error/classes";
import type {
    AllStoreLocations,
    ProductCategory,
    ProductMetric,
    ProductYearlyMetric,
} from "../types";
import {
    createAllLocationsAggregatedProductMetricsSafe,
    createAllProductsAggregatedProductMetricsSafe,
    createRandomProductMetricsSafe,
} from "./generators";

type MessageEventProductMetricsWorkerToMain = MessageEvent<
    Err<SafeError> | Ok<None>
>;
type MessageEventProductMetricsMainToWorker = MessageEvent<
    boolean
>;

self.onmessage = async (
    event: MessageEventProductMetricsMainToWorker,
) => {
    if (!event.data) {
        self.postMessage(
            createSafeErrorResult(
                new WorkerMessageError(
                    "No data received in product metrics worker",
                ),
            ),
        );
        return;
    }

    try {
        const [
            calgaryProductMetricsSettledResult,
            edmontonProductMetricsSettledResult,
            vancouverProductMetricsSettledResult,
        ] = await Promise.allSettled(
            STORE_LOCATIONS.map(async ({ value: storeLocation }) => {
                try {
                    const daysInMonthsInYearsResult =
                        createDaysInMonthsInYearsSafe(
                            {
                                storeLocation,
                            },
                        );
                    if (daysInMonthsInYearsResult.err) {
                        return daysInMonthsInYearsResult;
                    }
                    const daysInMonthsInYearsMaybe = daysInMonthsInYearsResult
                        .safeUnwrap();
                    if (daysInMonthsInYearsMaybe.none) {
                        return createSafeErrorResult(
                            new NotFoundError(
                                "Days in Months in Years data not found",
                            ),
                        );
                    }
                    const daysInMonthsInYears = daysInMonthsInYearsMaybe
                        .safeUnwrap();

                    const productMetricsResult = createRandomProductMetricsSafe(
                        {
                            storeLocation,
                            daysInMonthsInYears,
                        },
                    );
                    if (productMetricsResult.err) {
                        return productMetricsResult;
                    }
                    const productMetricsMaybe = productMetricsResult
                        .safeUnwrap();
                    if (productMetricsMaybe.none) {
                        return createSafeErrorResult(
                            new NotFoundError(
                                "Product metrics not found",
                            ),
                        );
                    }
                    const productMetrics = productMetricsMaybe.safeUnwrap();

                    const aggregatedProductMetricsResult =
                        createAllProductsAggregatedProductMetricsSafe(
                            productMetrics,
                        );
                    if (aggregatedProductMetricsResult.err) {
                        return aggregatedProductMetricsResult;
                    }
                    const aggregatedProductMetricsMaybe =
                        aggregatedProductMetricsResult.safeUnwrap();
                    if (aggregatedProductMetricsMaybe.none) {
                        return createSafeErrorResult(
                            new NotFoundError(
                                "Aggregated product metrics not found",
                            ),
                        );
                    }
                    const aggregatedProductMetrics =
                        aggregatedProductMetricsMaybe.safeUnwrap();

                    const concatenatedMetrics = [
                        ...productMetrics,
                        aggregatedProductMetrics,
                    ];

                    const setMetricsInCacheResult =
                        await setProductMetricsInCache(
                            storeLocation,
                            concatenatedMetrics,
                        );
                    if (setMetricsInCacheResult.err) {
                        return setMetricsInCacheResult;
                    }

                    return createSafeSuccessResult(concatenatedMetrics);
                } catch (error: unknown) {
                    return createSafeErrorResult(
                        new PromiseRejectionError(
                            error,
                            `Failed to generate product metrics for ${storeLocation}`,
                        ),
                    );
                }
            }),
        );

        if (calgaryProductMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        calgaryProductMetricsSettledResult.reason,
                        "Calgary product metrics generation promise rejected",
                    ),
                ),
            );
            return;
        }

        if (calgaryProductMetricsSettledResult.value.err) {
            self.postMessage(
                calgaryProductMetricsSettledResult.value.err,
            );
            return;
        }

        const calgaryProductMetricsMaybe = calgaryProductMetricsSettledResult
            .value.safeUnwrap();
        if (calgaryProductMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError("Calgary product metrics not found"),
                ),
            );
            return;
        }

        const calgaryProductMetrics = calgaryProductMetricsMaybe.safeUnwrap();
        if (edmontonProductMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        edmontonProductMetricsSettledResult.reason,
                        "Edmonton product metrics generation promise rejected",
                    ),
                ),
            );
            return;
        }

        if (edmontonProductMetricsSettledResult.value.err) {
            self.postMessage(
                edmontonProductMetricsSettledResult.value.err,
            );
            return;
        }

        const edmontonProductMetricsMaybe = edmontonProductMetricsSettledResult
            .value.safeUnwrap();
        if (edmontonProductMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError("Edmonton product metrics not found"),
                ),
            );
            return;
        }

        const edmontonProductMetrics = edmontonProductMetricsMaybe.safeUnwrap();
        if (vancouverProductMetricsSettledResult.status === "rejected") {
            self.postMessage(
                vancouverProductMetricsSettledResult.reason,
            );
            return;
        }

        if (vancouverProductMetricsSettledResult.value.err) {
            self.postMessage(
                vancouverProductMetricsSettledResult.value.err,
            );
            return;
        }

        const vancouverProductMetricsMaybe =
            vancouverProductMetricsSettledResult
                .value.safeUnwrap();
        if (vancouverProductMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError("Vancouver product metrics not found"),
                ),
            );
            return;
        }
        const vancouverProductMetrics = vancouverProductMetricsMaybe
            .safeUnwrap();

        const allLocationsAggregatedProductMetricsResult =
            createAllLocationsAggregatedProductMetricsSafe({
                calgaryProductMetrics,
                edmontonProductMetrics,
                vancouverProductMetrics,
            });

        if (allLocationsAggregatedProductMetricsResult.err) {
            self.postMessage(
                allLocationsAggregatedProductMetricsResult.err,
            );
            return;
        }

        const allLocationsAggregatedProductMetricsMaybe =
            allLocationsAggregatedProductMetricsResult
                .safeUnwrap();
        if (allLocationsAggregatedProductMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "All Locations aggregated product metrics not found",
                    ),
                ),
            );
            return;
        }
        const allLocationsAggregatedProductMetrics =
            allLocationsAggregatedProductMetricsMaybe
                .safeUnwrap();

        const setAllLocationsMetricsInCacheResult =
            await setProductMetricsInCache(
                "All Locations",
                allLocationsAggregatedProductMetrics,
            );

        if (setAllLocationsMetricsInCacheResult.err) {
            self.postMessage(
                setAllLocationsMetricsInCacheResult.err,
            );
            return;
        }

        // for financial metrics generation
        const setProductMetricsCacheResult = await setCachedItemAsyncSafe(
            "productMetrics",
            {
                Calgary: calgaryProductMetrics,
                Edmonton: edmontonProductMetrics,
                Vancouver: vancouverProductMetrics,
                "All Locations": allLocationsAggregatedProductMetrics,
            },
        );
        if (setProductMetricsCacheResult.err) {
            self.postMessage(setProductMetricsCacheResult);
            return;
        }

        self.postMessage(new Ok(None));
    } catch (error) {
        console.error("Product Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(
                new MetricsGenerationError(
                    error,
                    "Failed to generate product metrics in worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Product Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new MetricsGenerationError(
                event,
                "Unhandled error in product metrics worker",
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
                "Unhandled promise rejection in product metrics worker",
            ),
        ),
    );
});

export type {
    MessageEventProductMetricsMainToWorker,
    MessageEventProductMetricsWorkerToMain,
};

function createProductMetricsDocument(
    metricCategory: "All Products" | ProductCategory,
    productMetrics: ProductYearlyMetric[],
    storeLocation: AllStoreLocations,
): ProductMetricsDocument {
    return {
        _id: createMetricsURLCacheKey({
            metricsUrl: METRICS_URL,
            metricsView: "products",
            productMetricCategory: metricCategory,
            repairMetricCategory: "All Repairs",
            storeLocation,
        }) ?? crypto.randomUUID(),
        __v: 0,
        createdAt: new Date().toISOString(),
        metricCategory,
        yearlyMetrics: productMetrics,
        storeLocation,
        updatedAt: new Date().toISOString(),
    };
}

async function setProductMetricsInCache(
    storeLocation: AllStoreLocations,
    metrics: ProductMetric[],
): Promise<SafeResult<None>> {
    try {
        const setItemResults = await Promise.allSettled(
            metrics.map(
                async (metric) => {
                    try {
                        const { name, yearlyMetrics } = metric;
                        const metricCacheKey = createMetricsURLCacheKey(
                            {
                                metricsUrl: METRICS_URL,
                                storeLocation,
                                metricsView: "products",
                                productMetricCategory: name,
                                repairMetricCategory: "All Repairs",
                            },
                        );

                        const setItemResult = await setCachedItemAsyncSafe(
                            metricCacheKey,
                            createProductMetricsDocument(
                                name,
                                yearlyMetrics,
                                storeLocation,
                            ),
                        );
                        if (setItemResult.err) {
                            return setItemResult;
                        }

                        return new Ok(None);
                    } catch (error) {
                        return createSafeErrorResult(
                            new PromiseRejectionError(
                                error,
                                `Failed to set product metric ${metric.name} in cache at ${storeLocation}`,
                            ),
                        );
                    }
                },
            ),
        );

        const handledSettledResult = settleManyPromisesIntoSafeResult(
            setItemResults,
        );
        if (handledSettledResult.err) {
            return handledSettledResult;
        }

        return handledSettledResult;
    } catch (error: unknown) {
        return createSafeErrorResult(
            new CacheError(
                error,
                `Failed to set product metrics in cache at ${storeLocation}`,
            ),
        );
    }
}
