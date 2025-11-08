### instruction

Given a state variable and its type definition, generate vitest test cases
inside `${componentFolder}.test.ts` file using the example provided in 'test
output definition'. If the file already contains test cases, add the provided
state variable to the existing test cases.

### test output definition

example: given a state of { username: string}, generate vitest test cases
similar to the examples below, and export them:

```typescript
import { describe, expect, it } from "vitest";
import { loginReducer } from "./reducers";
import { initialLoginState } from "./state";
import { setUsernameLoginDispatchZod } from "./dispatches";
import { INVALID_STRINGS, VALID_STRINGS } from "../../constants.ts";
import { loginAction } from "./actions";

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
                dispatch as any,
            );
            expect(state.username).toBe(initialUsername);
        });
    });
});
```
