### instruction

Given a state variable and its type definition, generate state type and an
initial state object inside state.ts file using the example provided in 'state
output definition'.

### state output definition

example: given a state of { username: string}, generate a state type and an
initial state object and export them:

```typescript
type LoginState = {
    username: string;
};

const initialLoginState: LoginState = {
    username: "",
};

export { initialLoginState };
export type { LoginState };
```
