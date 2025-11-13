import { Err, None, Ok } from "ts-results";
import { METRICS_URL, STORE_LOCATIONS } from "../../../constants";
import type {
    RepairMetricsDocument,
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
    RepairCategory,
    RepairMetric,
    RepairYearlyMetric,
} from "../types";
import {
    createAllLocationsAggregatedRepairMetricsSafe,
    createAllRepairsAggregatedRepairMetricsSafe,
    createRandomRepairMetricsSafe,
} from "./generators";

type MessageEventRepairMetricsWorkerToMain = MessageEvent<
    Err<SafeError> | Ok<None>
>;
type MessageEventRepairMetricsMainToWorker = MessageEvent<
    boolean
>;

self.onmessage = async (
    event: MessageEventRepairMetricsMainToWorker,
) => {
    if (!event.data) {
        self.postMessage(
            createSafeErrorResult(
                new WorkerMessageError("No data received in worker message"),
            ),
        );
        return;
    }

    try {
        const [
            calgaryRepairMetricsSettledResult,
            edmontonRepairMetricsSettledResult,
            vancouverRepairMetricsSettledResult,
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
                                `DaysInMonthsInYears data not found for store location: ${storeLocation}`,
                            ),
                        );
                    }
                    const daysInMonthsInYears = daysInMonthsInYearsMaybe
                        .safeUnwrap();

                    const repairMetricsResult = createRandomRepairMetricsSafe(
                        {
                            storeLocation,
                            daysInMonthsInYears,
                        },
                    );
                    if (repairMetricsResult.err) {
                        return repairMetricsResult;
                    }
                    const repairMetricsMaybe = repairMetricsResult
                        .safeUnwrap();
                    if (repairMetricsMaybe.none) {
                        return createSafeErrorResult(
                            new NotFoundError(
                                `Repair metrics data not found for store location: ${storeLocation}`,
                            ),
                        );
                    }
                    const repairMetrics = repairMetricsMaybe
                        .safeUnwrap();

                    const aggregatedRepairMetricsResult =
                        createAllRepairsAggregatedRepairMetricsSafe(
                            repairMetrics,
                        );
                    if (aggregatedRepairMetricsResult.err) {
                        return aggregatedRepairMetricsResult;
                    }
                    const aggregatedRepairMetricsMaybe =
                        aggregatedRepairMetricsResult.safeUnwrap();
                    if (aggregatedRepairMetricsMaybe.none) {
                        return createSafeErrorResult(
                            new NotFoundError(
                                `Aggregated repair metrics data not found for store location: ${storeLocation}`,
                            ),
                        );
                    }
                    const aggregatedRepairMetrics = aggregatedRepairMetricsMaybe
                        .safeUnwrap();

                    const concatenatedMetrics = [
                        ...repairMetrics,
                        aggregatedRepairMetrics,
                    ];

                    const setMetricsInCacheResult =
                        await setRepairMetricsInCache(
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
                            `Failed to generate repair metrics for store location: ${storeLocation}`,
                        ),
                    );
                }
            }),
        );

        if (calgaryRepairMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        calgaryRepairMetricsSettledResult.reason,
                        "Calgary repair metrics generation promise rejected",
                    ),
                ),
            );
            return;
        }
        if (calgaryRepairMetricsSettledResult.value.err) {
            self.postMessage(
                calgaryRepairMetricsSettledResult.value,
            );
            return;
        }
        const calgaryRepairMetricsMaybe = calgaryRepairMetricsSettledResult
            .value.safeUnwrap();
        if (calgaryRepairMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError("Calgary repair metrics not found"),
                ),
            );
            return;
        }
        const calgaryRepairMetrics = calgaryRepairMetricsMaybe.safeUnwrap();

        if (edmontonRepairMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        edmontonRepairMetricsSettledResult.reason,
                        "Edmonton repair metrics generation promise rejected",
                    ),
                ),
            );
            return;
        }
        if (edmontonRepairMetricsSettledResult.value.err) {
            self.postMessage(
                edmontonRepairMetricsSettledResult.value,
            );
            return;
        }
        const edmontonRepairMetricsMaybe = edmontonRepairMetricsSettledResult
            .value.safeUnwrap();
        if (edmontonRepairMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError("Edmonton repair metrics not found"),
                ),
            );
            return;
        }
        const edmontonRepairMetrics = edmontonRepairMetricsMaybe
            .safeUnwrap();

        if (vancouverRepairMetricsSettledResult.status === "rejected") {
            self.postMessage(
                createSafeErrorResult(
                    new PromiseRejectionError(
                        vancouverRepairMetricsSettledResult.reason,
                        "Vancouver repair metrics generation promise rejected",
                    ),
                ),
            );
            return;
        }
        if (vancouverRepairMetricsSettledResult.value.err) {
            self.postMessage(
                vancouverRepairMetricsSettledResult.value,
            );
            return;
        }
        const vancouverRepairMetricsMaybe = vancouverRepairMetricsSettledResult
            .value.safeUnwrap();
        if (vancouverRepairMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError("Vancouver repair metrics not found"),
                ),
            );
            return;
        }
        const vancouverRepairMetrics = vancouverRepairMetricsMaybe
            .safeUnwrap();

        const allLocationsAggregatedRepairMetricsResult =
            createAllLocationsAggregatedRepairMetricsSafe({
                calgaryRepairMetrics,
                edmontonRepairMetrics,
                vancouverRepairMetrics,
            });
        if (allLocationsAggregatedRepairMetricsResult.err) {
            self.postMessage(
                allLocationsAggregatedRepairMetricsResult,
            );
            return;
        }
        const allLocationsAggregatedRepairMetricsMaybe =
            allLocationsAggregatedRepairMetricsResult.safeUnwrap();
        if (allLocationsAggregatedRepairMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "All Locations aggregated repair metrics not found",
                    ),
                ),
            );
            return;
        }
        const allLocationsAggregatedRepairMetrics =
            allLocationsAggregatedRepairMetricsMaybe
                .safeUnwrap();

        const setAllLocationsMetricsInCacheResult =
            await setRepairMetricsInCache(
                "All Locations",
                allLocationsAggregatedRepairMetrics,
            );
        if (setAllLocationsMetricsInCacheResult.err) {
            self.postMessage(setAllLocationsMetricsInCacheResult);
            return;
        }

        // for financial metrics generation
        const setRepairMetricsCacheResult = await setCachedItemAsyncSafe(
            "repairMetrics",
            {
                Calgary: calgaryRepairMetrics,
                Edmonton: edmontonRepairMetrics,
                Vancouver: vancouverRepairMetrics,
                "All Locations": allLocationsAggregatedRepairMetrics,
            },
        );
        if (setRepairMetricsCacheResult.err) {
            self.postMessage(setRepairMetricsCacheResult);
            return;
        }

        self.postMessage(new Ok(None));
    } catch (error) {
        console.error("Repair Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(
                new MetricsGenerationError(
                    error,
                    "Error in Repair Metrics Worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Repair Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new MetricsGenerationError(
                event,
                "Unhandled error in Repair Metrics Worker",
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
                "Unhandled promise rejection in Repair Metrics Worker",
            ),
        ),
    );
});

