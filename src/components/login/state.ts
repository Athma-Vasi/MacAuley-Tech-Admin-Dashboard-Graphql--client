type LoginState = {
    username: string;
    password: string;
    isLoading: boolean;
    isSubmitting: boolean;
    isSuccessful: boolean;
    financialMetricsGenerated: boolean;
    productMetricsGenerated: boolean;
    repairMetricsGenerated: boolean;
    financialMetricsWorker: Worker | null;
    productMetricsWorker: Worker | null;
    repairMetricsWorker: Worker | null;
    errorMessage: string;
    customerMetricsWorker: Worker | null;
};

const initialLoginState: LoginState = {
    username: "",
    password: "",
    isLoading: false,
    isSubmitting: false,
    isSuccessful: false,
    financialMetricsGenerated: false,
    productMetricsGenerated: false,
    repairMetricsGenerated: false,
    financialMetricsWorker: null,
    productMetricsWorker: null,
    repairMetricsWorker: null,
    errorMessage: "",
    customerMetricsWorker: null,
};

export { initialLoginState };
export type { LoginState };
