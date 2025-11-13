import type { NavigateFunction } from "react-router-dom";
import { commitMutation, graphql } from "relay-runtime";
import { authAction, type AuthDispatch } from "../../context/authProvider";
import {
  globalAction,
  type GlobalDispatch,
} from "../../context/globalProvider";
import { relayEnvironment } from "../../environment-single";
import {
  createSafeErrorResult,
  decodeJWTSafe,
  parseSyncSafe,
} from "../../utils";
import type { MessageEventCustomerMetricsWorkerToMain } from "../dashboard/customer/metricsWorker";
import type { MessageEventFinancialMetricsWorkerToMain } from "../dashboard/financial/metricsWorker";
import type { MessageEventProductMetricsWorkerToMain } from "../dashboard/product/metricsWorker";
import type { MessageEventRepairMetricsWorkerToMain } from "../dashboard/repair/metricsWorker";
import {
  AuthError,
  MessageHandlerError,
  NotFoundError,
} from "../error/classes";
import type {
  LoginUserMutation$data,
} from "./__generated__/LoginUserMutation.graphql";
import { loginAction } from "./actions";
import type { MessageEventLoginForageWorkerToMain } from "./forageWorker";
import {
  handleMessageEventCustomerMetricsWorkerToMainInputZod,
  handleMessageEventFinancialMetricsWorkerToMainInputZod,
  handleMessageEventLoginForageWorkerToMainInputZod,
  handleMessageEventProductMetricsWorkerToMainInputZod,
  handleMessageEventRepairMetricsWorkerToMainInputZod,
  type LoginDispatch,
} from "./schemas";

async function handleLogin(
  {
    authDispatch,
    isComponentMountedRef,
    loginDispatch,
    navigate,
    password,
    username,
  }: {
    authDispatch: React.Dispatch<AuthDispatch>;
    isComponentMountedRef: React.RefObject<boolean>;
    loginDispatch: React.Dispatch<LoginDispatch>;
    navigate: NavigateFunction;
    password: string;
    username: string;
  },
): Promise<undefined> {
  if (!isComponentMountedRef.current) {
    return;
  }

  const LoginUserMutation = graphql`
    mutation LoginUserMutation($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            accessToken
            message
            statusCode
            timestamp
            dataBox {
                _id
                addressLine
                city
                country
                department
                email
                expireAt
                firstName
                jobPosition
                lastName
                orgId
                parentOrgId
                postalCodeCanada
                postalCodeUS
                profilePictureUrl
                province
                roles
                state
                storeLocation
                username
                createdAt
                updatedAt
            }
        }
    }
`;

  loginDispatch({
    action: loginAction.setIsLoading,
    payload: true,
  });

  // Use standalone commitMutation with cacheConfig containing metadata
  commitMutation(relayEnvironment, {
    mutation: LoginUserMutation,
    variables: { username, password },

    // CacheConfig with metadata for endpoint routing
    cacheConfig: {
      metadata: {
        endpoint: "auth",
      },
    },

    onCompleted: (response, errors) => {
      loginDispatch({
        action: loginAction.setIsLoading,
        payload: false,
      });

      if (errors && errors.length > 0) {
        console.error("Login errors:", errors);

        loginDispatch({
          action: loginAction.setSafeErrorResult,
          payload: createSafeErrorResult(
            new AuthError(
              "Failed to login due to server errors",
            ),
          ),
        });
        return;
      }

      // Type assertion for response data
      const typedResponse = response as LoginUserMutation$data;
      const accessToken = typedResponse.loginUser?.accessToken || "";

      const decodedTokenResult = decodeJWTSafe(accessToken);
      if (decodedTokenResult.err) {
        loginDispatch({
          action: loginAction.setSafeErrorResult,
          payload: decodedTokenResult,
        });
        return;
      }

      const decodedTokenMaybe = decodedTokenResult.safeUnwrap();
      if (decodedTokenMaybe.none) {
        loginDispatch({
          action: loginAction.setSafeErrorResult,
          payload: createSafeErrorResult(
            new NotFoundError(
              "Decoded token is None",
            ),
          ),
        });
        return;
      }
      const decodedToken = decodedTokenMaybe.safeUnwrap();

      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: null,
      });
      authDispatch({
        action: authAction.setAccessToken,
        payload: accessToken,
      });
      authDispatch({
        action: authAction.setDecodedToken,
        payload: decodedToken,
      });

      navigate("/dashboard/financials");
      return;
    },

    onError: (error) => {
      if (!isComponentMountedRef.current) {
        return;
      }

      console.error("Mutation error:", error);
      loginDispatch({
        action: loginAction.setIsLoading,
        payload: false,
      });
      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: createSafeErrorResult(
          new AuthError(
            error,
            "Network error during login mutation",
          ),
        ),
      });
      return;
    },
  });
}

