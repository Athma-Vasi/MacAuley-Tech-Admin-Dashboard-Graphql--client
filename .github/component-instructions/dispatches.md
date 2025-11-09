### instruction

Given a state variable and its type definition, generate dispatch functions
inside dispatches.ts file using the example provided in 'dispatch output
definition'. If the file already contains dispatch functions, add the provided
state variable to the existing dispatch functions.

### dispatch output definition

example: given a state of { username: string, isLoading: boolean,
repairMetricsWorker: Worker | null}, generate dispatch functions and export the
dispatch type:

```typescript
import { z } from "zod";
import { loginAction } from "./actions";

const setUsernameLoginDispatchZod = z.object({
    action: z.literal(loginAction.setUsername),
    payload: z.string(),
});

const setIsLoadingLoginDispatchZod = z.object({
    action: z.literal(loginAction.setIsLoading),
    payload: z.boolean(),
});

const setRepairMetricsWorkerLoginDispatchZod = z.object({
    action: z.literal(loginAction.setRepairMetricsWorker),
    payload: z.instanceof(Worker),
});

type LoginDispatch =
    | z.infer<typeof setUsernameLoginDispatchZod>
    | z.infer<typeof setIsLoadingLoginDispatchZod>
    | z.infer<typeof setRepairMetricsWorkerLoginDispatchZod>;

export { setUsernameLoginDispatchZod };
export type { LoginDispatch };
```
