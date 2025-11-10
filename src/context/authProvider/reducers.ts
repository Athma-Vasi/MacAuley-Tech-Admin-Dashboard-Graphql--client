import { parseDispatchAndSetState } from "../../utils";
import { type AuthAction, authAction } from "./actions";
import {
  setAccessTokenAuthDispatchZod,
  setDecodedTokenAuthDispatchZod,
  setIsLoggedInAuthDispatchZod,
  setUserDocumentAuthDispatchZod,
} from "./schemas";
import type { AuthDispatch, AuthState } from "./types";

function authReducer(state: AuthState, dispatch: AuthDispatch): AuthState {
  const reducer = authReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const authReducersMap = new Map<
  AuthAction[keyof AuthAction],
  (state: AuthState, dispatch: AuthDispatch) => AuthState
>([
  [authAction.setAccessToken, authReducer_setAccessToken],
  [authAction.setDecodedToken, authReducer_setDecodedToken],
  [authAction.setIsLoggedIn, authReducer_setIsLoggedIn],
  [authAction.setUserDocument, authReducer_setUserDocument],
]);

function authReducer_setAccessToken(
  state: AuthState,
  dispatch: AuthDispatch,
): AuthState {
  return parseDispatchAndSetState({
    dispatch,
    key: "accessToken",
    state,
    zSchema: setAccessTokenAuthDispatchZod,
  });
}

function authReducer_setDecodedToken(
  state: AuthState,
  dispatch: AuthDispatch,
): AuthState {
  return parseDispatchAndSetState({
    dispatch,
    key: "decodedToken",
    state,
    zSchema: setDecodedTokenAuthDispatchZod,
  });
}

function authReducer_setIsLoggedIn(
  state: AuthState,
  dispatch: AuthDispatch,
): AuthState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isLoggedIn",
    state,
    zSchema: setIsLoggedInAuthDispatchZod,
  });
}

function authReducer_setUserDocument(
  state: AuthState,
  dispatch: AuthDispatch,
): AuthState {
  return parseDispatchAndSetState({
    dispatch,
    key: "userDocument",
    state,
    zSchema: setUserDocumentAuthDispatchZod,
  });
}

export {
  authReducer,
  authReducer_setAccessToken,
  authReducer_setDecodedToken,
  authReducer_setIsLoggedIn,
  authReducer_setUserDocument,
};