async function handleMessageEventCustomerMetricsWorkerToMain(
  input: {
    event: MessageEventCustomerMetricsWorkerToMain;
    isComponentMountedRef: React.RefObject<boolean>;
    loginDispatch: React.Dispatch<LoginDispatch>;
  },
): Promise<undefined> {
  try {
    const parsedInputResult = parseSyncSafe({
      object: input,
      zSchema: handleMessageEventCustomerMetricsWorkerToMainInputZod,
    });

    if (parsedInputResult.err) {
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: parsedInputResult,
      });
      return;
    }

    const parsedInputMaybe = parsedInputResult.safeUnwrap();
    if (parsedInputMaybe.none) {
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: createSafeErrorResult(
          new NotFoundError(
            "Unexpected None option in input parsing",
          ),
        ),
      });
      return;
    }

    const {
      event,
      isComponentMountedRef,
      loginDispatch,
    } = parsedInputMaybe.safeUnwrap();

    if (!isComponentMountedRef.current) {
      return;
    }

    const messageResult = event.data;
    if (messageResult.err) {
      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: messageResult,
      });
      return;
    }

    return;
  } catch (error: unknown) {
    input?.loginDispatch?.({
      action: loginAction.setSafeErrorResult,
      payload: createSafeErrorResult(
        new MessageHandlerError(
          error,
          "Unhandled error in customer metrics worker message handler",
        ),
      ),
    });
    return;
  }
}

async function handleMessageEventProductMetricsWorkerToMain(input: {
  event: MessageEventProductMetricsWorkerToMain;
  loginDispatch: React.Dispatch<LoginDispatch>;
  isComponentMountedRef: React.RefObject<boolean>;
}): Promise<undefined> {
  try {
    const parsedInputResult = parseSyncSafe({
      object: input,
      zSchema: handleMessageEventProductMetricsWorkerToMainInputZod,
    });
    if (parsedInputResult.err) {
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: parsedInputResult,
      });
      return;
    }

    const parsedInputMaybe = parsedInputResult.safeUnwrap();
    if (parsedInputMaybe.none) {
      const safeErrorResult = createSafeErrorResult(
        new NotFoundError(
          "Unexpected None option in input parsing",
        ),
      );
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: safeErrorResult,
      });
      return;
    }

    const {
      event,
      loginDispatch,
      isComponentMountedRef,
    } = parsedInputMaybe.safeUnwrap();

    if (!isComponentMountedRef.current) {
      return;
    }

    const messageEventResult = event.data;
    if (messageEventResult.err) {
      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: messageEventResult,
      });
      return;
    }

    loginDispatch({
      action: loginAction.setProductMetricsGenerated,
      payload: true,
    });

    return;
  } catch (error: unknown) {
    input?.loginDispatch?.({
      action: loginAction.setSafeErrorResult,
      payload: createSafeErrorResult(
        new MessageHandlerError(
          error,
          "Unhandled error in product metrics worker message handler",
        ),
      ),
    });
    return;
  }
}

async function handleMessageEventRepairMetricsWorkerToMain(input: {
  event: MessageEventRepairMetricsWorkerToMain;
  loginDispatch: React.Dispatch<LoginDispatch>;
  isComponentMountedRef: React.RefObject<boolean>;
}): Promise<undefined> {
  try {
    const parsedInputResult = parseSyncSafe({
      object: input,
      zSchema: handleMessageEventRepairMetricsWorkerToMainInputZod,
    });
    if (parsedInputResult.err) {
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: parsedInputResult,
      });
      return;
    }
    const parsedInputMaybe = parsedInputResult.safeUnwrap();
    if (parsedInputMaybe.none) {
      const safeErrorResult = createSafeErrorResult(
        new NotFoundError(
          "Unexpected None option in input parsing",
        ),
      );
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: safeErrorResult,
      });
      return;
    }

    const {
      event,
      loginDispatch,
      isComponentMountedRef,
    } = parsedInputMaybe.safeUnwrap();

    if (!isComponentMountedRef.current) {
      return;
    }

    const messageEventResult = event.data;
    if (messageEventResult.err) {
      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: messageEventResult,
      });
      return;
    }

    loginDispatch({
      action: loginAction.setRepairMetricsGenerated,
      payload: true,
    });

    return;
  } catch (error: unknown) {
    input?.loginDispatch?.({
      action: loginAction.setSafeErrorResult,
      payload: createSafeErrorResult(
        new MessageHandlerError(
          error,
          "Unhandled error in repair metrics worker message handler",
        ),
      ),
    });
    return;
  }
}

