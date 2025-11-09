import { parseDispatchAndSetState } from "../../utils.ts";
import type { LoginActions } from "./actions.ts";
import { loginActions } from "./actions.ts";
import type { LoginDispatch } from "./dispatches.ts";
import {
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
} from "./dispatches.ts";
import type { LoginState } from "./state.ts";

function loginReducer(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    const reducer = loginReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const loginReducersMap: Map<
    LoginActions[keyof LoginActions],
    (state: LoginState, dispatch: LoginDispatch) => LoginState
> = new Map([
    [
        loginActions.setUsername,
        loginReducer_setUsername,
    ],
    [
        loginActions.setPassword,
        loginReducer_setPassword,
    ],
    [
        loginActions.setIsLoading,
        loginReducer_setIsLoading,
    ],
    [
        loginActions.setIsSubmitting,
        loginReducer_setIsSubmitting,
    ],
    [
        loginActions.setIsSuccessful,
        loginReducer_setIsSuccessful,
    ],
    [
        loginActions.setFinancialMetricsGenerated,
        loginReducer_setFinancialMetricsGenerated,
    ],
    [
        loginActions.setProductMetricsGenerated,
        loginReducer_setProductMetricsGenerated,
    ],
    [
        loginActions.setRepairMetricsGenerated,
        loginReducer_setRepairMetricsGenerated,
    ],
    [
        loginActions.setFinancialMetricsWorker,
        loginReducer_setFinancialMetricsWorker,
    ],
    [
        loginActions.setProductMetricsWorker,
        loginReducer_setProductMetricsWorker,
    ],
    [
        loginActions.setRepairMetricsWorker,
        loginReducer_setRepairMetricsWorker,
    ],
    [
        loginActions.setErrorMessage,
        loginReducer_setErrorMessage,
    ],
    [
        loginActions.setCustomerMetricsWorker,
        loginReducer_setCustomerMetricsWorker,
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
