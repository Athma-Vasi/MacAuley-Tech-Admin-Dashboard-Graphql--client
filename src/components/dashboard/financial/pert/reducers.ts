import { parseDispatchAndSetState } from "../../../../utils";
import { type PERTAction, pertAction } from "./actions";
import { setYAxisKeyPERTDispatchZod } from "./schemas";
import type { PERTDispatch, PERTState } from "./types";

function pertReducer(state: PERTState, dispatch: PERTDispatch): PERTState {
  const reducer = pertReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const pertReducers = new Map<
  PERTAction[keyof PERTAction],
  (state: PERTState, dispatch: PERTDispatch) => PERTState
>([
  [pertAction.setYAxisKey, pertReducer_setYAxisKey],
]);

function pertReducer_setYAxisKey(
  state: PERTState,
  dispatch: PERTDispatch,
): PERTState {
  return parseDispatchAndSetState({
    dispatch,
    key: "yAxisKey",
    state,
    zSchema: setYAxisKeyPERTDispatchZod,
  });
}

export { pertReducer, pertReducer_setYAxisKey };
