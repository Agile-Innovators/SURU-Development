import { ResetPasswordForm } from "../../components/activity/forms/ResetPasswordForm.jsx";

export function ResetPassword() {
    return (
      <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <ResetPasswordForm />
            </div>
      </div>
    );
}

export default ResetPassword;