import type { Err } from "ts-results";
import type { SafeError } from "../../types";

type LoginState = {
    username: string;
    password: string;
    isLoading: boolean;
    isSubmitting: boolean;
    isError: boolean;
    financialMetricsGenerated: boolean;
    productMetricsGenerated: boolean;
    repairMetricsGenerated: boolean;
    financialMetricsWorker: Worker | null;
    productMetricsWorker: Worker | null;
    repairMetricsWorker: Worker | null;
    errorMessage: string;
    customerMetricsWorker: Worker | null;
    loginFetchWorker: Worker | null;
    safeErrorResult: Err<SafeError> | null;
};

const initialLoginState: LoginState = {
    username: "",
    password: "",
    isLoading: false,
    isSubmitting: false,
    isError: false,
    financialMetricsGenerated: false,
    productMetricsGenerated: false,
    repairMetricsGenerated: false,
    financialMetricsWorker: null,
    productMetricsWorker: null,
    repairMetricsWorker: null,
    errorMessage: "",
    customerMetricsWorker: null,
    loginFetchWorker: null,
    safeErrorResult: null,
};

export { initialLoginState };
export type { LoginState };
