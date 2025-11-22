import {
    ROUTES_ZOD_SCHEMAS_MAP,
    type RoutesZodSchemasMapKey,
} from "../../constants";
import type { BusinessMetricsDocument, SafeResult } from "../../types";
import {
    createSafeErrorResult,
    createSafeSuccessResult,
    getCachedItemAsyncSafe,
    parseSyncSafe,
} from "../../utils";
import {
    NotFoundError,
    PromiseRejectionError,
    WorkerError,
    WorkerMessageError,
} from "../error/classes";
import { messageEventDashboardFetchMainToWorkerZod } from "./schemas";
import type { DashboardMetricsView } from "./types";

type MessageEventDashboardCacheMainToWorker = MessageEvent<
    {
        metricsView: Lowercase<DashboardMetricsView>;
        routesZodSchemaMapKey: RoutesZodSchemasMapKey;
        cacheKey: string;
    }
>;

type MessageEventDashboardCacheWorkerToMain = MessageEvent<
    SafeResult<{
        metricsDocument: BusinessMetricsDocument;
        metricsView: Lowercase<DashboardMetricsView>;
    }>
>;

self.onmessage = async (
    event: MessageEventDashboardCacheMainToWorker,
) => {
    try {
        if (!event.data) {
            self.postMessage(
                createSafeErrorResult(
                    new WorkerMessageError(
                        "No data received in dashboard cache worker message",
                    ),
                ),
            );
            return;
        }

        const parsedMessageResult = parseSyncSafe({
            object: event.data,
            zSchema: messageEventDashboardFetchMainToWorkerZod,
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
                        "Parsed message is none in dashboard cache worker",
                    ),
                ),
            );
            return;
        }

        const {
            cacheKey,
            metricsView,
            routesZodSchemaMapKey,
        } = parsedMessageMaybe.safeUnwrap();

        const businessMetricsDocumentResult = await getCachedItemAsyncSafe<
            BusinessMetricsDocument
        >(cacheKey);
        if (businessMetricsDocumentResult.err) {
            self.postMessage(businessMetricsDocumentResult);
            return;
        }
        const businessMetricsDocumentMaybe = businessMetricsDocumentResult
            .safeUnwrap();
        if (businessMetricsDocumentMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Business metrics document is missing in cache",
                    ),
                ),
            );
            return;
        }
        const businessMetricsDocument = businessMetricsDocumentMaybe
            .safeUnwrap();

        console.group(
            "Dashboard Cache Worker - Fetched Business Metrics Document from Cache",
        );
        console.log("Metrics View:", metricsView);
        console.log("Routes Zod Schema Map Key:", routesZodSchemaMapKey);
        console.log("Business Metrics Document:", businessMetricsDocument);
        console.groupEnd();

        const parsedResult = parseSyncSafe({
            object: businessMetricsDocument,
            zSchema: ROUTES_ZOD_SCHEMAS_MAP[routesZodSchemaMapKey],
        });
        if (parsedResult.err) {
            self.postMessage(parsedResult);
            return;
        }
        const parsedMaybe = parsedResult.safeUnwrap();
        if (parsedMaybe.none) {
            self.postMessage(
                createSafeErrorResult(
                    new NotFoundError(
                        "Parsed business metrics document is none in dashboard cache worker",
                    ),
                ),
            );
            return;
        }
        const metricsDocument = parsedMaybe.safeUnwrap();

        console.group("Dashboard Cache Worker - Parsed Metrics Document");
        console.log("Metrics Document:", metricsDocument);
        console.groupEnd();

        self.postMessage(
            createSafeSuccessResult({
                metricsDocument,
                metricsView,
            }),
        );
        console.log("Posted success result from dashboard cache worker");
        return;
    } catch (error: unknown) {
        self.postMessage(
            createSafeErrorResult(
                new WorkerError(
                    error,
                    "Error fetching business metrics document from cache in dashboard cache worker",
                ),
            ),
        );
    }
};

self.onerror = (event: string | Event) => {
    console.error("Dashboard Cache Worker error:", event);
    self.postMessage(
        createSafeErrorResult(
            new WorkerError(
                event,
                "Unhandled error in dashboard cache worker",
            ),
        ),
    );
    // return true; // Prevents default logging to console
};

self.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    console.error("Unhandled promise rejection in worker:", event.reason);
    self.postMessage(
        createSafeErrorResult(
            new PromiseRejectionError(
                event.reason,
                "Unhandled promise rejection in dashboard cache worker",
            ),
        ),
    );
});

export type {
    MessageEventDashboardCacheMainToWorker,
    MessageEventDashboardCacheWorkerToMain,
};
