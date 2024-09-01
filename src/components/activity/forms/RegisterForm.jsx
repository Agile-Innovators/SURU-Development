import { Input } from "../../ui/Input.jsx";
import { CheckBox } from "../../ui/CheckBox.jsx";
import { TextLink } from "../../ui/TextLink.jsx";
import { RedirectButton } from "../../ui/RedirectButton.jsx";

export function RegisterForm(){
    return (
        <section className="m-auto">
            <h1>Let&apos;s get started</h1>
            <span className="text-grey">Let&apos;s get started</span>

            <div className="grid gap-4 my-4">
                <Input type="text" label="Username" inputName="username" inputId="username" labelText="Username" spanText="Example: johndoe" />
                <Input type="email" label="Email" inputName="email" inputId="email" labelText="Email Address" spanText="Example: john@gmail.com" />
                <Input type="password" label="Password" inputName="password" inputId="password" labelText="Password" spanText="Password must be at least 8 characters" />
                
                <div className="flex align-center mt-2">
                    <CheckBox inputName="terms" inputId="terms"/>
                    <p className="text-grey text-sm">I agree to the <TextLink route="/terms" text="Terms of Service" /> and <TextLink route="/privacy" text="Privacy Policy"/></p>
                </div>
            </div>
            <RedirectButton text="Sign In" href="/login" variant="fill" customClass="w-full mb-2"/>
            <span className="text-grey text-sm mr-1">Do you have an account?</span>
            <TextLink route="/login" text="Sign In"/>
        </section>
    );
}
export default RegisterForm;