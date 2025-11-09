import { describe, expect, it } from "vitest";
import {
    INVALID_BOOLEANS,
    INVALID_STRINGS,
    VALID_BOOLEANS,
    VALID_STRINGS,
} from "../../constants.ts";
import { loginActions } from "./actions";
import type { LoginDispatch } from "./dispatches.ts";
import {
    loginReducer_setCustomerMetricsWorker,
    loginReducer_setErrorMessage,
    loginReducer_setFinancialMetricsGenerated,
    loginReducer_setFinancialMetricsWorker,
    loginReducer_setIsLoading,
    loginReducer_setIsSubmitting,
    loginReducer_setIsSuccessful,
    loginReducer_setProductMetricsGenerated,
    loginReducer_setProductMetricsWorker,
    loginReducer_setRepairMetricsGenerated,
    loginReducer_setRepairMetricsWorker,
    loginReducer_setUsername,
} from "./reducers";
import { initialLoginState } from "./state";

describe(loginActions.setUsername, () => {
    it("should allow valid string values", () => {
        VALID_STRINGS.forEach((value) => {
            const dispatch = {
                action: loginActions.setUsername,
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
                action: loginActions.setUsername,
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

describe(loginActions.setIsLoading, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginActions.setIsLoading,
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
                action: loginActions.setIsLoading,
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

describe(loginActions.setIsSubmitting, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginActions.setIsSubmitting,
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
                action: loginActions.setIsSubmitting,
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

describe(loginActions.setIsSuccessful, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginActions.setIsSuccessful,
                payload: value,
            };
            const state = loginReducer_setIsSuccessful(
                initialLoginState,
                dispatch,
            );
            expect(state.isSuccessful).toBe(value);
        });
    });

    it("should not allow invalid boolean values", () => {
        const initialIsSuccessful = initialLoginState.isSuccessful;

        INVALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginActions.setIsSuccessful,
                payload: value,
            };
            const state = loginReducer_setIsSuccessful(
                initialLoginState,
                dispatch as LoginDispatch,
            );
            expect(state.isSuccessful).toBe(initialIsSuccessful);
        });
    });
});

describe(loginActions.setFinancialMetricsGenerated, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginActions.setFinancialMetricsGenerated,
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
                action: loginActions.setFinancialMetricsGenerated,
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

describe(loginActions.setProductMetricsGenerated, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginActions.setProductMetricsGenerated,
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
                action: loginActions.setProductMetricsGenerated,
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

describe(loginActions.setRepairMetricsGenerated, () => {
    it("should allow valid boolean values", () => {
        VALID_BOOLEANS.forEach((value) => {
            const dispatch = {
                action: loginActions.setRepairMetricsGenerated,
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
                action: loginActions.setRepairMetricsGenerated,
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

describe(loginActions.setFinancialMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginActions.setFinancialMetricsWorker,
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
            action: loginActions.setFinancialMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setFinancialMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.financialMetricsWorker).toBe(null);
    });
});

describe(loginActions.setProductMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginActions.setProductMetricsWorker,
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
            action: loginActions.setProductMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setProductMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.productMetricsWorker).toBe(null);
    });
});

describe(loginActions.setRepairMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginActions.setRepairMetricsWorker,
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
            action: loginActions.setRepairMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setRepairMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.repairMetricsWorker).toBe(null);
    });
});

describe(loginActions.setErrorMessage, () => {
    it("should allow valid string values", () => {
        VALID_STRINGS.forEach((value) => {
            const dispatch = {
                action: loginActions.setErrorMessage,
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
                action: loginActions.setErrorMessage,
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

describe(loginActions.setCustomerMetricsWorker, () => {
    it("should allow valid Worker values", () => {
        const mockWorker = new Worker(
            URL.createObjectURL(
                new Blob(["console.log('test')"], {
                    type: "application/javascript",
                }),
            ),
        );

        const dispatch = {
            action: loginActions.setCustomerMetricsWorker,
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
            action: loginActions.setCustomerMetricsWorker,
            payload: null,
        };
        const state = loginReducer_setCustomerMetricsWorker(
            initialLoginState,
            dispatch,
        );
        expect(state.customerMetricsWorker).toBe(null);
    });
});
