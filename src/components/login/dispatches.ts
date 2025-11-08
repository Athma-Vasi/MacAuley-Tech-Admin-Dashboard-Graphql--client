import { z } from "zod";
import { loginActions } from "./actions.ts";

const setUsernameLoginDispatchZod = z.object({
    action: z.literal(loginActions.setUsername),
    payload: z.string(),
});

const setPasswordLoginDispatchZod = z.object({
    action: z.literal(loginActions.setPassword),
    payload: z.string(),
});

type LoginDispatch =
    | z.infer<typeof setUsernameLoginDispatchZod>
    | z.infer<typeof setPasswordLoginDispatchZod>;

export { setPasswordLoginDispatchZod, setUsernameLoginDispatchZod };
export type { LoginDispatch };
