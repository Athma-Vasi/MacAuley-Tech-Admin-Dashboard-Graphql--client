import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import Login from "./Login";

function LoginWrapper() {
    // const loginButtonHoverRef = useRef<HTMLDivElement | null>(null);
    // const [loginUserMutationRef, loadLoginUserMutation] = useQueryLoader<
    //     LoginUserMutationType
    // >(LoginUserMutation);

    // function onBeginHover() {
    //     loadLoginUserMutation({
    //         username: "manager",
    //         password: "password123Q!",
    //     });
    // }

    return ErrorSuspenseHOC(Login)({});
}

export default LoginWrapper;
