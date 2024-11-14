import { LoginForm } from '../../components/activity/forms/LoginForm.jsx';
import { forceLightMode } from '../../components/hooks/utils.js';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

export function Login() {
    const location = useLocation();
    const successMessage = location.state?.message || '';

  

    return (
        <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
            <LoginForm successMessage={successMessage} />
            </div>
        </div>
    );
}

export default Login;
