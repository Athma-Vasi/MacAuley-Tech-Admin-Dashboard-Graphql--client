import { parseDispatchAndSetState } from "../../utils.ts";
import type { LoginAction } from "./actions.ts";
import { loginAction } from "./actions.ts";
import type { LoginDispatch } from "./schemas.ts";
import {
    setCustomerMetricsWorkerLoginDispatchZod,
    setErrorMessageLoginDispatchZod,
    setFinancialMetricsGeneratedLoginDispatchZod,
    setFinancialMetricsWorkerLoginDispatchZod,
    setIsLoadingLoginDispatchZod,
    setIsSubmittingLoginDispatchZod,
    setIsSuccessfulLoginDispatchZod,
    setLoginFetchWorkerLoginDispatchZod,
    setPasswordLoginDispatchZod,
    setProductMetricsGeneratedLoginDispatchZod,
    setProductMetricsWorkerLoginDispatchZod,
    setRepairMetricsGeneratedLoginDispatchZod,
    setRepairMetricsWorkerLoginDispatchZod,
    setUsernameLoginDispatchZod,
} from "./schemas.ts";
import type { LoginState } from "./state.ts";

function loginReducer(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    const reducer = loginReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const loginReducersMap: Map<
    LoginAction[keyof LoginAction],
    (state: LoginState, dispatch: LoginDispatch) => LoginState
> = new Map([
    [
        loginAction.setUsername,
        loginReducer_setUsername,
    ],
    [
        loginAction.setPassword,
        loginReducer_setPassword,
    ],
    [
        loginAction.setIsLoading,
        loginReducer_setIsLoading,
    ],
    [
        loginAction.setIsSubmitting,
        loginReducer_setIsSubmitting,
    ],
    [
        loginAction.setIsSuccessful,
        loginReducer_setIsSuccessful,
    ],
    [
        loginAction.setFinancialMetricsGenerated,
        loginReducer_setFinancialMetricsGenerated,
    ],
    [
        loginAction.setProductMetricsGenerated,
        loginReducer_setProductMetricsGenerated,
    ],
    [
        loginAction.setRepairMetricsGenerated,
        loginReducer_setRepairMetricsGenerated,
    ],
    [
        loginAction.setFinancialMetricsWorker,
        loginReducer_setFinancialMetricsWorker,
    ],
    [
        loginAction.setProductMetricsWorker,
        loginReducer_setProductMetricsWorker,
    ],
    [
        loginAction.setRepairMetricsWorker,
        loginReducer_setRepairMetricsWorker,
    ],
    [
        loginAction.setErrorMessage,
        loginReducer_setErrorMessage,
    ],
    [
        loginAction.setCustomerMetricsWorker,
        loginReducer_setCustomerMetricsWorker,
    ],
    [
        loginAction.setLoginFetchWorker,
        loginReducer_setLoginFetchWorker,
    ],
]);

function loginReducer_setUsername(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "username",
        state,
        zSchema: setUsernameLoginDispatchZod,
    });
}

function loginReducer_setPassword(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "password",
        state,
        zSchema: setPasswordLoginDispatchZod,
    });
}

function loginReducer_setIsLoading(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "isLoading",
        state,
        zSchema: setIsLoadingLoginDispatchZod,
    });
}

function loginReducer_setIsSubmitting(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "isSubmitting",
        state,
        zSchema: setIsSubmittingLoginDispatchZod,
    });
}

function loginReducer_setIsSuccessful(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "isSuccessful",
        state,
        zSchema: setIsSuccessfulLoginDispatchZod,
    });
}

function loginReducer_setFinancialMetricsGenerated(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "financialMetricsGenerated",
        state,
        zSchema: setFinancialMetricsGeneratedLoginDispatchZod,
    });
}

function loginReducer_setProductMetricsGenerated(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "productMetricsGenerated",
        state,
        zSchema: setProductMetricsGeneratedLoginDispatchZod,
    });
}

function loginReducer_setRepairMetricsGenerated(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "repairMetricsGenerated",
        state,
        zSchema: setRepairMetricsGeneratedLoginDispatchZod,
    });
}

function loginReducer_setFinancialMetricsWorker(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "financialMetricsWorker",
        state,
        zSchema: setFinancialMetricsWorkerLoginDispatchZod,
    });
}

function loginReducer_setProductMetricsWorker(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "productMetricsWorker",
        state,
        zSchema: setProductMetricsWorkerLoginDispatchZod,
    });
}

function loginReducer_setRepairMetricsWorker(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "repairMetricsWorker",
        state,
        zSchema: setRepairMetricsWorkerLoginDispatchZod,
    });
}

function loginReducer_setErrorMessage(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "errorMessage",
        state,
        zSchema: setErrorMessageLoginDispatchZod,
    });
}

function loginReducer_setCustomerMetricsWorker(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "customerMetricsWorker",
        state,
        zSchema: setCustomerMetricsWorkerLoginDispatchZod,
    });
}

function loginReducer_setLoginFetchWorker(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return parseDispatchAndSetState({
        dispatch,
        key: "loginFetchWorker",
        state,
        zSchema: setLoginFetchWorkerLoginDispatchZod,
    });
}

export {
    loginReducer,
    loginReducer_setCustomerMetricsWorker,
    loginReducer_setErrorMessage,
    loginReducer_setFinancialMetricsGenerated,
    loginReducer_setFinancialMetricsWorker,
    loginReducer_setIsLoading,
    loginReducer_setIsSubmitting,
    loginReducer_setIsSuccessful,
    loginReducer_setPassword,
    loginReducer_setProductMetricsGenerated,
    loginReducer_setProductMetricsWorker,
    loginReducer_setRepairMetricsGenerated,
    loginReducer_setRepairMetricsWorker,
    loginReducer_setUsername,
    loginReducersMap,
};
