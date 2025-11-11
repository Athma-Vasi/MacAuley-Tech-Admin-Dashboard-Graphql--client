import type { Prettify } from "../../../../types";
import type { PERTState } from "./types";

type PERTAction = Prettify<
  {
    [K in keyof PERTState as `set${Capitalize<string & K>}`]: `set${Capitalize<
      string & K
    >}`;
  }
>;

const pertAction: PERTAction = {
  setYAxisKey: "setYAxisKey",
};

export { pertAction };
export type { PERTAction };
