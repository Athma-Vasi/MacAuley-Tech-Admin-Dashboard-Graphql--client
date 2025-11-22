import type { Prettify } from "../../types.ts";
import type { LoginState } from "./state.ts";

type LoginAction = Prettify<
    {
        [K in keyof LoginState as `set${Capitalize<string & K>}`]:
            `set${Capitalize<
                string & K
            >}`;
    }
>;

const loginAction: LoginAction = {
    setUsername: "setUsername",
    setPassword: "setPassword",
    setIsLoading: "setIsLoading",
    setIsSubmitting: "setIsSubmitting",
    setIsError: "setIsError",
    setFinancialMetricsGenerated: "setFinancialMetricsGenerated",
    setProductMetricsGenerated: "setProductMetricsGenerated",
    setRepairMetricsGenerated: "setRepairMetricsGenerated",
    setFinancialMetricsWorker: "setFinancialMetricsWorker",
    setProductMetricsWorker: "setProductMetricsWorker",
    setRepairMetricsWorker: "setRepairMetricsWorker",
    setErrorMessage: "setErrorMessage",
    setCustomerMetricsWorker: "setCustomerMetricsWorker",
    setLoginForageWorker: "setLoginForageWorker",
    setSafeErrorResult: "setSafeErrorResult",
};

export { loginAction };
export type { LoginAction };
