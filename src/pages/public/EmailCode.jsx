import { useEffect } from 'react';
import { forceLightMode } from '../../components/hooks/utils.js';
import { EmailCodeForm } from '../../components/activity/forms/EmailCodeForm.jsx';

export function EmailCode() {
    useEffect(() => {
        forceLightMode(); // Activa el modo claro al montar el componente
    }, []);

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
