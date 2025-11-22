import { parseDispatchAndSetState } from "../../utils";
import { dashboardAction } from "./actions";
import {
  setCalendarViewDashboardDispatchZod,
  setCurrentSelectedInputDashboardDispatchZod,
  setDashboardCacheWorkerDashboardDispatchZod,
  setIsLoadingDashboardDispatchZod,
  setLoadingMessageDashboardDispatchZod,
  setSafeErrorResultDashboardDispatchZod,
} from "./schemas";
import type {
  DashboardAction,
  DashboardDispatch,
  DashboardState,
} from "./types";

function dashboardReducer(
  state: DashboardState,
  dispatch: DashboardDispatch,
): DashboardState {
  const reducer = dashboardReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const dashboardReducersMap = new Map<
  DashboardAction[keyof DashboardAction],
  (state: DashboardState, dispatch: DashboardDispatch) => DashboardState
>([
  [dashboardAction.setIsLoading, dashboardReducer_setIsLoading],
  [dashboardAction.setLoadingMessage, dashboardReducer_setLoadingMessage],
  [dashboardAction.setCalendarView, dashboardReducer_setCalendarView],
  [
    dashboardAction.setDashboardCacheWorker,
    dashboardReducer_setDashboardCacheWorker,
  ],
  [
    dashboardAction.setCurrentSelectedInput,
    dashboardReducer_setCurrentSelectedInput,
  ],
  [
    dashboardAction.setSafeErrorResult,
    dashboardReducer_setSafeErrorResult,
  ],
]);

function dashboardReducer_setIsLoading(
  state: DashboardState,
  dispatch: DashboardDispatch,
): DashboardState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isLoading",
    state,
    zSchema: setIsLoadingDashboardDispatchZod,
  });
}

function dashboardReducer_setLoadingMessage(
  state: DashboardState,
  dispatch: DashboardDispatch,
): DashboardState {
  return parseDispatchAndSetState({
    dispatch,
    key: "loadingMessage",
    state,
    zSchema: setLoadingMessageDashboardDispatchZod,
  });
}

function dashboardReducer_setCalendarView(
  state: DashboardState,
  dispatch: DashboardDispatch,
): DashboardState {
  return parseDispatchAndSetState({
    dispatch,
    key: "calendarView",
    state,
    zSchema: setCalendarViewDashboardDispatchZod,
  });
}

function dashboardReducer_setDashboardCacheWorker(
  state: DashboardState,
  dispatch: DashboardDispatch,
): DashboardState {
  return parseDispatchAndSetState({
    dispatch,
    key: "dashboardCacheWorker",
    state,
    zSchema: setDashboardCacheWorkerDashboardDispatchZod,
  });
}

function dashboardReducer_setCurrentSelectedInput(
  state: DashboardState,
  dispatch: DashboardDispatch,
): DashboardState {
  return parseDispatchAndSetState({
    dispatch,
    key: "currentSelectedInput",
    state,
    zSchema: setCurrentSelectedInputDashboardDispatchZod,
  });
}

function dashboardReducer_setSafeErrorResult(
  state: DashboardState,
  dispatch: DashboardDispatch,
): DashboardState {
  return parseDispatchAndSetState({
    dispatch,
    key: "safeErrorResult",
    state,
    zSchema: setSafeErrorResultDashboardDispatchZod,
  });
}

export {
  dashboardReducer,
  dashboardReducer_setCalendarView,
  dashboardReducer_setCurrentSelectedInput,
  dashboardReducer_setDashboardCacheWorker,
  dashboardReducer_setIsLoading,
  dashboardReducer_setLoadingMessage,
  dashboardReducer_setSafeErrorResult,
};
