import type { CustomerNewReturningYAxisKey } from "../types";
import type { ReturningAction } from "./actions";

type ReturningState = {
  yAxisKey: CustomerNewReturningYAxisKey;
};

type ReturningDispatch = {
  action: ReturningAction["setYAxisKey"];
  payload: CustomerNewReturningYAxisKey;
};

export type { ReturningDispatch, ReturningState };
