import { RegisterForm } from '../../components/activity/forms/RegisterForm.jsx';
import { forceLightMode } from '../../components/hooks/utils.js';
import { ThemeContext } from '../../global/ThemeContext.jsx';
import { useEffect, useContext } from 'react';

export function Register() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        forceLightMode(theme);
    }, [theme]);
    
    return (
        <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
