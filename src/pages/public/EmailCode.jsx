import { EmailCodeForm } from '../../components/activity/forms/EmailCodeForm.jsx';

export function EmailCode() {
    return (
        <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <section className="m-auto">
                    <EmailCodeForm />
                </section>
            </div>
        </div>
    );
}

export default EmailCode;
