import { ALL_STORE_LOCATIONS_DATA, METRICS_URL } from "../../../constants";
import type {
    FinancialMetricsDocument,
    SafeResult,
    StoreLocation,
} from "../../../types";
import {
    createMetricsURLCacheKey,
    createSafeErrorResult,
    createSafeSuccessResult,
    getCachedItemAsyncSafe,
    handlePromiseSettledResults,
    removeCachedItemAsyncSafe,
    setCachedItemAsyncSafe,
} from "../../../utils";
import {
    CacheError,
    NotFoundError,
    WorkerError,
    WorkerMessageError,
} from "../../error/classes";
import type {
    AllStoreLocations,
    BusinessMetric,
    CustomerMetrics,
    ProductMetric,
    RepairMetric,
    YearlyFinancialMetric,
} from "../types";
import {
    createAllLocationsAggregatedFinancialMetricsSafe,
    createRandomFinancialMetricsSafe,
} from "./generators";

type MessageEventFinancialMetricsWorkerToMain = MessageEvent<
    SafeResult<boolean>
>;
type MessageEventFinancialMetricsMainToWorker = MessageEvent<
    boolean
>;

self.onmessage = async (
    event: MessageEventFinancialMetricsMainToWorker,
) => {
    if (!event.data) {
        self.postMessage(
            createSafeErrorResult(
                new WorkerMessageError(
                    "No data provided in message to financial metrics worker",
                ),
            ),
        );
        return;
    }

    try {
        const getProductMetricsCacheResult = await getCachedItemAsyncSafe<
            Record<AllStoreLocations, ProductMetric[]>
        >(
            "productMetrics",
        );
        if (getProductMetricsCacheResult.err) {
            self.postMessage(getProductMetricsCacheResult);
            return;
        }

        const productMetricsMaybe = getProductMetricsCacheResult.safeUnwrap();
        if (productMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No product metrics found in cache",
                    ),
                ),
            );
            return;
        }
        const productMetrics = productMetricsMaybe.safeUnwrap();

        const getRepairMetricsCacheResult = await getCachedItemAsyncSafe<
            Record<AllStoreLocations, RepairMetric[]>
        >(
            "repairMetrics",
        );
        if (getRepairMetricsCacheResult.err) {
            self.postMessage(getRepairMetricsCacheResult);
            return;
        }

        const repairMetricsMaybe = getRepairMetricsCacheResult.safeUnwrap();
        if (repairMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No repair metrics found in cache",
                    ),
                ),
            );
            return;
        }
        const repairMetrics = repairMetricsMaybe.safeUnwrap();

        const businessMetrics: BusinessMetric[] = ALL_STORE_LOCATIONS_DATA.map(
            ({ value: storeLocation }) => {
                return {
                    storeLocation,
                    financialMetrics: [] as YearlyFinancialMetric[],
                    customerMetrics: {} as CustomerMetrics,
                    productMetrics: productMetrics[storeLocation] ?? [],
                    repairMetrics: repairMetrics[storeLocation] ??
                        [],
                };
            },
        );

        const financialMetricsResult = createRandomFinancialMetricsSafe(
            businessMetrics,
        );
        if (financialMetricsResult.err) {
            self.postMessage(financialMetricsResult);
            return;
        }

        const financialMetricsMaybe = financialMetricsResult.safeUnwrap();
        if (financialMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "No financial metrics generated",
                    ),
                ),
            );
            return;
        }
        const financialMetrics = financialMetricsMaybe.safeUnwrap();

        // empty 'All Locations' financial metrics atm
        const businessMetricsWithIncompleteFinancials = financialMetrics.reduce<
            BusinessMetric[]
        >((businessMetricsAcc, tuple) => {
            const [storeLocation, financialMetrics] = tuple as [
                StoreLocation,
                YearlyFinancialMetric[],
            ];

            const businessMetric = businessMetrics.find(
                (businessMetric) =>
                    businessMetric.storeLocation === storeLocation,
            );

            if (businessMetric) {
                businessMetric.financialMetrics = financialMetrics;
            }

            return businessMetricsAcc;
        }, businessMetrics);

        // aggregate financial metrics for each store location into 'All Locations' metrics
        const allLocationsAggregatedFinancialMetricsResult =
            createAllLocationsAggregatedFinancialMetricsSafe(
                businessMetricsWithIncompleteFinancials,
            );
        if (allLocationsAggregatedFinancialMetricsResult.err) {
            self.postMessage(allLocationsAggregatedFinancialMetricsResult);
            return;
        }

        const allLocationsAggregatedFinancialMetricsMaybe =
            allLocationsAggregatedFinancialMetricsResult.safeUnwrap();
        if (allLocationsAggregatedFinancialMetricsMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Failed to aggregate financial metrics for All Locations",
                    ),
                ),
            );
            return;
        }
        const allLocationsAggregatedFinancialMetrics =
            allLocationsAggregatedFinancialMetricsMaybe.safeUnwrap();

        const completeFinancials = businessMetricsWithIncompleteFinancials.map(
            (businessMetric) => {
                if (businessMetric.storeLocation === "All Locations") {
                    businessMetric.financialMetrics =
                        allLocationsAggregatedFinancialMetrics;
                }

                return businessMetric;
            },
        );

        const setItemsInCacheResults = await Promise.allSettled(
            completeFinancials.map(
                async ({ storeLocation, financialMetrics }) => {
                    try {
                        const setMetricsResult =
                            await setFinancialMetricsInCache(
                                storeLocation,
                                financialMetrics,
                            );
                        if (setMetricsResult.err) {
                            return setMetricsResult;
                        }

                        return createSafeSuccessResult(
                            `Financial metrics for ${storeLocation} successfully cached`,
                        );
                    } catch (error: unknown) {
                        return createSafeErrorResult(
                            new CacheError(
                                error,
                                `Failed to set financial metrics for ${storeLocation} in cache`,
                            ),
                        );
                    }
                },
            ),
        );

        const handledSettledResult = handlePromiseSettledResults(
            setItemsInCacheResults,
        );
        if (handledSettledResult.err) {
            self.postMessage(handledSettledResult);
            return;
        }

        const removeProductMetricsCacheResult = await removeCachedItemAsyncSafe(
            "productMetrics",
        );
        if (removeProductMetricsCacheResult.err) {
            self.postMessage(removeProductMetricsCacheResult);
            return;
        }

        const removeRepairMetricsCacheResult = await removeCachedItemAsyncSafe(
            "repairMetrics",
        );
        if (removeRepairMetricsCacheResult.err) {
            self.postMessage(removeRepairMetricsCacheResult);
            return;
        }

        self.postMessage(
            createSafeSuccessResult(true),
        );
        return;
    } catch (error) {
        console.error("Financial Charts Worker error:", error);
        self.postMessage(
            createSafeErrorResult(error),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Financial Charts Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new WorkerError(
                event,
                "Unhandled error in financial metrics worker",
            ),
        ),
    );
    return true; // Prevents default logging to console
};

