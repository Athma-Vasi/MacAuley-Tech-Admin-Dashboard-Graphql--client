import type { Prettify } from "../../../../types";
import type { OtherMetricsState } from "./types";

type OtherMetricsAction = Prettify<
  {
    [K in keyof OtherMetricsState as `set${Capitalize<string & K>}`]:
      `set${Capitalize<string & K>}`;
  }
>;

const otherMetricsAction: OtherMetricsAction = {
  setYAxisKey: "setYAxisKey",
};

export { otherMetricsAction };
export type { OtherMetricsAction };
