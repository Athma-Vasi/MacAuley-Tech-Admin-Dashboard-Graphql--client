import type { LoginState } from "./state.ts";

type LoginActions = {
    [K in keyof LoginState as `set${Capitalize<string & K>}`]: `set${Capitalize<
        string & K
    >}`;
};

const loginActions: LoginActions = {
    setUsername: "setUsername",
    setPassword: "setPassword",
};

export { loginActions };
export type { LoginActions };
