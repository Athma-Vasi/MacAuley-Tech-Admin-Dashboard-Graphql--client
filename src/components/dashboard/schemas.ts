import { ErrImpl } from "ts-results";
import { z } from "zod";
import {
    allStoreLocationsZod,
    metricsViewZod,
    productMetricCategoryZod,
    repairMetricCategoryZod,
} from "../../schemas";
import { dashboardAction } from "./actions";

const setIsLoadingDashboardDispatchZod = z.object({
    action: z.literal(dashboardAction.setIsLoading),
    payload: z.boolean(),
});

const setLoadingMessageDashboardDispatchZod = z.object({
    action: z.literal(dashboardAction.setLoadingMessage),
    payload: z.string(),
});

const setCalendarViewDashboardDispatchZod = z.object({
    action: z.literal(dashboardAction.setCalendarView),
    payload: z.enum(["Daily", "Monthly", "Yearly"]),
});

const setDashboardCacheWorkerDashboardDispatchZod = z.object({
    action: z.literal(dashboardAction.setDashboardCacheWorker),
    payload: z.instanceof(Worker),
});

const setCurrentSelectedInputDashboardDispatchZod = z.object({
    action: z.literal(dashboardAction.setCurrentSelectedInput),
    payload: z.string(),
});

const setSafeErrorResultDashboardDispatchZod = z.object({
    action: z.literal(dashboardAction.setSafeErrorResult),
    payload: z.instanceof(ErrImpl).nullable(),
});

const handleStoreAndCategoryClicksInputZod = z.object({
    dashboardDispatch: z.function(),
    dashboardCacheWorker: z.instanceof(Worker),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    metricsUrl: z.string().url(),
    metricsView: metricsViewZod,
    productMetricCategory: productMetricCategoryZod,
    repairMetricCategory: repairMetricCategoryZod,
    showBoundary: z.function(),
    storeLocation: allStoreLocationsZod,
});

const handleMessageEventDashboardCacheWorkerToMainInputZod = z.object({
    dashboardDispatch: z.function(),
    event: z.instanceof(MessageEvent),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
});

const messageEventDashboardFetchMainToWorkerZod = z.object({
    metricsView: metricsViewZod,
    routesZodSchemaMapKey: z.string(),
    cacheKey: z.string(),
});

export {
    handleMessageEventDashboardCacheWorkerToMainInputZod,
    handleStoreAndCategoryClicksInputZod,
    messageEventDashboardFetchMainToWorkerZod,
    setCalendarViewDashboardDispatchZod,
    setCurrentSelectedInputDashboardDispatchZod,
    setDashboardCacheWorkerDashboardDispatchZod,
    setIsLoadingDashboardDispatchZod,
    setLoadingMessageDashboardDispatchZod,
    setSafeErrorResultDashboardDispatchZod,
};
