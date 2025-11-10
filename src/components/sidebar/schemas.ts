import { z } from "zod";
import {
    allDepartmentsZod,
    allStoreLocationsZod,
    metricsViewZod,
    productMetricCategoryZod,
    repairMetricCategoryZod,
} from "../../schemas";
import { sidebarAction } from "./actions";

const setMetricsCacheWorkerSidebarDispatchZod = z.object({
    action: z.literal(sidebarAction.setMetricsCacheWorker),
    payload: z.instanceof(Worker),
});

const setDirectoryFetchWorkerSidebarDispatchZod = z.object({
    action: z.literal(sidebarAction.setDirectoryFetchWorker),
    payload: z.instanceof(Worker),
});

const setClickedNavlinkSidebarDispatchZod = z.object({
    action: z.literal(sidebarAction.setClickedNavlink),
    payload: z.enum([
        "directory",
        "users",
        "financials",
        "products",
        "customers",
        "repairs",
        "logout",
    ]),
});

const setLogoutFetchWorkerSidebarDispatchZod = z.object({
    action: z.literal(sidebarAction.setLogoutFetchWorker),
    payload: z.instanceof(Worker),
});

const handleLogoutClickInputZod = z.object({
    accessToken: z.string().min(1).max(1000),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    logoutFetchWorker: z.instanceof(Worker),
    logoutUrl: z.string(),
    showBoundary: z.function(),
});

const handleMessageEventLogoutFetchWorkerToMainInputZod = z.object({
    event: z.instanceof(MessageEvent),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    navigate: z.function(),
    showBoundary: z.function(),
});

const handleDirectoryNavClickInputZod = z.object({
    accessToken: z.string().min(1).max(1000),
    department: z.enum([
        "All Departments",
        "Executive Management",
        "Human Resources",
        "Store Administration",
        "Office Administration",
        "Accounting",
        "Sales",
        "Marketing",
        "Information Technology",
        "Repair Technicians",
        "Field Service Technicians",
        "Logistics and Inventory",
        "Customer Service",
        "Maintenance",
    ]),
    directoryFetchWorker: z.instanceof(Worker),
    directoryUrl: z.string(),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    showBoundary: z.function(),
    storeLocation: z.enum([
        "All Locations",
        "Edmonton",
        "Calgary",
        "Vancouver",
    ]),
});

const handleMessageEventDirectoryFetchWorkerToMainInputZod = z.object({
    authDispatch: z.function(),
    event: z.instanceof(MessageEvent),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    navigate: z.function().optional(),
    showBoundary: z.function(),
    toLocation: z.string().min(1).max(1000).optional(),
});

const handleMessageEventMetricsCacheWorkerToMainInputZod = z.object({
    event: z.instanceof(MessageEvent),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    navigate: z.function(),
    showBoundary: z.function(),
});

const handleMetricCategoryNavClickInputZod = z.object({
    metricsCacheWorker: z.instanceof(Worker).nullable(),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    metricsUrl: z.string(),
    metricsView: metricsViewZod,
    productMetricCategory: productMetricCategoryZod,
    repairMetricCategory: repairMetricCategoryZod,
    showBoundary: z.function(),
    storeLocation: allStoreLocationsZod,
});

const setPrefetchAndCacheWorkerSidebarDispatchZod = z.object({
    action: z.literal(sidebarAction.setPrefetchAndCacheWorker),
    payload: z.instanceof(Worker),
});

const triggerMessageEventDirectoryPrefetchAndCacheMainToWorkerInputZod = z
    .object({
        accessToken: z.string().min(1).max(1000),
        department: allDepartmentsZod,
        directoryUrl: z.string(),
        isComponentMountedRef: z.object({ current: z.boolean() }),
        prefetchAndCacheWorker: z.instanceof(Worker),
        showBoundary: z.function(),
        storeLocation: allStoreLocationsZod,
    });

export {
    handleDirectoryNavClickInputZod,
    handleLogoutClickInputZod,
    handleMessageEventDirectoryFetchWorkerToMainInputZod,
    handleMessageEventLogoutFetchWorkerToMainInputZod,
    handleMessageEventMetricsCacheWorkerToMainInputZod,
    handleMetricCategoryNavClickInputZod,
    setClickedNavlinkSidebarDispatchZod,
    setDirectoryFetchWorkerSidebarDispatchZod,
    setLogoutFetchWorkerSidebarDispatchZod,
    setMetricsCacheWorkerSidebarDispatchZod,
    setPrefetchAndCacheWorkerSidebarDispatchZod,
    triggerMessageEventDirectoryPrefetchAndCacheMainToWorkerInputZod,
};
