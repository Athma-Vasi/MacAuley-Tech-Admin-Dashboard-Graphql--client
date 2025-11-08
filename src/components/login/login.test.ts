import { describe, expect, it } from "vitest";
import { INVALID_STRINGS, VALID_STRINGS } from "../../constants.ts";
import { loginActions } from "./actions";
import type { LoginDispatch } from "./dispatches.ts";
import { loginReducer_setUsername } from "./reducers";
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
