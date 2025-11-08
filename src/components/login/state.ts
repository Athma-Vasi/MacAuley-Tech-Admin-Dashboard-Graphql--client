type LoginState = {
    username: string;
    password: string;
};

const initialLoginState: LoginState = {
    username: "",
    password: "",
};

export { initialLoginState };
export type { LoginState };
