/* eslint-disable @typescript-eslint/no-unused-vars */
import { parseDispatchAndSetState, parseSyncSafe } from "../../utils";
import { type QueryAction, queryAction } from "./actions";
import {
    modifyQueryChainsDispatchZod,
    type QueryDispatch,
    resetToInitialDispatchZod,
    setFilterComparisonOperatorDispatchZod,
    setFilterFieldDispatchZod,
    setFilterLogicalOperatorDispatchZod,
    setFilterValueDispatchZod,
    setGeneralSearchCaseDispatchZod,
    setGeneralSearchExclusionValueDispatchZod,
    setGeneralSearchInclusionValueDispatchZod,
    setIsErrorDispatchZod,
    setIsSearchDisabledDispatchZod,
    setLimitPerPageDispatchZod,
    setProjectionFieldsDispatchZod,
    setQueryKindDispatchZod,
    setSortDirectionDispatchZod,
    setSortFieldDispatchZod,
} from "./schemas";
import type {
    LogicalOperator,
    ModifyQueryChainPayload,
    QueryChain,
    QueryChainKind,
    QueryState,
} from "./types";

function queryReducer(state: QueryState, dispatch: QueryDispatch): QueryState {
    const reducer = queryReducers.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const queryReducers = new Map<
    QueryAction[keyof QueryAction],
    (state: QueryState, dispatch: QueryDispatch) => QueryState
>([
    [queryAction.resetToInitial, queryReducer_resetToInitial],
    [queryAction.setProjectionFields, queryReducer_setProjectionFields],
    [queryAction.modifyQueryChains, queryReducer_modifyQueryChains],
    [queryAction.setFilterField, queryReducer_setFilterField],
    [
        queryAction.setFilterComparisonOperator,
        queryReducer_setFilterComparisonOperator,
    ],
    [
        queryAction.setFilterLogicalOperator,
        queryReducer_setFilterLogicalOperator,
    ],
    [queryAction.setFilterValue, queryReducer_setFilterValue],
    [
        queryAction.setGeneralSearchExclusionValue,
        queryReducer_setGeneralSearchExclusionValue,
    ],
    [
        queryAction.setGeneralSearchInclusionValue,
        queryReducer_setGeneralSearchInclusionValue,
    ],
    [queryAction.setGeneralSearchCase, queryReducer_setGeneralSearchCase],
    [queryAction.setIsError, queryReducer_setIsError],
    [queryAction.setIsSearchDisabled, queryReducer_setIsSearchDisabled],
    [queryAction.setLimitPerPage, queryReducer_setLimitPerPage],
    [queryAction.setSortDirection, queryReducer_setSortDirection],
    [queryAction.setSortField, queryReducer_setSortField],
    [queryAction.setQueryKind, queryReducer_setQueryKind],
]);

function queryReducer_resetToInitial(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    const parsedResult = parseSyncSafe({
        object: dispatch,
        zSchema: resetToInitialDispatchZod,
    });

    if (parsedResult.err || parsedResult.val.none) {
        return state;
    }

    return parsedResult.val.val.payload as QueryState;
}

function queryReducer_setProjectionFields(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "projectionFields",
        state,
        zSchema: setProjectionFieldsDispatchZod,
    });
}

