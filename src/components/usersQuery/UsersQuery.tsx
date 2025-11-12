/* eslint-disable @typescript-eslint/no-unused-vars */
import { Accordion, Box, Group, Pagination, Space } from "@mantine/core";
import { useReducer } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { COLORS_SWATCHES } from "../../constants";
import { useMountedRef } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { useGlobalState } from "../../hooks/useGlobalState";
import { useWindowSize } from "../../hooks/useWindowSize";
import { returnThemeColors } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { Query } from "../query/Query";
import { usersQueryAction } from "./actions";
import { USER_QUERY_TEMPLATES } from "./constants";
import DisplayResource from "./DisplayResource";
import { usersQueryReducer } from "./reducers";
import { initialUsersQueryState } from "./state";

function UsersQuery() {
    const { windowWidth } = useWindowSize();
    const { authState: { accessToken, decodedToken }, authDispatch } =
        useAuth();
    const { showBoundary } = useErrorBoundary();
    const [
        usersQueryState,
        usersQueryDispatch,
    ] = useReducer(usersQueryReducer, initialUsersQueryState);

    const navigate = useNavigate();

    const { globalState: { themeObject } } = useGlobalState();

    const { bgGradient } = returnThemeColors({
        colorsSwatches: COLORS_SWATCHES,
        themeObject,
    });

    const isComponentMountedRef = useMountedRef();

    const {
        arrangeByDirection,
        arrangeByField,
        currentPage,
        newQueryFlag,
        usersFetchWorker,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isError,
        isLoading,
        queryString,
        pages,
        prefetchAndCacheWorker,
        resourceData,
        totalDocuments,
    } = usersQueryState;

    const submitButton = (
        <AccessibleButton
            attributes={{
                dataTestId: "usersQuery-submit-button",
                disabledScreenreaderText: "Please fix errors before submitting",
                // disabled: isLoading,
                enabledScreenreaderText: "Submit query",
                kind: "submit",
                onClick: async (event) => {
                    event.preventDefault();
                    if (isLoading || !decodedToken) {
                        return;
                    }
                },
                onMouseEnter: async () => {
                    if (isLoading || !decodedToken) {
                        return;
                    }
                },
            }}
        />
    );

    const buttons = (
        <Group
            w="100%"
            position="center"
            px="md"
        >
            {submitButton}
        </Group>
    );

    const queryComponent = (
        <Query
            collectionName="users"
            parentAction={usersQueryAction}
            parentDispatch={usersQueryDispatch}
            queryTemplates={USER_QUERY_TEMPLATES}
        />
    );

    const queryAccordion = (
        <Accordion w="100%" defaultValue={"Users Query"}>
            <Accordion.Item value="Users Query">
                <Accordion.Control>Users Query</Accordion.Control>
                <Accordion.Panel>
                    {queryComponent}
                    {buttons}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );

    const displayResource = (
        <DisplayResource
            arrangeByDirection={arrangeByDirection}
            arrangeByField={arrangeByField}
            isLoading={isLoading}
            parentAction={usersQueryAction}
            parentDispatch={usersQueryDispatch}
            resourceData={resourceData}
            resourceName="User"
            totalDocuments={totalDocuments}
        />
    );

    const pagination = (
        <Group w="100%" position="left" px="md">
            <Pagination
                value={currentPage}
                onChange={async (page) => {
                    if (isLoading || !decodedToken) {
                        return;
                    }
                }}
                onMouseEnter={async () => {
                    if (isLoading || !decodedToken) {
                        return;
                    }
                }}
                total={pages}
                w="100%"
            />
        </Group>
    );

    return (
        <Box
            className="users-query-container"
            bg={bgGradient}
        >
            {windowWidth < 1024 ? queryAccordion : (
                <>
                    {queryComponent}
                    {buttons}
                </>
            )}
            <Space h="md" />
            {pagination}
            <Space h="md" />
            {displayResource}
            <Space h="md" />
            {pagination}
        </Box>
    );
}

export default UsersQuery;
