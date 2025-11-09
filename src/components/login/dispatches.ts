import { z } from "zod";
import { loginActions } from "./actions.ts";

const setUsernameLoginDispatchZod = z.object({
    action: z.literal(loginActions.setUsername),
    payload: z.string(),
});

const setPasswordLoginDispatchZod = z.object({
    action: z.literal(loginActions.setPassword),
    payload: z.string(),
});

const setIsLoadingLoginDispatchZod = z.object({
    action: z.literal(loginActions.setIsLoading),
    payload: z.boolean(),
});

const setIsSubmittingLoginDispatchZod = z.object({
    action: z.literal(loginActions.setIsSubmitting),
    payload: z.boolean(),
});

const setIsSuccessfulLoginDispatchZod = z.object({
    action: z.literal(loginActions.setIsSuccessful),
    payload: z.boolean(),
});

const setFinancialMetricsGeneratedLoginDispatchZod = z.object({
    action: z.literal(loginActions.setFinancialMetricsGenerated),
    payload: z.boolean(),
});

const setProductMetricsGeneratedLoginDispatchZod = z.object({
    action: z.literal(loginActions.setProductMetricsGenerated),
    payload: z.boolean(),
});

const setRepairMetricsGeneratedLoginDispatchZod = z.object({
    action: z.literal(loginActions.setRepairMetricsGenerated),
    payload: z.boolean(),
});

const setFinancialMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginActions.setFinancialMetricsWorker),
    payload: z.instanceof(Worker).nullable(),
});

const setProductMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginActions.setProductMetricsWorker),
    payload: z.instanceof(Worker).nullable(),
});

const setRepairMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginActions.setRepairMetricsWorker),
    payload: z.instanceof(Worker).nullable(),
});

const setErrorMessageLoginDispatchZod = z.object({
    action: z.literal(loginActions.setErrorMessage),
    payload: z.string(),
});

const setCustomerMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginActions.setCustomerMetricsWorker),
    payload: z.instanceof(Worker).nullable(),
});

type LoginDispatch =
    | z.infer<typeof setUsernameLoginDispatchZod>
    | z.infer<typeof setPasswordLoginDispatchZod>
    | z.infer<typeof setIsLoadingLoginDispatchZod>
    | z.infer<typeof setIsSubmittingLoginDispatchZod>
    | z.infer<typeof setIsSuccessfulLoginDispatchZod>
    | z.infer<typeof setFinancialMetricsGeneratedLoginDispatchZod>
    | z.infer<typeof setProductMetricsGeneratedLoginDispatchZod>
    | z.infer<typeof setRepairMetricsGeneratedLoginDispatchZod>
    | z.infer<typeof setFinancialMetricsWorkerLoginDispatchZod>
    | z.infer<typeof setProductMetricsWorkerLoginDispatchZod>
    | z.infer<typeof setRepairMetricsWorkerLoginDispatchZod>
    | z.infer<typeof setErrorMessageLoginDispatchZod>
    | z.infer<typeof setCustomerMetricsWorkerLoginDispatchZod>;

export {
    setCustomerMetricsWorkerLoginDispatchZod,
    setErrorMessageLoginDispatchZod,
    setFinancialMetricsGeneratedLoginDispatchZod,
    setFinancialMetricsWorkerLoginDispatchZod,
    setIsLoadingLoginDispatchZod,
    setIsSubmittingLoginDispatchZod,
    setIsSuccessfulLoginDispatchZod,
    setPasswordLoginDispatchZod,
    setProductMetricsGeneratedLoginDispatchZod,
    setProductMetricsWorkerLoginDispatchZod,
    setRepairMetricsGeneratedLoginDispatchZod,
    setRepairMetricsWorkerLoginDispatchZod,
    setUsernameLoginDispatchZod,
};
export type { LoginDispatch };
