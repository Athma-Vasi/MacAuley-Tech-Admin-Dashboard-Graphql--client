import type { ResponsePayloadSafe, UserDocument } from "../../types";
import { makeTransition } from "../../utils";
import { type UsersQueryAction } from "./actions";
import { type UsersQueryDispatch } from "./schemas";

function updateUsersQueryState(
    responsePayloadSafe: ResponsePayloadSafe<UserDocument>,
    usersQueryAction: UsersQueryAction,
    usersQueryDispatch: React.Dispatch<UsersQueryDispatch>,
): void {
    makeTransition(() => {
        usersQueryDispatch({
            action: usersQueryAction.setResourceData,
            payload: responsePayloadSafe.data,
        });
    });
    usersQueryDispatch({
        action: usersQueryAction.setTotalDocuments,
        payload: responsePayloadSafe.totalDocuments.none
            ? 0
            : responsePayloadSafe.totalDocuments.val,
    });
    usersQueryDispatch({
        action: usersQueryAction.setPages,
        payload: responsePayloadSafe.pages.none
            ? 0
            : responsePayloadSafe.pages.val,
    });
    usersQueryDispatch({
        action: usersQueryAction.setNewQueryFlag,
        payload: true,
    });
    usersQueryDispatch({
        action: usersQueryAction.setIsLoading,
        payload: false,
    });
}

export { updateUsersQueryState };
