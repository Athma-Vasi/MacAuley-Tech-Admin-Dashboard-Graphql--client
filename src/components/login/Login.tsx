/* eslint-disable @typescript-eslint/no-unused-vars */
// export default function Login() {
//     const [isMutationInFlight, setIsMutationInFlight] = useState(false);
//     const [accessToken, setAccessToken] = useState<string | null>(null);

//     const handleLogin = () => {
//         setIsMutationInFlight(true);
//         // Use standalone commitMutation with cacheConfig containing metadata
//         commitMutation(relayEnvironment, {
//             mutation: LoginUserMutation,
//             variables: {
//                 username: "manager",
//                 password: "passwordQ1!",
//             },
//             // CacheConfig with metadata for endpoint routing
//             cacheConfig: {
//                 metadata: {
//                     endpoint: "auth",
//                 },
//             },
//             onCompleted: (response, errors) => {
//                 setIsMutationInFlight(false);
//                 const typedResponse = response as LoginUserMutation$data;
//                 setAccessToken(typedResponse.loginUser.accessToken);
//                 console.log("Login response:", response);
//                 if (errors) {
//                     console.error("Login errors:", errors);
//                 }
//             },
//             onError: (error) => {
//                 setIsMutationInFlight(false);
//                 console.error("Login error:", error);
//             },
//         });
//     };

//     return (
//         <div>
//             <h2>Login with Metadata</h2>
//             <button onClick={handleLogin} disabled={isMutationInFlight}>
//                 {isMutationInFlight ? "Logging in..." : "Login"}
//             </button>
//             {accessToken && (
//                 <div>
//                     <h3>Access Token:</h3>
//                     <pre>{accessToken}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

