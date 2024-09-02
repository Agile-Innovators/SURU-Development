import { Input } from "../../ui/Input.jsx";
import { RedirectButton } from "../../ui/RedirectButton.jsx";

export function ResetPasswordForm(){
    return (
        <form className="m-auto text-center">
            <h1>New Password</h1>
            <span className="text-grey">Must be at least 8 characters</span>

            <div className="grid gap-3 my-4 text-start">
                <Input type="password" name="password" id="password" labelText="New Password"/>
                <Input type="password" name="confirm-password" id="confirm-password" labelText="Confirm Password"/>
            </div>
            
            <RedirectButton text="Reset Password" href="/confirm-password" variant="fill" customClass="w-full mt-3"/>
        </form>
    );
}
export default ResetPasswordForm;