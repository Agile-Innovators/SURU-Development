import { Input } from "../../ui/Input.jsx";
import { CheckBox } from "../../ui/CheckBox.jsx";
import { TextLink } from "../../ui/TextLink.jsx";
import { RedirectButton } from "../../ui/RedirectButton.jsx";

export function LoginForm(){
    return (
        <section className="m-auto">
            <h1>Welcome Back</h1>
            <span className="text-grey">Sign in by entering the information below</span>

            <div className="grid gap-4 my-4">
                <Input type="text" label="Username" inputName="username" inputId="username" labelText="Username" spanText="Example: johndoe" />
                <Input type="password" label="Password" inputName="password" inputId="password" labelText="Password" spanText="Password must be at least 8 characters" />
                <div className="flex items-center justify-between">
                    <CheckBox id="remember" name="remember" label="Remember me"/>
                    <TextLink route="/password-reset" text="Forgot password?"/>
                </div>
            </div>
            <RedirectButton text="Sign In" href="/login" variant="fill" customClass="w-full mb-2"/>
            <span className="text-grey text-sm mr-1">Don&apos;t you have an account?</span>
            <TextLink route="/register" text="Register"/>
        </section>
    );
}
export default LoginForm;