async function handleMessageEventFinancialMetricsWorkerToMain(input: {
  event: MessageEventFinancialMetricsWorkerToMain;
  loginDispatch: React.Dispatch<LoginDispatch>;
  isComponentMountedRef: React.RefObject<boolean>;
}): Promise<undefined> {
  try {
    const parsedInputResult = parseSyncSafe({
      object: input,
      zSchema: handleMessageEventFinancialMetricsWorkerToMainInputZod,
    });
    if (parsedInputResult.err) {
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: parsedInputResult,
      });
      return;
    }
    const parsedInputMaybe = parsedInputResult.safeUnwrap();
    if (parsedInputMaybe.none) {
      const safeErrorResult = createSafeErrorResult(
        new NotFoundError(
          "Unexpected None option in input parsing",
        ),
      );
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: safeErrorResult,
      });
      return;
    }

    const {
      event,
      loginDispatch,
      isComponentMountedRef,
    } = parsedInputMaybe.safeUnwrap();

    if (!isComponentMountedRef.current) {
      return;
    }

    const messageEventResult = event.data;
    if (messageEventResult.err) {
      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: messageEventResult,
      });
      return;
    }

    loginDispatch({
      action: loginAction.setFinancialMetricsGenerated,
      payload: true,
    });

    return;
  } catch (error: unknown) {
    input?.loginDispatch?.({
      action: loginAction.setSafeErrorResult,
      payload: createSafeErrorResult(
        new MessageHandlerError(
          error,
          "Unhandled error in financial metrics worker message handler",
        ),
      ),
    });
    return;
  }
}

async function handleMessageEventLoginForageWorkerToMain(
  input: {
    event: MessageEventLoginForageWorkerToMain;
    globalDispatch: React.Dispatch<GlobalDispatch>;
    isComponentMountedRef: React.RefObject<boolean>;
    loginDispatch: React.Dispatch<LoginDispatch>;
    navigate: NavigateFunction;
  },
): Promise<undefined> {
  try {
    const parsedInputResult = parseSyncSafe({
      object: input,
      zSchema: handleMessageEventLoginForageWorkerToMainInputZod,
    });

    if (parsedInputResult.err) {
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: parsedInputResult,
      });
      return;
    }

    const parsedInputMaybe = parsedInputResult.safeUnwrap();
    if (parsedInputMaybe.none) {
      const safeErrorResult = createSafeErrorResult(
        new NotFoundError(
          "Unexpected None option in input parsing",
        ),
      );
      input?.loginDispatch?.({
        action: loginAction.setSafeErrorResult,
        payload: safeErrorResult,
      });
      return;
    }

    const {
      event,
      globalDispatch,
      isComponentMountedRef,
      loginDispatch,
      navigate,
    } = parsedInputMaybe.safeUnwrap();

    if (!isComponentMountedRef.current) {
      return;
    }

    const messageEventResult = event.data;
    if (messageEventResult.err) {
      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: messageEventResult,
      });
      return;
    }
    const messageEventMaybe = messageEventResult.safeUnwrap();
    if (messageEventMaybe.none) {
      loginDispatch({
        action: loginAction.setSafeErrorResult,
        payload: createSafeErrorResult(
          new NotFoundError("No data received from the worker"),
        ),
      });
      return;
    }

    const { financialMetricsDocument } = messageEventMaybe.safeUnwrap();

    globalDispatch({
      action: globalAction.setFinancialMetricsDocument,
      payload: financialMetricsDocument,
    });

    loginDispatch({
      action: loginAction.setIsLoading,
      payload: false,
    });
    loginDispatch({
      action: loginAction.setSafeErrorResult,
      payload: null,
    });

    navigate("/dashboard/financials");

    return;
  } catch (error: unknown) {
    input?.loginDispatch?.({
      action: loginAction.setSafeErrorResult,
      payload: createSafeErrorResult(
        new MessageHandlerError(
          error,
          "Unhandled error in login forage worker message handler",
        ),
      ),
    });
    return;
  }
}

export {
  handleLogin,
  handleMessageEventCustomerMetricsWorkerToMain,
  handleMessageEventFinancialMetricsWorkerToMain,
  handleMessageEventLoginForageWorkerToMain,
  handleMessageEventProductMetricsWorkerToMain,
  handleMessageEventRepairMetricsWorkerToMain,
};
