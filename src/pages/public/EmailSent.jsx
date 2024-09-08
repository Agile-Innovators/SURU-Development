import { MainButton } from '../../components/ui/MainButton.jsx';
import { Mail } from 'lucide-react';

export function EmailSent() {
    return (
      <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <section className="m-auto text-center max-w-sm">
                    <div className="m-auto p-3 bg-translucid-blue rounded-full inline-block"><Mail size={42} className="text-secondary" /></div>
                    <h1>Email sent</h1>
                    <span className="text-grey">We&apos;ve sent a code to <span className='underline text-grey'>johndoe@gmail.com</span> with instructions to reset your password</span>
                    <MainButton text="Open Gmail" type='external' to="https://gmail.com/" variant="fill" customClass="w-full mt-4 mb-3"/>
                    <span className="text-grey text-sm mr-1">Didn&apos;t receive the email? <span className="text-secondary font-normal text-sm hover:text-light-blue duration-100 cursor-pointer">Click here to resent</span></span>
                </section>
            </div>
      </div>
    );
}

export default EmailSent;