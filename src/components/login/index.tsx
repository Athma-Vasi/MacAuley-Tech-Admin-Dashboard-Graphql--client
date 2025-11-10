import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import LoginWithMetadata from "./Login";

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

    return ErrorSuspenseHOC(LoginWithMetadata)({});
}

export default LoginWrapper;
