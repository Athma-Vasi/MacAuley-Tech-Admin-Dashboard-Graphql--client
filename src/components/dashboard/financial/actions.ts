import type { Prettify } from "../../../types";
import type { FinancialMetricsState } from "./types";

type FinancialMetricsAction = Prettify<
  {
    [K in keyof FinancialMetricsState as `set${Capitalize<string & K>}`]:
      `set${Capitalize<string & K>}`;
  }
>;

const financialMetricsAction: FinancialMetricsAction = {
  setCalendarChartsData: "setCalendarChartsData",
  setCards: "setCards",
  setCharts: "setCharts",
  setFinancialChartsWorker: "setFinancialChartsWorker",
  setIsGenerating: "setIsGenerating",
};

export { financialMetricsAction };
export type { FinancialMetricsAction };
