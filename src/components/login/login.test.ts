/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import {
    INVALID_BOOLEANS,
    INVALID_STRINGS,
    VALID_BOOLEANS,
    VALID_STRINGS,
} from "../../constants.ts";
import { loginAction } from "./actions";
import {
    loginReducer_setCustomerMetricsWorker,
    loginReducer_setErrorMessage,
    loginReducer_setFinancialMetricsGenerated,
    loginReducer_setFinancialMetricsWorker,
    loginReducer_setIsError,
    loginReducer_setIsLoading,
    loginReducer_setIsSubmitting,
    loginReducer_setProductMetricsGenerated,
    loginReducer_setProductMetricsWorker,
    loginReducer_setRepairMetricsGenerated,
    loginReducer_setRepairMetricsWorker,
    loginReducer_setUsername,
} from "./reducers";
import type { LoginDispatch } from "./schemas.ts";
import { initialLoginState } from "./state";

describe(loginAction.setUsername, () => {
    it("should allow valid string values", () => {
        VALID_STRINGS.forEach((value) => {
            const dispatch = {
                action: loginAction.setUsername,
                payload: value,
            };
            const state = loginReducer_setUsername(
                initialLoginState,
                dispatch,
            );
            expect(state.username).toBe(value);
        });
    });

    it("should not allow invalid string values", () => {
        const initialUsername = initialLoginState.username;

        INVALID_STRINGS.forEach((value) => {
            const dispatch = {
                action: loginAction.setUsername,
                payload: value,
            };
            const state = loginReducer_setUsername(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.username).toBe(initialUsername);
        });
    });
});

describe(loginAction.setIsLoading, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setIsLoading,
                payload: value,
            };
            const state = loginReducer_setIsLoading(
                initialLoginState,
                dispatch,
            );
            expect(state.isLoading).toBe(value);
        });
    });

    it("should not allow invalid boolean values", () => {
        const initialIsLoading = initialLoginState.isLoading;

        INVALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setIsLoading,
                payload: value,
            };
            const state = loginReducer_setIsLoading(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.isLoading).toBe(initialIsLoading);
        });
    });
});

describe(loginAction.setIsSubmitting, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setIsSubmitting,
                payload: value,
            };
            const state = loginReducer_setIsSubmitting(
                initialLoginState,
                dispatch,
            );
            expect(state.isSubmitting).toBe(value);
        });
    });

    it("should not allow invalid boolean values", () => {
        const initialIsSubmitting = initialLoginState.isSubmitting;

        INVALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setIsSubmitting,
                payload: value,
            };
            const state = loginReducer_setIsSubmitting(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.isSubmitting).toBe(initialIsSubmitting);
        });
    });
});

describe(loginAction.setIsError, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setIsError,
                payload: value,
            };
            const state = loginReducer_setIsError(
                initialLoginState,
                dispatch,
            );
            expect(state.isError).toBe(value);
        });
    });

    it("should not allow invalid boolean values", () => {
        const initialIsSuccessful = initialLoginState.isError;

        INVALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setIsError,
                payload: value,
            };
            const state = loginReducer_setIsError(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.isError).toBe(initialIsSuccessful);
        });
    });
});

describe(loginAction.setFinancialMetricsGenerated, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setFinancialMetricsGenerated,
                payload: value,
            };
            const state = loginReducer_setFinancialMetricsGenerated(
                initialLoginState,
                dispatch,
            );
            expect(state.financialMetricsGenerated).toBe(value);
        });
    });

    it("should not allow invalid boolean values", () => {
        const initialFinancialMetricsGenerated =
            initialLoginState.financialMetricsGenerated;

        INVALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setFinancialMetricsGenerated,
                payload: value,
            };
            const state = loginReducer_setFinancialMetricsGenerated(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.financialMetricsGenerated).toBe(
                initialFinancialMetricsGenerated,
            );
        });
    });
});

