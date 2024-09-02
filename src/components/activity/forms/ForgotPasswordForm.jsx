import { Input } from "../../ui/Input.jsx";
import { TextLink } from "../../ui/TextLink.jsx";
import { RedirectButton } from "../../ui/RedirectButton.jsx";

export function ForgotPasswordForm(){
    return (
        <form className="m-auto">
            <h1>Password reset</h1>
            <span className="text-grey">Don&apos;t worry, enter your email for instructions</span>

            <div className="grid gap-4 my-4">
                <Input type="email" label="Email" inputName="email" inputId="email" labelText="Email Address" spanText="Example: john@gmail.com" className="mt-4" />
                <RedirectButton text="Send Instructions" href="/email-sent" variant="fill" customClass="w-full"/>
            </div>

            <span className="text-grey text-sm mr-1">Do you remember your password?</span>
            <TextLink route="/login" text="Sign In"/>
        </form>
    );
}
export default ForgotPasswordForm;