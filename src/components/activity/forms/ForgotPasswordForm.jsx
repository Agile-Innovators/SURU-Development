import { Input } from '../../ui/forms/Input.jsx';
import { TextLink } from '../../ui/navigation/TextLink.jsx';
import { MainButton } from '../../ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../../routes/index.js';

export function ForgotPasswordForm() {
    return (
        <form className="m-auto">
            <h1 className="dark:text-secondary">Password reset</h1>
            <span className="text-grey">
                Don&apos;t worry, enter your email for instructions
            </span>
            <div className="grid gap-4 my-4">
                <Input
                    type="email"
                    label="Email"
                    inputName="email"
                    inputId="email"
                    labelText="Email Address"
                    className="mt-4 dark:text-black"
                />
                <MainButton
                    text="Send Instructions"
                    type="link"
                    to={ROUTE_PATHS.EMAIL_SEND}
                    variant="fill"
                    customClass="w-full"
                />
            </div>
            <span className="text-grey text-sm mr-1">
                Do you remember your password?
            </span>
            <TextLink route={ROUTE_PATHS.LOGIN} text="Sign In" />
        </form>
    );
}
export default ForgotPasswordForm;
