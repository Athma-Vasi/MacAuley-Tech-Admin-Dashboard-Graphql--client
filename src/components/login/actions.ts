import type { LoginState } from "./state.ts";

type LoginActions = {
    [K in keyof LoginState as `set${Capitalize<string & K>}`]: `set${Capitalize<
        string & K
    >}`;
};

const loginActions: LoginActions = {
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
};

export { loginActions };
export type { LoginActions };
