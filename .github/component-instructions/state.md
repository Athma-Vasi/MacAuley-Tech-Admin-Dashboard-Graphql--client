### instruction

Given a state variable and its type definition, generate state type and an
initial state object inside state.ts file using the example provided in 'state
output definition'.

### state output definition

example: given a state of { username: string, isLoading: boolean,
repairMetricsWorker: Worker | null}, generate a state type and an initial state
object and export them:

```typescript
type LoginState = {
    username: string;
    isLoading: boolean;
    repairMetricsWorker: Worker | null;
};

const initialLoginState: LoginState = {
    username: "",
    isLoading: false,
    repairMetricsWorker: null,
};

export { initialLoginState };
export type { LoginState };
```
