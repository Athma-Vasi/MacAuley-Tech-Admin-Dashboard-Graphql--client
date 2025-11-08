### instruction

Given a state variable and its type definition, generate reducer function inside
reducers.ts file using the example provided in 'reducer output definition'. If
the file already contains a reducer function, add the provided state variable to
the existing reducer function. Ensure the specific reducer function matches the
structure shown in the example.

### reducer output definition

example: given a state of { username: string}, generate a reducer function, a
reducers map, and a specific reducer function and export them:

```typescript
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

export { loginReducer, loginReducer_setUsername, loginReducersMap };
```
