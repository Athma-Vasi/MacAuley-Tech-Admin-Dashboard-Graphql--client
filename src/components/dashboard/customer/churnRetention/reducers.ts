import { parseDispatchAndSetState } from "../../../../utils";
import { type ChurnRetentionAction, churnRetentionAction } from "./actions";
import { setYAxisKeyChurnRetentionDispatchZod } from "./schemas";
import type { ChurnRetentionDispatch, ChurnRetentionState } from "./types";

function churnRetentionReducer(
  state: ChurnRetentionState,
  dispatch: ChurnRetentionDispatch,
): ChurnRetentionState {
  const reducer = churnRetentionReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const churnRetentionReducers = new Map<
  ChurnRetentionAction[keyof ChurnRetentionAction],
  (
    state: ChurnRetentionState,
    dispatch: ChurnRetentionDispatch,
  ) => ChurnRetentionState
>([
  [churnRetentionAction.setYAxisKey, churnRetentionReducer_setYAxisKey],
]);

function churnRetentionReducer_setYAxisKey(
  state: ChurnRetentionState,
  dispatch: ChurnRetentionDispatch,
): ChurnRetentionState {
  return parseDispatchAndSetState({
    dispatch,
    key: "yAxisKey",
    state,
    zSchema: setYAxisKeyChurnRetentionDispatchZod,
  });
}

export { churnRetentionReducer, churnRetentionReducer_setYAxisKey };
