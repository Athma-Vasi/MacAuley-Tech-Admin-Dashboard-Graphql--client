import type { RepairSubMetric } from "../types";
import type { RepairRUSAction } from "./actions";

type RepairRUSState = {
  yAxisKey: RepairSubMetric;
};

type RepairRUSDispatch = {
  action: RepairRUSAction["setYAxisKey"];
  payload: RepairSubMetric;
};

export type { RepairRUSDispatch, RepairRUSState };
