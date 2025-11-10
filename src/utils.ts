import type { Option } from "ts-results";
import { Err, None, Ok, Some } from "ts-results";
import z, {
    ZodArray,
    ZodBoolean,
    ZodCustom,
    ZodEnum,
    ZodLiteral,
    ZodNullable,
    ZodNumber,
    ZodObject,
    ZodString,
} from "zod";
import type { $strip } from "zod/v4/core";
import {
    AbortError,
    type AppErrorBase,
    CacheError,
    HTTPError,
    InvariantError,
    JSONError,
    NetworkError,
    ParseError,
    PromiseRejectionError,
    TimeoutError,
    TokenDecodeError,
    UnknownError,
} from "./components/error/classes";
import type { SafeError, SafeResult } from "./types";

function createSafeSuccessResult<Data = unknown>(
    data: Data,
): Ok<Option<NonNullable<Data>>> {
    return new Ok(data === null || data === undefined ? None : Some(data));
}

function createSafeErrorResult(
    error: AppErrorBase | unknown,
    trace?: {
        fileName?: string;
        lineNumber?: number;
        columnNumber?: number;
    },
): Err<SafeError> {
    const additional = {
        fileName: trace?.fileName ? Some(trace.fileName) : None,
        lineNumber: trace?.lineNumber ? Some(trace.lineNumber) : None,
        columnNumber: trace?.columnNumber ? Some(trace.columnNumber) : None,
        timestamp: Date.now(),
    };

    if (error instanceof Error) {
        return new Err({
            message: error.message == null ? "Unknown error" : error.message,
            name: error.name == null ? "Error" : error.name,
            original: None,
            stack: error.stack == null ? None : Some(error.stack),
            status: None,
            ...additional,
        });
    }

    if (typeof error === "string") {
        return new Err({
            message: error,
            name: "Error",
            original: None,
            stack: None,
            status: None,
            ...additional,
        });
    }

    function serializeSafe(data: unknown): Option<string> {
        try {
            const serializedData = JSON.stringify(data, null, 2);
            return Some(serializedData);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error: unknown) {
            return Some("Unserializable data");
        }
    }

    if (error instanceof Event) {
        if (error instanceof PromiseRejectionEvent) {
            return new Err({
                message: error.reason.toString() ?? "",
                name: `PromiseRejectionEvent: ${error.type}`,
                original: serializeSafe(error),
                stack: None,
                status: None,
                ...additional,
            });
        }

        return new Err({
            message: error.timeStamp.toString() ?? "",
            name: `EventError: ${error.type}`,
            original: serializeSafe(error),
            stack: None,
            status: None,
            ...additional,
        });
    }

    if (
        // TODO: refactor with purpose
        error instanceof AbortError ||
        error instanceof CacheError ||
        error instanceof InvariantError ||
        error instanceof JSONError ||
        error instanceof NetworkError ||
        error instanceof ParseError ||
        error instanceof TimeoutError ||
        error instanceof TokenDecodeError ||
        error instanceof PromiseRejectionError ||
        error instanceof HTTPError ||
        error instanceof UnknownError
    ) {
        return new Err({
            message: error.message,
            name: error._tag,
            original: serializeSafe(error),
            stack: error.stack ? Some(error.stack) : None,
            status: None,
            ...additional,
        });
    }

    return new Err({
        message: "You've seen it before.🪞 Déjà vu. Something's off...",
        name: "👾 SimulationDysfunction",
        original: serializeSafe(error),
        stack: None,
        status: None,
        ...additional,
    });
}

function parseSyncSafe<Output = unknown>(
    { object, zSchema }: {
        object: Output;
        zSchema: z.ZodSchema;
    },
): SafeResult<Output> {
    try {
        const { data, error, success } = Array.isArray(object)
            ? z.array(zSchema).safeParse(object)
            : zSchema.safeParse(object);

        return success
            ? createSafeSuccessResult(data as Output)
            : createSafeErrorResult(
                new ParseError(
                    `Failed to parse object: ${error.message}`,
                ),
            );
    } catch (error_: unknown) {
        return createSafeErrorResult(error_);
    }
}

function parseDispatchAndSetState<
    Payload extends
        | ZodString
        | ZodBoolean
        | ZodNumber
        | ZodArray
        | ZodEnum
        | ZodNullable<ZodCustom<Worker, Worker>>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        | ZodObject = any,
    Dispatch extends { action: string; payload: unknown } = {
        action: string;
        payload: unknown;
    },
    State extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
>(
    { dispatch, key, state, zSchema }: {
        dispatch: Dispatch;
        zSchema: ZodObject<
            {
                action: ZodLiteral<string>;
                payload: Payload;
            },
            $strip
        >;
        state: State;
        key: keyof State;
    },
): State {
    const parsedDispatchResult = parseSyncSafe(
        {
            object: dispatch,
            zSchema,
        },
    );
    if (parsedDispatchResult.err) {
        return state;
    }
    const parsedDispatchMaybe = parsedDispatchResult.safeUnwrap();
    if (parsedDispatchMaybe.none) {
        return state;
    }
    const parsedDispatch = parsedDispatchMaybe.safeUnwrap();

    return {
        ...state,
        [key]: parsedDispatch.payload as State[typeof key],
    };
}

export {
    createSafeErrorResult,
    createSafeSuccessResult,
    parseDispatchAndSetState,
    parseSyncSafe,
};
