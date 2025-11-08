import { parseSyncSafe } from "../../utils.ts";
import type { LoginActions } from "./actions.ts";
import { loginActions } from "./actions.ts";
import type { LoginDispatch } from "./dispatches.ts";
import {
    setPasswordLoginDispatchZod,
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
]);

function loginReducer_setUsername(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    const parsedResult = parseSyncSafe(
        {
            object: dispatch,
            zSchema: setUsernameLoginDispatchZod,
        },
    );
    if (parsedResult.err) {
        return state;
    }

    const parsedMaybe = parsedResult.safeUnwrap();
    if (parsedMaybe.none) {
        return state;
    }

    return {
        ...state,
        username: parsedMaybe.safeUnwrap().payload as string,
    };
}

function loginReducer_setPassword(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    const parsedResult = parseSyncSafe(
        {
            object: dispatch,
            zSchema: setPasswordLoginDispatchZod,
        },
    );
    if (parsedResult.err) {
        return state;
    }

    const parsedMaybe = parsedResult.safeUnwrap();
    if (parsedMaybe.none) {
        return state;
    }

    return {
        ...state,
        password: parsedMaybe.safeUnwrap().payload as string,
    };
}

export {
    loginReducer,
    loginReducer_setPassword,
    loginReducer_setUsername,
    loginReducersMap,
};
