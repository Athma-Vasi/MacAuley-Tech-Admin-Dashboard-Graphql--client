import { parseDispatchAndSetState } from "../../../../utils";
import { type OtherMetricsAction, otherMetricsAction } from "./actions";
import { setYAxisKeyOtherMetricsDispatchZod } from "./schemas";
import type { OtherMetricsDispatch, OtherMetricsState } from "./types";

function otherMetricsReducer(
  state: OtherMetricsState,
  dispatch: OtherMetricsDispatch,
): OtherMetricsState {
  const reducer = otherMetricsReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const otherMetricsReducers = new Map<
  OtherMetricsAction[keyof OtherMetricsAction],
  (
    state: OtherMetricsState,
    dispatch: OtherMetricsDispatch,
  ) => OtherMetricsState
>([
  [
    otherMetricsAction.setYAxisKey,
    otherMetricsReducer_setYAxisKey,
  ],
]);

function otherMetricsReducer_setYAxisKey(
  state: OtherMetricsState,
  dispatch: OtherMetricsDispatch,
): OtherMetricsState {
  return parseDispatchAndSetState({
    dispatch,
    key: "yAxisKey",
    state,
    zSchema: setYAxisKeyOtherMetricsDispatchZod,
  });
}

export { otherMetricsReducer, otherMetricsReducer_setYAxisKey };
