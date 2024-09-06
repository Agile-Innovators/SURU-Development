import { RedirectButton } from '../../components/ui/RedirectButton.jsx';
import { Check } from 'lucide-react';

export function ConfirmPassword() {
    return (
      <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <section className="m-auto text-center">
                <div className="m-auto p-3 bg-translucid-blue rounded-full inline-block"><Check size={42} className="text-secondary" /></div>
                    <h1>All done!</h1>
                    <span className="text-grey">Your password has been succesfully reset</span>
                    <RedirectButton text="Go Back to Login" href="/login" variant="fill" customClass="w-full mt-4"/>
                </section>
            </div>
      </div>
    );
}

export default ConfirmPassword;