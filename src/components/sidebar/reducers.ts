import { parseDispatchAndSetState } from "../../utils";
import { type SidebarAction, sidebarAction } from "./actions";
import {
    setClickedNavlinkSidebarDispatchZod,
    setDirectoryFetchWorkerSidebarDispatchZod,
    setLogoutFetchWorkerSidebarDispatchZod,
    setMetricsCacheWorkerSidebarDispatchZod,
    setPrefetchAndCacheWorkerSidebarDispatchZod,
} from "./schemas";
import type { SidebarDispatch, SidebarState } from "./types";

function sidebarReducer(state: SidebarState, dispatch: SidebarDispatch) {
    const reducer = reducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const reducersMap = new Map<
    SidebarAction[keyof SidebarAction],
    (state: SidebarState, dispatch: SidebarDispatch) => SidebarState
>([
    [sidebarAction.setClickedNavlink, sidebarReducer_setClickedNavlink],
    [
        sidebarAction.setDirectoryFetchWorker,
        sidebarReducer_setDirectoryFetchWorker,
    ],
    [sidebarAction.setLogoutFetchWorker, sidebarReducer_setLogoutFetchWorker],
    [sidebarAction.setMetricsCacheWorker, sidebarReducer_setMetricsCacheWorker],
    [
        sidebarAction.setPrefetchAndCacheWorker,
        sidebarReducer_setPrefetchAndCacheWorker,
    ],
]);

function sidebarReducer_setClickedNavlink(
    state: SidebarState,
    dispatch: SidebarDispatch,
) {
    return parseDispatchAndSetState({
        dispatch,
        key: "clickedNavlink",
        state,
        zSchema: setClickedNavlinkSidebarDispatchZod,
    });
}

function sidebarReducer_setDirectoryFetchWorker(
    state: SidebarState,
    dispatch: SidebarDispatch,
) {
    return parseDispatchAndSetState({
        dispatch,
        key: "directoryFetchWorker",
        state,
        zSchema: setDirectoryFetchWorkerSidebarDispatchZod,
    });
}

function sidebarReducer_setLogoutFetchWorker(
    state: SidebarState,
    dispatch: SidebarDispatch,
) {
    return parseDispatchAndSetState({
        dispatch,
        key: "logoutFetchWorker",
        state,
        zSchema: setLogoutFetchWorkerSidebarDispatchZod,
    });
}

function sidebarReducer_setMetricsCacheWorker(
    state: SidebarState,
    dispatch: SidebarDispatch,
) {
    return parseDispatchAndSetState({
        dispatch,
        key: "metricsCacheWorker",
        state,
        zSchema: setMetricsCacheWorkerSidebarDispatchZod,
    });
}

function sidebarReducer_setPrefetchAndCacheWorker(
    state: SidebarState,
    dispatch: SidebarDispatch,
) {
    return parseDispatchAndSetState({
        dispatch,
        key: "prefetchAndCacheWorker",
        state,
        zSchema: setPrefetchAndCacheWorkerSidebarDispatchZod,
    });
}

export {
    sidebarReducer,
    sidebarReducer_setClickedNavlink,
    sidebarReducer_setDirectoryFetchWorker,
    sidebarReducer_setLogoutFetchWorker,
    sidebarReducer_setMetricsCacheWorker,
    sidebarReducer_setPrefetchAndCacheWorker,
};
