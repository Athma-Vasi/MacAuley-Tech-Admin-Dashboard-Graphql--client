### instruction

Act as a code generator with experience in TypeScript, React, and GraphQL. Based
on the recent edits made to the files in the project, generate the complete
updated code for each file. Ensure that the code is syntactically correct and
follows best practices. Provide only the updated code for each file without any
additional explanations or comments. Given a type definition of the state of a
component, generate the corresponding action type and action constant object
based on the output definition.

### output definition

example: given a state of { username: string, password: string}, generate an
action type :

```typescript
type LoginAction = {
    [K in keyof LoginState as `set${Capitalize<string & K>}`]: `set${Capitalize<
        string & K
    >}`;
};

const loginAction: LoginAction = {
    setUsername: "setUsername",
    setPassword: "setPassword",
};
```