self.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    console.error("Unhandled promise rejection in worker:", event.reason);
    self.postMessage(
        createSafeErrorResult(event),
    );
});

export type {
    MessageEventFinancialMetricsMainToWorker,
    MessageEventFinancialMetricsWorkerToMain,
};

function createFinancialMetricsDocument(
    storeLocation: AllStoreLocations,
    financialMetrics: YearlyFinancialMetric[],
): FinancialMetricsDocument {
    return {
        _id: createMetricsURLCacheKey({
            metricsUrl: METRICS_URL,
            metricsView: "financials",
            productMetricCategory: "All Products",
            repairMetricCategory: "All Repairs",
            storeLocation,
        }) ?? crypto.randomUUID(),
        __v: 0,
        createdAt: new Date().toISOString(),
        financialMetrics,
        storeLocation,
        updatedAt: new Date().toISOString(),
    };
}

async function setFinancialMetricsInCache(
    storeLocation: AllStoreLocations,
    metrics: YearlyFinancialMetric[],
): Promise<SafeResult<string>> {
    try {
        const metricCacheKey = createMetricsURLCacheKey(
            {
                metricsUrl: METRICS_URL,
                storeLocation,
                metricsView: "financials",
                productMetricCategory: "All Products",
                repairMetricCategory: "All Repairs",
            },
        );
        const setMetricsResult = await setCachedItemAsyncSafe(
            metricCacheKey,
            createFinancialMetricsDocument(
                storeLocation,
                metrics,
            ),
        );
        if (setMetricsResult.err) {
            return setMetricsResult;
        }

        return createSafeSuccessResult(
            `Financial metrics for ${storeLocation} successfully cached`,
        );
    } catch (error: unknown) {
        return createSafeErrorResult(error);
    }
}
