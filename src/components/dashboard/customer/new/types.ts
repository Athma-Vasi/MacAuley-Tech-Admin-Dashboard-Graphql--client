import type { CustomerNewReturningYAxisKey } from "../types";
import type { NewAction } from "./actions";

type NewState = {
  yAxisKey: CustomerNewReturningYAxisKey;
};

type NewDispatch = {
  action: NewAction["setYAxisKey"];
  payload: CustomerNewReturningYAxisKey;
};

export type { NewDispatch, NewState };
