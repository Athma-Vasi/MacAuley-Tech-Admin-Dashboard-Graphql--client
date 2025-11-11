import { parseDispatchAndSetState, parseSyncSafe } from "../../../utils";
import { type FinancialMetricsAction, financialMetricsAction } from "./actions";
import type { FinancialMetricsCards } from "./cards";
import type { FinancialMetricsCalendarCharts } from "./chartsData";
import {
  setCalendarChartsFinancialMetricsDispatchZod,
  setChartsFinancialMetricsDispatchZod,
  setChartsWorkerFinancialMetricsDispatchZod,
  setIsGeneratingFinancialMetricsDispatchZod,
} from "./schemas";
import type { FinancialMetricsDispatch, FinancialMetricsState } from "./types";

function financialMetricsReducer(
  state: FinancialMetricsState,
  dispatch: FinancialMetricsDispatch,
): FinancialMetricsState {
  const reducer = financialMetricsReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const financialMetricsReducers = new Map<
  FinancialMetricsAction[keyof FinancialMetricsAction],
  (
    state: FinancialMetricsState,
    dispatch: FinancialMetricsDispatch,
  ) => FinancialMetricsState
>([
  [
    financialMetricsAction.setCalendarChartsData,
    financialMetricsReducer_setCalendarChartsData,
  ],
  [financialMetricsAction.setCards, financialMetricsReducer_setCards],
  [financialMetricsAction.setCharts, financialMetricsReducer_setCharts],
  [
    financialMetricsAction.setFinancialChartsWorker,
    financialMetricsReducer_setFinancialChartsWorker,
  ],
  [
    financialMetricsAction.setIsGenerating,
    financialMetricsReducer_setIsGenerating,
  ],
]);

function financialMetricsReducer_setCalendarChartsData(
  state: FinancialMetricsState,
  dispatch: FinancialMetricsDispatch,
): FinancialMetricsState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setCalendarChartsFinancialMetricsDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  return {
    ...state,
    calendarChartsData: parsedResult.val.val.payload as {
      currentYear: FinancialMetricsCalendarCharts;
      previousYear: FinancialMetricsCalendarCharts;
    },
  };
}

function financialMetricsReducer_setCards(
  state: FinancialMetricsState,
  dispatch: FinancialMetricsDispatch,
): FinancialMetricsState {
  if (!dispatch.payload) {
    return state;
  }

  return {
    ...state,
    cards: dispatch.payload as FinancialMetricsCards,
  };
}

function financialMetricsReducer_setCharts(
  state: FinancialMetricsState,
  dispatch: FinancialMetricsDispatch,
): FinancialMetricsState {
  return parseDispatchAndSetState({
    dispatch,
    key: "charts",
    state,
    zSchema: setChartsFinancialMetricsDispatchZod,
  });
}

function financialMetricsReducer_setFinancialChartsWorker(
  state: FinancialMetricsState,
  dispatch: FinancialMetricsDispatch,
): FinancialMetricsState {
  return parseDispatchAndSetState({
    dispatch,
    key: "financialChartsWorker",
    state,
    zSchema: setChartsWorkerFinancialMetricsDispatchZod,
  });
}

function financialMetricsReducer_setIsGenerating(
  state: FinancialMetricsState,
  dispatch: FinancialMetricsDispatch,
): FinancialMetricsState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isGenerating",
    state,
    zSchema: setIsGeneratingFinancialMetricsDispatchZod,
  });
}

export {
  financialMetricsReducer,
  financialMetricsReducer_setCalendarChartsData,
  financialMetricsReducer_setCards,
  financialMetricsReducer_setCharts,
  financialMetricsReducer_setFinancialChartsWorker,
  financialMetricsReducer_setIsGenerating,
};
