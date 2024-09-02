import { Input } from "../../ui/Input.jsx";
import { RedirectButton } from "../../ui/RedirectButton.jsx";

export function EmailCodeForm(){
    return (
        <form className="m-auto text-center">
            <h1>Enter Code</h1>
            <span className="text-grey">We&apos;ve sent a code to johndoe@gmail.com</span>

            <Input type="text" name="code" id="code" placeholder="Enter Code"/>
            <RedirectButton text="Verify" href="/reset-password" variant="fill" customClass="w-full mt-3"/>
        </form>
    );
}
export default EmailCodeForm;