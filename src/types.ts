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

type ServerSuccessResponseGraphQL<Data = unknown> = {
    accessToken: string;
    dataBox: Array<Data>;
    message: string;
    statusCode: number;
    timestamp: Date;
    totalDocuments?: number;
    totalPages?: number;
    // requestId?: string;
    // extensions?: Record<string, unknown>;
    // path?: string[];
};

type ServerErrorResponseGraphQL = {
    accessToken: string;
    dataBox: [];
    message: string;
    statusCode: number;
    timestamp: Date;
    totalDocuments?: number;
    totalPages?: number;
    // requestId?: string;
    // errors?: GraphQLFormattedError[];
    // extensions?: Record<string, unknown>;
    // path?: string[];
};

type ServerResponseGraphQL<Data = unknown> =
    | ServerSuccessResponseGraphQL<Data>
    | ServerErrorResponseGraphQL;

export type {
    SafeError,
    SafeResult,
    SafeSuccess,
    ServerErrorResponseGraphQL,
    ServerResponseGraphQL,
    ServerSuccessResponseGraphQL,
};
