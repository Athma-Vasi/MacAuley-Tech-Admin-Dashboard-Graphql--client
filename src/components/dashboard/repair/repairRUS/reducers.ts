import { parseDispatchAndSetState } from "../../../../utils";
import { type RepairRUSAction, repairRUSAction } from "./actions";
import { setYAxisKeyRepairRUSDispatchZod } from "./schemas";
import type { RepairRUSDispatch, RepairRUSState } from "./types";

function repairRUSReducer(
  state: RepairRUSState,
  dispatch: RepairRUSDispatch,
): RepairRUSState {
  const reducer = repairRUSReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const repairRUSReducersMap = new Map<
  RepairRUSAction[keyof RepairRUSAction],
  (state: RepairRUSState, dispatch: RepairRUSDispatch) => RepairRUSState
>([
  [repairRUSAction.setYAxisKey, repairRUSReducer_setYAxisKey],
]);

function repairRUSReducer_setYAxisKey(
  state: RepairRUSState,
  dispatch: RepairRUSDispatch,
): RepairRUSState {
  return parseDispatchAndSetState({
    dispatch,
    key: "yAxisKey",
    state,
    zSchema: setYAxisKeyRepairRUSDispatchZod,
  });
}

export { repairRUSReducer, repairRUSReducer_setYAxisKey };
