import { ErrImpl } from "ts-results";
import { z } from "zod";
import { loginAction } from "./actions";

const setIsLoadingLoginDispatchZod = z.object({
    action: z.literal(loginAction.setIsLoading),
    payload: z.boolean(),
});
const setIsSubmittingLoginDispatchZod = z.object({
    action: z.literal(loginAction.setIsSubmitting),
    payload: z.boolean(),
});
const setIsErrorLoginDispatchZod = z.object({
    action: z.literal(loginAction.setIsError),
    payload: z.boolean(),
});
const setPasswordLoginDispatchZod = z.object({
    action: z.literal(loginAction.setPassword),
    payload: z.string(),
});
const setUsernameLoginDispatchZod = z.object({
    action: z.literal(loginAction.setUsername),
    payload: z.string(),
});
const setLoginFetchWorkerLoginDispatchZod = z.object({
    action: z.literal(loginAction.setLoginFetchWorker),
    payload: z.instanceof(Worker),
});

const setErrorMessageLoginDispatchZod = z.object({
    action: z.literal(loginAction.setErrorMessage),
    payload: z.string(),
});

const setFinancialMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginAction.setFinancialMetricsWorker),
    payload: z.instanceof(Worker),
});

const setProductMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginAction.setProductMetricsWorker),
    payload: z.instanceof(Worker),
});

const setRepairMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginAction.setRepairMetricsWorker),
    payload: z.instanceof(Worker),
});

const setCustomerMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginAction.setCustomerMetricsWorker),
    payload: z.instanceof(Worker),
});

const setProductMetricsGeneratedLoginDispatchZod = z.object({
    action: z.literal(loginAction.setProductMetricsGenerated),
    payload: z.boolean(),
});

const setRepairMetricsGeneratedLoginDispatchZod = z.object({
    action: z.literal(loginAction.setRepairMetricsGenerated),
    payload: z.boolean(),
});

const setFinancialMetricsGeneratedLoginDispatchZod = z.object({
    action: z.literal(loginAction.setFinancialMetricsGenerated),
    payload: z.boolean(),
});

const setSafeErrorResultLoginDispatchZod = z.object({
    action: z.literal(loginAction.setSafeErrorResult),
    payload: z.instanceof(ErrImpl).nullable(),
});

type LoginDispatch =
    | z.infer<typeof setCustomerMetricsWorkerLoginDispatchZod>
    | z.infer<typeof setErrorMessageLoginDispatchZod>
    | z.infer<typeof setFinancialMetricsGeneratedLoginDispatchZod>
    | z.infer<typeof setFinancialMetricsWorkerLoginDispatchZod>
    | z.infer<typeof setIsLoadingLoginDispatchZod>
    | z.infer<typeof setIsSubmittingLoginDispatchZod>
    | z.infer<typeof setIsErrorLoginDispatchZod>
    | z.infer<typeof setLoginFetchWorkerLoginDispatchZod>
    | z.infer<typeof setPasswordLoginDispatchZod>
    | z.infer<typeof setProductMetricsGeneratedLoginDispatchZod>
    | z.infer<typeof setProductMetricsWorkerLoginDispatchZod>
    | z.infer<typeof setRepairMetricsGeneratedLoginDispatchZod>
    | z.infer<typeof setRepairMetricsWorkerLoginDispatchZod>
    | z.infer<typeof setUsernameLoginDispatchZod>
    | z.infer<typeof setSafeErrorResultLoginDispatchZod>;

const handleLoginClickInputZod = z.object({
    isLoading: z.boolean(),
    isSubmitting: z.boolean(),
    isSuccessful: z.boolean(),
    loginDispatch: z.function(),
    loginFetchWorker: z.instanceof(Worker),
    schema: z.object({
        username: z.string(),
        password: z.string(),
    }),
});

const handleMessageEventLoginForageWorkerToMainInputZod = z.object({
    event: z.instanceof(MessageEvent),
    globalDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    loginDispatch: z.function(),
    navigate: z.function().output(z.void()),
});

const handleMessageEventCustomerMetricsWorkerToMainInputZod = z.object({
    event: z.instanceof(MessageEvent),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    loginDispatch: z.function(),
});

const handleMessageEventProductMetricsWorkerToMainInputZod = z.object({
    event: z.instanceof(MessageEvent),
    loginDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
});

const handleMessageEventRepairMetricsWorkerToMainInputZod = z.object({
    event: z.instanceof(MessageEvent),
    loginDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
});

const handleMessageEventFinancialMetricsWorkerToMainInputZod = z.object({
    event: z.instanceof(MessageEvent),
    loginDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
});

const handleMessageEventTriggerPrefetchWorkerToMainInputZod = z.object({
    isComponentMountedRef: z.object({ current: z.boolean() }),
    isLoading: z.boolean(),
    isSubmitting: z.boolean(),
    isSuccessful: z.boolean(),
    loginDispatch: z.function(),
    prefetchAndCacheWorker: z.instanceof(Worker),
    schema: z.object({
        username: z.string(),
        password: z.string(),
    }),
    showBoundary: z.function(),
});

const handleMessageEventLoginPrefetchAndCacheWorkerToMainInputZod = z.object({
    authDispatch: z.function(),
    event: z.instanceof(MessageEvent),
    loginDispatch: z.function(),
    isComponentMountedRef: z.object({ current: z.boolean() }),
    showBoundary: z.function(),
});

export {
    handleLoginClickInputZod,
    handleMessageEventCustomerMetricsWorkerToMainInputZod,
    handleMessageEventFinancialMetricsWorkerToMainInputZod,
    handleMessageEventLoginForageWorkerToMainInputZod,
    handleMessageEventLoginPrefetchAndCacheWorkerToMainInputZod,
    handleMessageEventProductMetricsWorkerToMainInputZod,
    handleMessageEventRepairMetricsWorkerToMainInputZod,
    handleMessageEventTriggerPrefetchWorkerToMainInputZod,
    setCustomerMetricsWorkerLoginDispatchZod,
    setErrorMessageLoginDispatchZod,
    setFinancialMetricsGeneratedLoginDispatchZod,
    setFinancialMetricsWorkerLoginDispatchZod,
    setIsErrorLoginDispatchZod,
    setIsLoadingLoginDispatchZod,
    setIsSubmittingLoginDispatchZod,
    setLoginFetchWorkerLoginDispatchZod,
    setPasswordLoginDispatchZod,
    setProductMetricsGeneratedLoginDispatchZod,
    setProductMetricsWorkerLoginDispatchZod,
    setRepairMetricsGeneratedLoginDispatchZod,
    setRepairMetricsWorkerLoginDispatchZod,
    setSafeErrorResultLoginDispatchZod,
    setUsernameLoginDispatchZod,
};
export type { LoginDispatch };
