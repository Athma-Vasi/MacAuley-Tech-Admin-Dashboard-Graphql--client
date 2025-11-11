import { parseDispatchAndSetState } from "../../../../utils";
import { type NewAction, newAction } from "./actions";
import { setYAxisKeyNewDispatchZod } from "./schemas";
import type { NewDispatch, NewState } from "./types";

function newReducer(state: NewState, dispatch: NewDispatch) {
  const reducer = newReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const newReducers = new Map<
  NewAction[keyof NewAction],
  (state: NewState, dispatch: NewDispatch) => NewState
>([
  [newAction.setYAxisKey, newReducer_setYAxisKey],
]);

function newReducer_setYAxisKey(
  state: NewState,
  dispatch: NewDispatch,
): NewState {
  return parseDispatchAndSetState({
    dispatch,
    key: "yAxisKey",
    state,
    zSchema: setYAxisKeyNewDispatchZod,
  });
}

export { newReducer, newReducer_setYAxisKey };
