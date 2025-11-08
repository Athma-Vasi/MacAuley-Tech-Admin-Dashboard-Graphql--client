### instruction

Given a state variable and its type definition, generate dispatch functions
inside dispatches.ts file using the example provided in 'dispatch output
definition'. If the file already contains dispatch functions, add the provided
state variable to the existing dispatch functions.

### dispatch output definition

example: given a state of { username: string}, generate dispatch functions and
export the dispatch type:

```typescript
const setUsernameLoginDispatchZod = z.object({
    action: z.literal(loginAction.setUsername),
    payload: z.string(),
});

type LoginDispatch = z.infer<typeof setUsernameLoginDispatchZod>;

export { setUsernameLoginDispatchZod };
export type { LoginDispatch };
```
