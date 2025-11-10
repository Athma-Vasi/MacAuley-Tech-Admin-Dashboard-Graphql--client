import { useState } from "react";
import { commitMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { relayEnvironment } from "../../environment";
import type { LoginUserMutation$data } from "./__generated__/LoginUserMutation.graphql";

export const LoginUserMutation = graphql`
    mutation LoginUserMutation($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            accessToken
            message
            statusCode
            timestamp
            dataBox {
                _id
                addressLine
                city
                country
                department
                email
                expireAt
                firstName
                jobPosition
                lastName
                orgId
                parentOrgId
                postalCodeCanada
                postalCodeUS
                profilePictureUrl
                province
                roles
                state
                storeLocation
                username
                createdAt
                updatedAt
            }
        }
    }
`;

export default function Login() {
    const [isMutationInFlight, setIsMutationInFlight] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const handleLogin = () => {
        setIsMutationInFlight(true);
        // Use standalone commitMutation with cacheConfig containing metadata
        commitMutation(relayEnvironment, {
            mutation: LoginUserMutation,
            variables: {
                username: "manager",
                password: "passwordQ1!",
            },
            // CacheConfig with metadata for endpoint routing
            cacheConfig: {
                metadata: {
                    endpoint: "auth",
                },
            },
            onCompleted: (response, errors) => {
                setIsMutationInFlight(false);
                const typedResponse = response as LoginUserMutation$data;
                setAccessToken(typedResponse.loginUser.accessToken);
                console.log("Login response:", response);
                if (errors) {
                    console.error("Login errors:", errors);
                }
            },
            onError: (error) => {
                setIsMutationInFlight(false);
                console.error("Login error:", error);
            },
        });
    };

    return (
        <div>
            <h2>Login with Metadata</h2>
            <button onClick={handleLogin} disabled={isMutationInFlight}>
                {isMutationInFlight ? "Logging in..." : "Login"}
            </button>
            {accessToken && (
                <div>
                    <h3>Access Token:</h3>
                    <pre>{accessToken}</pre>
                </div>
            )}
        </div>
    );
}
