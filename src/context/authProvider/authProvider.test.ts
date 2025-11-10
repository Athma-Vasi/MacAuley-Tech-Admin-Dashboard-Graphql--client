/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import {
    INVALID_BOOLEANS,
    INVALID_STRINGS,
    VALID_BOOLEANS,
    VALID_STRINGS,
} from "../../constants";
import type { UserDocument } from "../../types";
import { authAction } from "./actions";
import {
    authReducer_setAccessToken,
    authReducer_setDecodedToken,
    authReducer_setIsLoggedIn,
    authReducer_setUserDocument,
} from "./reducers";
import { initialAuthState } from "./state";
import type { AuthDispatch } from "./types";

describe("authReducer", () => {
    describe("setAccessToken", () => {
        it("should allow valid string values", () => {
            VALID_STRINGS.forEach((value) => {
                const dispatch: AuthDispatch = {
                    action: authAction.setAccessToken,
                    payload: value,
                };
                const state = authReducer_setAccessToken(
                    initialAuthState,
                    dispatch,
                );
                expect(state.accessToken).toBe(value);
            });
        });
        it("should not allow invalid string values", () => {
            const initialAccessToken = initialAuthState.accessToken;

            INVALID_STRINGS.forEach((value) => {
                const dispatch: AuthDispatch = {
                    action: authAction.setAccessToken,
                    payload: value as any,
                };
                const state = authReducer_setAccessToken(
                    initialAuthState,
                    dispatch,
                );
                expect(state.accessToken).toBe(initialAccessToken);
            });
        });
    });

    describe("setDecodedToken", () => {
        it("should allow valid object values", () => {
            const dispatch: AuthDispatch = {
                action: authAction.setDecodedToken,
                payload: {
                    userId: "123",
                    username: "testuser",
                    roles: ["Admin"],
                    sessionId: "session123",
                    iat: 1234567890,
                    exp: 1234567890,
                },
            };
            const state = authReducer_setDecodedToken(
                initialAuthState,
                dispatch,
            );
            expect(state.decodedToken).toEqual(dispatch.payload);
        });
        it("should not allow invalid object values", () => {
            const initialDecodedToken = initialAuthState.decodedToken;
            const invalidDecodedTokens = [
                { userId: 123, username: "testuser" },
                { roles: ["Admin"] },
                { sessionId: "session123" },
                { iat: 1234567890 },
                { exp: 1234567890 },
                { userId: "123", username: "testuser", roles: ["Admin"] },
                {
                    userId: "123",
                    username: "testuser",
                    sessionId: "session123",
                },
            ];

            invalidDecodedTokens.forEach((value) => {
                const dispatch: AuthDispatch = {
                    action: authAction.setDecodedToken,
                    payload: value as any,
                };
                const state = authReducer_setDecodedToken(
                    initialAuthState,
                    dispatch,
                );
                expect(state.decodedToken).toEqual(initialDecodedToken);
            });
        });
    });

    describe("setIsLoggedIn", () => {
        it("should allow boolean values", () => {
            VALID_BOOLEANS.forEach((value) => {
                const dispatch: AuthDispatch = {
                    action: authAction.setIsLoggedIn,
                    payload: value,
                };
                const state = authReducer_setIsLoggedIn(
                    initialAuthState,
                    dispatch,
                );
                expect(state.isLoggedIn).toBe(value);
            });
        });
        it("should not allow invalid boolean values", () => {
            const initialIsLoggedIn = initialAuthState.isLoggedIn;

            INVALID_BOOLEANS.forEach((value) => {
                const dispatch: AuthDispatch = {
                    action: authAction.setIsLoggedIn,
                    payload: value as any,
                };
                const state = authReducer_setIsLoggedIn(
                    initialAuthState,
                    dispatch,
                );
                expect(state.isLoggedIn).toBe(initialIsLoggedIn);
            });
        });
    });

    describe("setUserDocument", () => {
        it("should allow valid object values", () => {
            const SAMPLE_USER_DOCUMENT = {
                _id: "6801a9426f9c9056d944398e",
                username: "manager",
                email: "manager@example.com",
                addressLine: "6662 Ocean Avenue",
                city: "Vancouver",
                country: "Canada",
                postalCodeCanada: "Q7A 5E3",
                postalCodeUS: "00000",
                province: "British Columbia",
                state: "Not Applicable",
                department: "Information Technology",
                fileUploadId: "1234567890abcdef",
                firstName: "Miles",
                jobPosition: "Web Developer",
                lastName: "Vorkosigan",
                profilePictureUrl:
                    "https://images.pexels.com/photos/4777025/pexels-photo-4777025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                storeLocation: "All Locations",
                orgId: 161,
                parentOrgId: 76,
                roles: [
                    "Manager",
                ],
                createdAt: "2025-04-18T01:22:10.726Z",
                updatedAt: "2025-04-18T01:22:10.726Z",
                __v: 0,
            } as Omit<UserDocument, "password">;

            const dispatch: AuthDispatch = {
                action: authAction.setUserDocument,
                payload: SAMPLE_USER_DOCUMENT,
            };
            const state = authReducer_setUserDocument(
                initialAuthState,
                dispatch,
            );
            expect(state.userDocument).toEqual(dispatch.payload);
        });
        it("should not allow invalid object values", () => {
            const initialUserDocument = initialAuthState.userDocument;
            const invalidUserDocuments = [
                { userId: 123, username: "testuser" },
                { roles: ["Admin"] },
                { sessionId: "session123" },
                { iat: 1234567890 },
                { exp: 1234567890 },
                { userId: "123", username: "testuser", roles: ["Admin"] },
                {
                    userId: "123",
                    username: "testuser",
                    sessionId: "session123",
                },
            ];

            invalidUserDocuments.forEach((value) => {
                const dispatch: AuthDispatch = {
                    action: authAction.setUserDocument,
                    payload: value as any,
                };
                const state = authReducer_setUserDocument(
                    initialAuthState,
                    dispatch,
                );

                expect(state.userDocument).toEqual(initialUserDocument);
            });
        });
    });
});
