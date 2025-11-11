import { parseDispatchAndSetState, parseSyncSafe } from "../../../utils";
import { type CustomerMetricsAction, customerMetricsAction } from "./actions";
import type { CustomerMetricsCards } from "./cards";
import type { CustomerMetricsCalendarCharts } from "./chartsData";
import {
  setCalendarChartsCustomerMetricsDispatchZod,
  setChartsCustomerMetricsDispatchZod,
  setChartsWorkerCustomerMetricsDispatchZod,
  setIsGeneratingCustomerMetricsDispatchZod,
} from "./schemas";
import type { CustomerMetricsDispatch, CustomerMetricsState } from "./types";

function customerMetricsReducer(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch,
): CustomerMetricsState {
  const reducer = customerMetricsReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const customerMetricsReducers = new Map<
  CustomerMetricsAction[keyof CustomerMetricsAction],
  (
    state: CustomerMetricsState,
    dispatch: CustomerMetricsDispatch,
  ) => CustomerMetricsState
>([
  [
    customerMetricsAction.setCalendarChartsData,
    customerMetricsReducer_setCalendarChartsData,
  ],
  [customerMetricsAction.setCards, customerMetricsReducer_setCards],
  [customerMetricsAction.setCharts, customerMetricsReducer_setCharts],
  [
    customerMetricsAction.setCustomerChartsWorker,
    customerMetricsReducer_setCustomerChartsWorker,
  ],
  [
    customerMetricsAction.setIsGenerating,
    customerMetricsReducer_setIsGenerating,
  ],
]);

function customerMetricsReducer_setCalendarChartsData(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch,
): CustomerMetricsState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setCalendarChartsCustomerMetricsDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  return {
    ...state,
    calendarChartsData: parsedResult.val.val.payload as {
      currentYear: CustomerMetricsCalendarCharts;
      previousYear: CustomerMetricsCalendarCharts;
    },
  };
}

function customerMetricsReducer_setCards(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch,
): CustomerMetricsState {
  if (!dispatch.payload) {
    return state;
  }

  return {
    ...state,
    cards: dispatch.payload as CustomerMetricsCards,
  };
}

function customerMetricsReducer_setCharts(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch,
): CustomerMetricsState {
  return parseDispatchAndSetState({
    dispatch,
    key: "charts",
    state,
    zSchema: setChartsCustomerMetricsDispatchZod,
  });
}

function customerMetricsReducer_setCustomerChartsWorker(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch,
): CustomerMetricsState {
  return parseDispatchAndSetState({
    dispatch,
    key: "customerChartsWorker",
    state,
    zSchema: setChartsWorkerCustomerMetricsDispatchZod,
  });
}

function customerMetricsReducer_setIsGenerating(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch,
): CustomerMetricsState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isGenerating",
    state,
    zSchema: setIsGeneratingCustomerMetricsDispatchZod,
  });
}

export {
  customerMetricsReducer,
  customerMetricsReducer_setCalendarChartsData,
  customerMetricsReducer_setCards,
  customerMetricsReducer_setCharts,
  customerMetricsReducer_setCustomerChartsWorker,
  customerMetricsReducer_setIsGenerating,
};
