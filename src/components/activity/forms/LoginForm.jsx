import { Input } from "../../ui/Input.jsx";
import { CheckBox } from "../../ui/CheckBox.jsx";
import { TextLink } from "../../ui/TextLink.jsx";
import { MainButton } from "../../ui/MainButton.jsx";
import { ROUTE_PATHS } from "../../../routes/index.js";

export function LoginForm(){
    return (
        <form className="m-auto">
            <h1>Welcome Back</h1>
            <span className="text-grey">Sign in by entering the information below</span>

            <div className="grid gap-4 my-4">
                <Input type="text" label="Username" inputName="username" inputId="username" labelText="Username" />
                <Input type="password" label="Password" inputName="password" inputId="password" labelText="Password" />
                <div className="flex items-center justify-between">
                    <CheckBox id="remember" name="remember" label="Remember me"/>
                    <TextLink route="/forgot-password" text="Forgot password?"/>
                </div>
            </div>
            <MainButton text="Sign In" type="button" variant="fill" customClass="w-full mb-2"/>
            <span className="text-grey text-sm mr-1">Don&apos;t you have an account?</span>
            <TextLink route={ROUTE_PATHS.REGISTER} text="Register"/>
        </form>
    );
}
export default LoginForm;