import { parseDispatchAndSetState } from "../../../../utils";
import { type RUSAction, rusAction } from "./actions";
import { setYAxisKeyRUSDispatchZod } from "./schemas";
import type { RUSDispatch, RUSState } from "./types";

function rusReducer(state: RUSState, dispatch: RUSDispatch): RUSState {
  const reducer = rusReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const rusReducers = new Map<
  RUSAction[keyof RUSAction],
  (state: RUSState, dispatch: RUSDispatch) => RUSState
>([
  [rusAction.setYAxisKey, rusReducer_setYAxisKey],
]);

function rusReducer_setYAxisKey(
  state: RUSState,
  dispatch: RUSDispatch,
): RUSState {
  return parseDispatchAndSetState({
    dispatch,
    key: "yAxisKey",
    state,
    zSchema: setYAxisKeyRUSDispatchZod,
  });
}

export { rusReducer, rusReducer_setYAxisKey };
