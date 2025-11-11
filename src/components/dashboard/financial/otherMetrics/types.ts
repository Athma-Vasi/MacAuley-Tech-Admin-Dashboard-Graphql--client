import type { FinancialMetricsOtherMetricsChartsKey } from "../chartsData";
import type { OtherMetricsAction } from "./actions";

type OtherMetricsState = {
  yAxisKey: FinancialMetricsOtherMetricsChartsKey;
};

type OtherMetricsDispatch = {
  action: OtherMetricsAction["setYAxisKey"];
  payload: FinancialMetricsOtherMetricsChartsKey;
};

export type { OtherMetricsDispatch, OtherMetricsState };
