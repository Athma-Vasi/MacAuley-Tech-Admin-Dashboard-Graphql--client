import type { LoginState } from "./state.ts";

type LoginAction = {
    [K in keyof LoginState as `set${Capitalize<string & K>}`]: `set${Capitalize<
        string & K
    >}`;
};

const loginAction: LoginAction = {
    setUsername: "setUsername",
    setPassword: "setPassword",
    setIsLoading: "setIsLoading",
    setIsSubmitting: "setIsSubmitting",
    setIsSuccessful: "setIsSuccessful",
    setFinancialMetricsGenerated: "setFinancialMetricsGenerated",
    setProductMetricsGenerated: "setProductMetricsGenerated",
    setRepairMetricsGenerated: "setRepairMetricsGenerated",
    setFinancialMetricsWorker: "setFinancialMetricsWorker",
    setProductMetricsWorker: "setProductMetricsWorker",
    setRepairMetricsWorker: "setRepairMetricsWorker",
    setErrorMessage: "setErrorMessage",
    setCustomerMetricsWorker: "setCustomerMetricsWorker",
    setLoginFetchWorker: "setLoginFetchWorker",
};

export { loginAction };
export type { LoginAction };