describe(loginAction.setProductMetricsGenerated, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setProductMetricsGenerated,
                payload: value,
            };
            const state = loginReducer_setProductMetricsGenerated(
                initialLoginState,
                dispatch,
            );
            expect(state.productMetricsGenerated).toBe(value);
        });
    });

    it("should not allow invalid boolean values", () => {
        const initialProductMetricsGenerated =
            initialLoginState.productMetricsGenerated;

        INVALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setProductMetricsGenerated,
                payload: value,
            };
            const state = loginReducer_setProductMetricsGenerated(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.productMetricsGenerated).toBe(
                initialProductMetricsGenerated,
            );
        });
    });
});

describe(loginAction.setRepairMetricsGenerated, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setRepairMetricsGenerated,
                payload: value,
            };
            const state = loginReducer_setRepairMetricsGenerated(
                initialLoginState,
                dispatch,
            );
            expect(state.repairMetricsGenerated).toBe(value);
        });
    });

    it("should not allow invalid boolean values", () => {
        const initialRepairMetricsGenerated =
            initialLoginState.repairMetricsGenerated;

        INVALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginAction.setRepairMetricsGenerated,
                payload: value,
            };
            const state = loginReducer_setRepairMetricsGenerated(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.repairMetricsGenerated).toBe(
                initialRepairMetricsGenerated,
            );
        });
    });
});

describe(loginAction.setFinancialMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginAction.setFinancialMetricsWorker,
            payload: mockWorker,
        };
        const state = loginReducer_setFinancialMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.financialMetricsWorker).toBe(mockWorker);

        mockWorker.terminate();
    });

    it("should allow null values", () => {
        const dispatch = {
            action: loginAction.setFinancialMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setFinancialMetricsWorker(
            initialLoginState,
            dispatch as any,
        );
        expect(state.financialMetricsWorker).toBe(null);
    });
});

describe(loginAction.setProductMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginAction.setProductMetricsWorker,
            payload: mockWorker,
        };
        const state = loginReducer_setProductMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.productMetricsWorker).toBe(mockWorker);

        mockWorker.terminate();
    });

    it("should allow null values", () => {
        const dispatch = {
            action: loginAction.setProductMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setProductMetricsWorker(
            initialLoginState,
            dispatch as any,
        );
        expect(state.productMetricsWorker).toBe(null);
    });
});

describe(loginAction.setRepairMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginAction.setRepairMetricsWorker,
            payload: mockWorker,
        };
        const state = loginReducer_setRepairMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.repairMetricsWorker).toBe(mockWorker);

        mockWorker.terminate();
    });

    it("should allow null values", () => {
        const dispatch = {
            action: loginAction.setRepairMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setRepairMetricsWorker(
            initialLoginState,
            dispatch as any,
        );
        expect(state.repairMetricsWorker).toBe(null);
    });
});

describe(loginAction.setErrorMessage, () => {
    it("should allow valid string values", () => {
        VALID_STRINGS.forEach((value) => {
            const dispatch = {
                action: loginAction.setErrorMessage,
                payload: value,
            };
            const state = loginReducer_setErrorMessage(
                initialLoginState,
                dispatch,
            );
            expect(state.errorMessage).toBe(value);
        });
    });

    it("should not allow invalid string values", () => {
        const initialErrorMessage = initialLoginState.errorMessage;

        INVALID_STRINGS.forEach((value) => {
            const dispatch = {
                action: loginAction.setErrorMessage,
                payload: value,
            };
            const state = loginReducer_setErrorMessage(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.errorMessage).toBe(initialErrorMessage);
        });
    });
});

describe(loginAction.setCustomerMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginAction.setCustomerMetricsWorker,
            payload: mockWorker,
        };
        const state = loginReducer_setCustomerMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.customerMetricsWorker).toBe(mockWorker);

        mockWorker.terminate();
    });

    it("should allow null values", () => {
        const dispatch = {
            action: loginAction.setCustomerMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setCustomerMetricsWorker(
            initialLoginState,
            dispatch as any,
        );
        expect(state.customerMetricsWorker).toBe(null);
    });
});
