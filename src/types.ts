import type { Option, Result } from "ts-results";

type SafeError = {
    columnNumber: Option<number>;
    fileName: Option<string>;
    lineNumber: Option<number>;
    message: string;
    name: string;
    original: Option<string>;
    stack: Option<string>;
    status: Option<number>;
    timestamp: number;
};

type SafeSuccess<Data = unknown> = Option<Data>;

type SafeResult<Data = unknown> = Result<
    SafeSuccess<Data>,
    SafeError
>;

export type { SafeError, SafeResult };
