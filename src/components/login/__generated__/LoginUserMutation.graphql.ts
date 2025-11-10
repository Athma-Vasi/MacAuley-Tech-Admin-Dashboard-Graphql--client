/**
 * @generated SignedSource<<0457d95eb5a566f41a70062ecd568104>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LoginUserMutation$variables = {
  password: string;
  username: string;
};
export type LoginUserMutation$data = {
  readonly loginUser: {
    readonly accessToken: string;
    readonly dataBox: ReadonlyArray<{
      readonly _id: string;
      readonly addressLine: string;
      readonly city: string;
      readonly country: string;
      readonly createdAt: string;
      readonly department: string;
      readonly email: string;
      readonly expireAt: string | null | undefined;
      readonly firstName: string;
      readonly jobPosition: string;
      readonly lastName: string;
      readonly orgId: number;
      readonly parentOrgId: number;
      readonly postalCodeCanada: string;
      readonly postalCodeUS: string;
      readonly profilePictureUrl: string | null | undefined;
      readonly province: string;
      readonly roles: ReadonlyArray<string>;
      readonly state: string;
      readonly storeLocation: string;
      readonly updatedAt: string;
      readonly username: string;
    } | null | undefined>;
    readonly message: string;
    readonly statusCode: number;
    readonly timestamp: string;
  };
};
export type LoginUserMutation = {
  response: LoginUserMutation$data;
  variables: LoginUserMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "UserServerResponse",
    "kind": "LinkedField",
    "name": "loginUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accessToken",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "statusCode",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "timestamp",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "dataBox",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "_id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "addressLine",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "city",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "country",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "department",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "expireAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "jobPosition",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "orgId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "parentOrgId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "postalCodeCanada",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "postalCodeUS",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "profilePictureUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "province",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "roles",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "storeLocation",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginUserMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "LoginUserMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e6c3574037970fd3692b7c8d436d01ae",
    "id": null,
    "metadata": {},
    "name": "LoginUserMutation",
    "operationKind": "mutation",
    "text": "mutation LoginUserMutation(\n  $username: String!\n  $password: String!\n) {\n  loginUser(username: $username, password: $password) {\n    accessToken\n    message\n    statusCode\n    timestamp\n    dataBox {\n      _id\n      addressLine\n      city\n      country\n      department\n      email\n      expireAt\n      firstName\n      jobPosition\n      lastName\n      orgId\n      parentOrgId\n      postalCodeCanada\n      postalCodeUS\n      profilePictureUrl\n      province\n      roles\n      state\n      storeLocation\n      username\n      createdAt\n      updatedAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "af0a41ee6bdf16193779987bd217b794";

export default node;