import {
    Box,
    Card,
    Center,
    Flex,
    Group,
    Loader,
    PasswordInput,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { TbCheck, TbUpload } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { COLORS_SWATCHES } from "../../constants";
import { useMountedRef } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { useGlobalState } from "../../hooks/useGlobalState";
import { returnThemeColors } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import type { MessageEventCustomerMetricsWorkerToMain } from "../dashboard/customer/metricsWorker";
import CustomerMetricsWorker from "../dashboard/customer/metricsWorker?worker";
import type { MessageEventFinancialMetricsWorkerToMain } from "../dashboard/financial/metricsWorker";
import FinancialMetricsWorker from "../dashboard/financial/metricsWorker?worker";
import type { MessageEventProductMetricsWorkerToMain } from "../dashboard/product/metricsWorker";
import ProductMetricsWorker from "../dashboard/product/metricsWorker?worker";
import type { MessageEventRepairMetricsWorkerToMain } from "../dashboard/repair/metricsWorker";
import RepairMetricsWorker from "../dashboard/repair/metricsWorker?worker";
import { loginAction } from "./actions";
import type { MessageEventLoginForageWorkerToMain } from "./forageWorker";
import LoginForageWorker from "./forageWorker?worker";
import {
    handleLogin,
    handleMessageEventCustomerMetricsWorkerToMain,
    handleMessageEventFinancialMetricsWorkerToMain,
    handleMessageEventLoginForageWorkerToMain,
    handleMessageEventProductMetricsWorkerToMain,
    handleMessageEventRepairMetricsWorkerToMain,
} from "./handlers";
import { loginReducer } from "./reducers";
import { initialLoginState } from "./state";

function Login() {
    const [loginState, loginDispatch] = useReducer(
        loginReducer,
        initialLoginState,
    );
    const {
        customerMetricsWorker,
        errorMessage,
        financialMetricsGenerated,
        financialMetricsWorker,
        isLoading,
        isSubmitting,
        isError,
        password,
        productMetricsGenerated,
        productMetricsWorker,
        repairMetricsGenerated,
        repairMetricsWorker,
        username,
        loginFetchWorker,
        safeErrorResult,
    } = loginState;

    const { authDispatch } = useAuth();
    const {
        globalState: { themeObject },
        globalDispatch,
    } = useGlobalState();
    const navigate = useNavigate();
    const isComponentMountedRef = useMountedRef();

    const usernameRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    useEffect(() => {
        const newCustomerMetricsWorker = new CustomerMetricsWorker();
        loginDispatch({
            action: loginAction.setCustomerMetricsWorker,
            payload: newCustomerMetricsWorker,
        });
        newCustomerMetricsWorker.onmessage = async (
            event: MessageEventCustomerMetricsWorkerToMain,
        ) => {
            await handleMessageEventCustomerMetricsWorkerToMain({
                event,
                isComponentMountedRef,
                loginDispatch,
            });
        };

        const newProductMetricsWorker = new ProductMetricsWorker();
        loginDispatch({
            action: loginAction.setProductMetricsWorker,
            payload: newProductMetricsWorker,
        });
        newProductMetricsWorker.onmessage = async (
            event: MessageEventProductMetricsWorkerToMain,
        ) => {
            await handleMessageEventProductMetricsWorkerToMain({
                event,
                isComponentMountedRef,
                loginDispatch,
            });
        };

        const newRepairMetricsWorker = new RepairMetricsWorker();
        loginDispatch({
            action: loginAction.setRepairMetricsWorker,
            payload: newRepairMetricsWorker,
        });
        newRepairMetricsWorker.onmessage = async (
            event: MessageEventRepairMetricsWorkerToMain,
        ) => {
            await handleMessageEventRepairMetricsWorkerToMain({
                event,
                isComponentMountedRef,
                loginDispatch,
            });
        };

        const newFinancialMetricsWorker = new FinancialMetricsWorker();
        loginDispatch({
            action: loginAction.setFinancialMetricsWorker,
            payload: newFinancialMetricsWorker,
        });
        newFinancialMetricsWorker.onmessage = async (
            event: MessageEventFinancialMetricsWorkerToMain,
        ) => {
            await handleMessageEventFinancialMetricsWorkerToMain({
                event,
                isComponentMountedRef,
                loginDispatch,
            });
        };

        const newLoginForageWorker = new LoginForageWorker();
        loginDispatch({
            action: loginAction.setLoginFetchWorker,
            payload: newLoginForageWorker,
        });
        newLoginForageWorker.onmessage = async (
            event: MessageEventLoginForageWorkerToMain,
        ) => {
            await handleMessageEventLoginForageWorkerToMain({
                event,
                globalDispatch,
                isComponentMountedRef,
                loginDispatch,
                navigate,
            });
        };

        return () => {
            isComponentMountedRef.current = false;
            newCustomerMetricsWorker.terminate();
            newFinancialMetricsWorker.terminate();
            newProductMetricsWorker.terminate();
            newRepairMetricsWorker.terminate();
            newLoginForageWorker.terminate();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!customerMetricsWorker) {
            return;
        }

        customerMetricsWorker.postMessage(true);
    }, [customerMetricsWorker]);

    useEffect(() => {
        if (!productMetricsWorker) {
            return;
        }

        productMetricsWorker.postMessage(true);
    }, [productMetricsWorker]);

    useEffect(() => {
        if (!repairMetricsWorker) {
            return;
        }

        repairMetricsWorker.postMessage(true);
    }, [repairMetricsWorker]);

    useEffect(() => {
        if (
            !financialMetricsWorker || !productMetricsGenerated ||
            !repairMetricsGenerated
        ) {
            return;
        }

        financialMetricsWorker.postMessage(true);
    }, [
        financialMetricsWorker,
        productMetricsGenerated,
        repairMetricsGenerated,
    ]);

    if (safeErrorResult != null) {
        throw safeErrorResult;
    }

    const usernameTextInput = (
        <TextInput
            className="accessible-input"
            data-testid="username-textInput"
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => {
                loginDispatch({
                    action: loginAction.setUsername,
                    payload: event.currentTarget.value,
                });
            }}
            onKeyDown={async (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    if (isLoading || !financialMetricsGenerated) {
                        return;
                    }

                    handleLogin({
                        authDispatch,
                        isComponentMountedRef,
                        loginDispatch,
                        navigate,
                        password,
                        username,
                    });
                }
            }}
            ref={usernameRef}
            required
            withAsterisk={false}
        />
    );

    const passwordTextInput = (
        <PasswordInput
            className="accessible-input"
            data-testid="password-textInput"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
                loginDispatch({
                    action: loginAction.setPassword,
                    payload: event.currentTarget.value,
                });
            }}
            onKeyDown={async (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    if (isLoading || !financialMetricsGenerated) {
                        return;
                    }

                    handleLogin({
                        authDispatch,
                        isComponentMountedRef,
                        loginDispatch,
                        navigate,
                        password,
                        username,
                    });
                }
            }}
            required
            withAsterisk={false}
        />
    );

    const { redColorShade, bgGradient, themeColorShade } = returnThemeColors({
        colorsSwatches: COLORS_SWATCHES,
        themeObject,
    });

    const loginButton = (
        <AccessibleButton
            attributes={{
                dataTestId: "login-button",
                kind: "submit",
                leftIcon: isLoading || !financialMetricsGenerated
                    ? (
                        <Loader
                            size="xs"
                            color={themeObject.colorScheme === "light"
                                ? "white"
                                : ""}
                        />
                    )
                    : !isError
                    ? (
                        <TbCheck
                            color={themeObject.colorScheme === "light"
                                ? "white"
                                : ""}
                        />
                    )
                    : <TbUpload size={18} />,
                name: "login",
                onClick: async (
                    event:
                        | React.MouseEvent<HTMLButtonElement, MouseEvent>
                        | React.PointerEvent<HTMLButtonElement>,
                ) => {
                    event.preventDefault();

                    handleLogin({
                        authDispatch,
                        isComponentMountedRef,
                        loginDispatch,
                        navigate,
                        password,
                        username,
                    });
                },
            }}
        />
    );

    const displayTitle = (
        <Group w="100%" position="apart">
            <Group align="flex-start">
                {/* {logo} */}
                <Title order={1} style={{ letterSpacing: "0.30rem" }}>
                    MACAULEY
                </Title>

                <Title pl="md" order={1} style={{ letterSpacing: "0.30rem" }}>
                    TECH
                </Title>
            </Group>

            <Text size="lg" color="dark">Dashboard</Text>
        </Group>
    );

    const displayInputs = (
        <Stack align="center" w="100%">
            {usernameTextInput}
            {passwordTextInput}
        </Stack>
    );

    const displayLoginButton = (
        <Center>
            {loginButton}
        </Center>
    );

    const displayLinkToRegister = (
        <Flex align="center" justify="center" columnGap="sm">
            <Text>Don&apos;t have an account?</Text>
            <Text>
                <Link
                    to="/register"
                    style={{ color: themeColorShade }}
                    data-testid="register-link"
                >
                    Create one!
                </Link>
            </Text>
        </Flex>
    );

    const errorMessageElem = errorMessage
        ? (
            <Text
                color={redColorShade}
                data-testid="login-error-message"
                truncate
                w="100%"
                pl="md"
            >
                Invalid credentials
            </Text>
        )
        : null;

    const card = (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className="login-card"
        >
            <Title order={2}>Sign in</Title>
            <Text size="sm" color="dimmed">
                to continue to MacAuley Tech Dashboard
            </Text>

            {displayInputs}
            {errorMessageElem}

            <Group w="100%" position="center">{displayLoginButton}</Group>
            <Group w="100%" position="center">{displayLinkToRegister}</Group>
        </Card>
    );

    const login = (
        <Box
            bg={bgGradient}
            className="login-container"
        >
            {displayTitle}

            {Array.from(
                { length: 3 },
                (_, idx) => <Space h="xl" key={`space-${idx}`} />,
            )}
            {card}
        </Box>
    );

    return login;
}

export default Login;
