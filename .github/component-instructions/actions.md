### instruction

Given a state variable and its type definition, generate action types and action
constants object inside actions.ts file using the example provided in 'action
output definition'. If the file already contains a type and constant, add the
provided state variable to the existing type and constant object.

### action output definition

example: given a state of { username: string, isLoading: boolean,
repairMetricsWorker: Worker | null}, generate an action type, action field
inside object and export them:

```typescript
type LoginActions = {
    [K in keyof LoginState as `set${Capitalize<string & K>}`]: `set${Capitalize<
        string & K
    >}`;
};

const loginActions: LoginActions = {
    setUsername: "setUsername",
    setIsLoading: "setIsLoading",
    setRepairMetricsWorker: "setRepairMetricsWorker",
};

export { loginActions };
export type { LoginActions };
```
