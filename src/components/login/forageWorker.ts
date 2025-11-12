import { z } from "zod";
import { FETCH_REQUEST_TIMEOUT, METRICS_URL } from "../../constants";
import type { FinancialMetricsDocument, SafeResult } from "../../types";
import {
    createMetricsURLCacheKey,
    createSafeErrorResult,
    createSafeSuccessResult,
    getCachedItemAsyncSafe,
    parseSyncSafe,
} from "../../utils";
import { InvariantError } from "../error/classes";

type MessageEventLoginForageWorkerToMain = MessageEvent<
    SafeResult<{ financialMetricsDocument: FinancialMetricsDocument }>
>;

type MessageEventLoginForageMainToWorker = MessageEvent<
    boolean
>;

self.onmessage = async (
    event: MessageEventLoginForageMainToWorker,
) => {
    if (!event.data) {
        self.postMessage(
            createSafeErrorResult(
                new InvariantError("No data received"),
            ),
        );
        return;
    }

    const parsedMessageResult = parseSyncSafe(
        {
            object: event.data,
            zSchema: z.boolean(),
        },
    );
    if (parsedMessageResult.err) {
        self.postMessage(
            createSafeErrorResult(
                parsedMessageResult.err,
            ),
        );
        return;
    }
    const parsedMessageMaybe = parsedMessageResult.safeUnwrap();
    if (parsedMessageMaybe.none) {
        self.postMessage(
            createSafeErrorResult(
                new InvariantError("Error parsing message"),
            ),
        );
        return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_REQUEST_TIMEOUT);

    const cacheKey = createMetricsURLCacheKey({
        metricsUrl: METRICS_URL,
        metricsView: "financials",
        productMetricCategory: "All Products",
        repairMetricCategory: "All Repairs",
        storeLocation: "All Locations",
    });

    try {
        const financialMetricsDocumentResult = await getCachedItemAsyncSafe<
            FinancialMetricsDocument
        >(cacheKey);

        if (financialMetricsDocumentResult.err) {
            self.postMessage(
                createSafeErrorResult(
                    financialMetricsDocumentResult.err,
                ),
            );
            return;
        }
        const financialMetricsDocumentMaybe = financialMetricsDocumentResult
            .safeUnwrap();
        if (financialMetricsDocumentMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new InvariantError(
                        "Financial metrics document is missing in cache",
                    ),
                ),
            );
            return;
        }

        const financialMetricsDocument = financialMetricsDocumentMaybe
            .safeUnwrap();

        self.postMessage(
            createSafeSuccessResult({
                financialMetricsDocument,
            }),
        );
    } catch (error: unknown) {
        self.postMessage(
            createSafeErrorResult(error),
        );
    } finally {
        clearTimeout(timeout);
    }
};

self.onerror = (event: string | Event) => {
    console.error("Fetch Parse Worker error:", event);
    self.postMessage(
        createSafeErrorResult(event),
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
    MessageEventLoginForageMainToWorker,
    MessageEventLoginForageWorkerToMain,
};
