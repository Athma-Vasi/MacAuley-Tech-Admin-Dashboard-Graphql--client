import type { Prettify } from "../../../../types";
import type { RUSState } from "./types";

type RUSAction = Prettify<
  {
    [K in keyof RUSState as `set${Capitalize<string & K>}`]: `set${Capitalize<
      string & K
    >}`;
  }
>;

const rusAction: RUSAction = {
  setYAxisKey: "setYAxisKey",
};

export { rusAction };
export type { RUSAction };
