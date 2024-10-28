import { LoginForm } from '../../components/activity/forms/LoginForm.jsx';
import { forceLightMode } from '../../components/hooks/utils.js';
import { ThemeContext } from '../../global/ThemeContext.jsx';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

export function Login() {
    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const successMessage = location.state?.message || '';

    useEffect(() => {
        forceLightMode(theme);
    }, [theme]);

    return (
        <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
            <LoginForm successMessage={successMessage} />
            </div>
        </div>
    );
}

export default Login;
