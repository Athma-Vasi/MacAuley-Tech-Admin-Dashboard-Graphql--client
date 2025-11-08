import { Environment, Network } from "relay-runtime";

const HTTP_ENDPOINT = "http://localhost:5000/graphql";

// TODO: improve async safety
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchGraphQL(request: any, variables: any) {
    const response = await fetch(HTTP_ENDPOINT, {
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
