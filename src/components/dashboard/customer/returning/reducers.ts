import { parseDispatchAndSetState } from "../../../../utils";
import { type ReturningAction, returningAction } from "./actions";
import { setYAxisKeyReturningDispatchZod } from "./schemas";
import type { ReturningDispatch, ReturningState } from "./types";

function returningReducer(state: ReturningState, dispatch: ReturningDispatch) {
  const reducer = returningReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const returningReducers = new Map<
  ReturningAction[keyof ReturningAction],
  (state: ReturningState, dispatch: ReturningDispatch) => ReturningState
>([
  [returningAction.setYAxisKey, returningReducer_setYAxisKey],
]);

function returningReducer_setYAxisKey(
  state: ReturningState,
  dispatch: ReturningDispatch,
): ReturningState {
  return parseDispatchAndSetState({
    dispatch,
    key: "yAxisKey",
    state,
    zSchema: setYAxisKeyReturningDispatchZod,
  });
}

export { returningReducer, returningReducer_setYAxisKey };
