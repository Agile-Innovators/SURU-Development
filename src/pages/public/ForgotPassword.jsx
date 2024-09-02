import { ForgotPasswordForm } from "../../components/activity/forms/ForgotPasswordForm.jsx";

export function ForgotPassword() {
    return (
      <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <ForgotPasswordForm />
            </div>
      </div>
    );
}

export default ForgotPassword;