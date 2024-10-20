import { LoginForm } from '../../components/activity/forms/LoginForm.jsx';
import { forceLightMode } from '../../components/hooks/utils.js';
import { ThemeContext } from '../../global/ThemeContext.jsx';
import { useEffect, useContext } from 'react';


export function Login() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        forceLightMode(theme);
    }, [theme]);

    return (
        <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