function queryReducer_modifyQueryChains(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    const parsedResult = parseSyncSafe({
        object: dispatch,
        zSchema: modifyQueryChainsDispatchZod,
    });

    if (parsedResult.err || parsedResult.val.none) {
        return state;
    }

    const {
        index,
        logicalOperator,
        queryChainActions,
        queryLink,
        queryChainKind,
    } = parsedResult.val.val.payload as ModifyQueryChainPayload;
    const [field, comparisonOperator, value] = queryLink;
    const queryChains = structuredClone(state.queryChains);

    switch (queryChainActions) {
        case "delete": {
            const existingQueryLinks =
                queryChains[queryChainKind][logicalOperator];
            const newQueryLinks = existingQueryLinks.filter(
                (_queryLink, i) => i !== index,
            );

            queryChains[queryChainKind][logicalOperator] = newQueryLinks;

            return {
                ...state,
                queryChains,
            };
        }

        case "insert": {
            if (value.length === 0) {
                return state;
            }

            const operations = Object
                .entries(
                    queryChains,
                ).reduce<
                {
                    filter: Record<
                        LogicalOperator,
                        "block" | "update" | "insert"
                    >;
                    sort: Record<
                        LogicalOperator,
                        "block" | "update" | "insert"
                    >;
                }
            >((acc, curr) => {
                const [qChainKind, qChains] = curr as [
                    QueryChainKind,
                    Record<LogicalOperator, QueryChain>,
                ];

                if (qChainKind !== queryChainKind) {
                    return acc;
                }

                Object.entries(qChains).forEach((chain) => {
                    const [logOper, qchain] = chain as [
                        LogicalOperator,
                        QueryChain,
                    ];

                    if (qchain.length === 0) {
                        acc[qChainKind][logOper] = "insert";
                        return acc;
                    }

                    qchain.forEach((queryLink) => {
                        const [qLField, _qLOperator, _qLValue] = queryLink;

                        const areFieldsSame = field === qLField;

                        if (areFieldsSame) {
                            if (logOper === "and") {
                                acc[qChainKind][logOper] = "update";
                            } else {
                                acc[qChainKind][logOper] = "insert";
                            }
                        } else {
                            acc[qChainKind][logOper] = "insert";
                        }
                    });
                });

                return acc;
            }, {
                filter: {
                    and: "block",
                    nor: "block",
                    or: "block",
                },
                sort: {
                    and: "block",
                    nor: "block",
                    or: "block",
                },
            });

            Object.entries(operations).forEach((curr) => {
                const [qChainKind, logicalOpers] = curr as [
                    QueryChainKind,
                    Record<LogicalOperator, "block" | "update" | "insert">,
                ];
                Object.entries(logicalOpers).forEach((chain) => {
                    const [logicalOper, operation] = chain as [
                        LogicalOperator,
                        "block" | "update" | "insert",
                    ];

                    if (
                        qChainKind !== queryChainKind ||
                        logicalOper !== logicalOperator ||
                        operation === "block"
                    ) {
                        return;
                    }

                    if (operation === "update") {
                        const existingQueryChain =
                            queryChains[queryChainKind][logicalOper];

                        const existingQueryLink = existingQueryChain.find(
                            (queryLink) => queryLink[0] === field,
                        );
                        if (existingQueryLink === undefined) {
                            return;
                        }

                        existingQueryLink[1] = comparisonOperator;
                        existingQueryLink[2] = value;
                    } else { // insert
                        const existingQueryLinks =
                            queryChains[queryChainKind][logicalOperator];

                        existingQueryLinks.push([
                            field,
                            comparisonOperator,
                            value,
                        ]);
                    }
                });
            });

            return {
                ...state,
                queryChains,
            };
        }

        default:
            return state;
    }
}

function queryReducer_setFilterField(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "filterField",
        state,
        zSchema: setFilterFieldDispatchZod,
    });
}

function queryReducer_setFilterComparisonOperator(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "filterComparisonOperator",
        state,
        zSchema: setFilterComparisonOperatorDispatchZod,
    });
}

function queryReducer_setFilterLogicalOperator(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "filterLogicalOperator",
        state,
        zSchema: setFilterLogicalOperatorDispatchZod,
    });
}

function queryReducer_setFilterValue(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "filterValue",
        state,
        zSchema: setFilterValueDispatchZod,
    });
}

function queryReducer_setGeneralSearchCase(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "generalSearchCase",
        state,
        zSchema: setGeneralSearchCaseDispatchZod,
    });
}

function queryReducer_setGeneralSearchExclusionValue(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "generalSearchExclusionValue",
        state,
        zSchema: setGeneralSearchExclusionValueDispatchZod,
    });
}

function queryReducer_setGeneralSearchInclusionValue(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "generalSearchInclusionValue",
        state,
        zSchema: setGeneralSearchInclusionValueDispatchZod,
    });
}

function queryReducer_setIsError(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "isError",
        state,
        zSchema: setIsErrorDispatchZod,
    });
}

function queryReducer_setIsSearchDisabled(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "isSearchDisabled",
        state,
        zSchema: setIsSearchDisabledDispatchZod,
    });
}

function queryReducer_setLimitPerPage(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "limitPerPage",
        state,
        zSchema: setLimitPerPageDispatchZod,
    });
}

function queryReducer_setSortDirection(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "sortDirection",
        state,
        zSchema: setSortDirectionDispatchZod,
    });
}

function queryReducer_setSortField(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "sortField",
        state,
        zSchema: setSortFieldDispatchZod,
    });
}

function queryReducer_setQueryKind(
    state: QueryState,
    dispatch: QueryDispatch,
): QueryState {
    return parseDispatchAndSetState({
        dispatch,
        key: "queryKind",
        state,
        zSchema: setQueryKindDispatchZod,
    });
}

export {
    queryReducer,
    queryReducer_modifyQueryChains,
    queryReducer_resetToInitial,
    queryReducer_setFilterComparisonOperator,
    queryReducer_setFilterField,
    queryReducer_setFilterLogicalOperator,
    queryReducer_setFilterValue,
    queryReducer_setGeneralSearchCase,
    queryReducer_setGeneralSearchExclusionValue,
    queryReducer_setGeneralSearchInclusionValue,
    queryReducer_setIsError,
    queryReducer_setIsSearchDisabled,
    queryReducer_setLimitPerPage,
    queryReducer_setProjectionFields,
    queryReducer_setQueryKind,
    queryReducer_setSortDirection,
    queryReducer_setSortField,
};
