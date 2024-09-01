import { RedirectButton } from '../../components/ui/RedirectButton.jsx';

export function EmailSent() {
    return (
      <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <section className="m-auto text-center">
                    <h1>Email sent</h1>
                    <span className="text-grey">We have sent you an email with instructions <br/> to reset your password</span>
                    <RedirectButton text="Open Gmail" href="https://gmail.com/" variant="fill" customClass="w-full mt-4 mb-3"/>
                    <span className="text-grey text-sm mr-1">Didn&apos;t receive the email? <span className="text-secondary font-normal text-sm hover:text-light-blue duration-100 cursor-pointer">Click here to resent</span></span>
                </section>
            </div>
      </div>
    );
}

export default EmailSent;