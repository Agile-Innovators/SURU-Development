import { PassResetForm } from "../../components/activity/forms/PassResetForm.jsx";

export function PasswordReset() {
    return (
      <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <PassResetForm />
            </div>
      </div>
    );
}

export default PasswordReset;