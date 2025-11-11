import type { Prettify } from "../../../../types";
import type { NewState } from "./types";

type NewAction = Prettify<
  {
    [K in keyof NewState as `set${Capitalize<string & K>}`]: `set${Capitalize<
      string & K
    >}`;
  }
>;

const newAction: NewAction = {
  setYAxisKey: "setYAxisKey",
};

export { newAction };
export type { NewAction };
