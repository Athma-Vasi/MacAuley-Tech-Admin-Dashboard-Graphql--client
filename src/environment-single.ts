import type { CacheConfig, RequestParameters, Variables } from "relay-runtime";
import { Environment, Network } from "relay-runtime";

const GRAPHQL_ENDPOINT = "http://localhost:5000/graphql";
const AUTH_ENDPOINT = "http://localhost:5000/auth";
const REGISTER_ENDPOINT = "http://localhost:5000/register";

// TODO: improve async safety
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchGraphQL(
    request: RequestParameters,
    variables: Variables,
    cacheConfig?: CacheConfig,
) {
    // Check if this is an auth request via metadata
    const isAuthRequest = cacheConfig?.metadata?.endpoint === "auth";
    const isRegisterRequest = cacheConfig?.metadata?.endpoint === "register";
    const endpoint = isAuthRequest
        ? AUTH_ENDPOINT
        : isRegisterRequest
        ? REGISTER_ENDPOINT
        : GRAPHQL_ENDPOINT;

    console.log(`Making request to: ${endpoint}`, {
        request: request.name,
        variables,
        metadata: cacheConfig?.metadata,
    });

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: request.text,
            variables,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `Network error: ${response.status} - ${response.statusText}`,
        );
    }
    return await response.json();
}

const relayEnvironment = new Environment({
    network: Network.create(fetchGraphQL),
});

export { relayEnvironment };