export type {
    MessageEventRepairMetricsMainToWorker,
    MessageEventRepairMetricsWorkerToMain,
};

function createRepairMetricsDocument(
    metricCategory: "All Repairs" | RepairCategory,
    repairMetrics: RepairYearlyMetric[],
    storeLocation: AllStoreLocations,
): RepairMetricsDocument {
    return {
        _id: createMetricsURLCacheKey({
            metricsUrl: METRICS_URL,
            metricsView: "repairs",
            productMetricCategory: "All Products",
            repairMetricCategory: metricCategory,
            storeLocation,
        }) ?? crypto.randomUUID(),
        __v: 0,
        createdAt: new Date().toISOString(),
        metricCategory,
        yearlyMetrics: repairMetrics,
        storeLocation,
        updatedAt: new Date().toISOString(),
    };
}

async function setRepairMetricsInCache(
    storeLocation: AllStoreLocations,
    metrics: RepairMetric[],
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
                                metricsView: "repairs",
                                productMetricCategory: "All Products",
                                repairMetricCategory: name,
                            },
                        );

                        const setItemResult = await setCachedItemAsyncSafe(
                            metricCacheKey,
                            createRepairMetricsDocument(
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
                                `Failed to set repair metric in cache for store location: ${storeLocation}, 
                                metric category: ${metric.name}`,
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
                `Failed to set repair metrics in cache for store location: ${storeLocation}`,
            ),
        );
    }
}
