import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../../components/hooks/useAxios.js';
import { useAuth } from '../../../global/AuthProvider.jsx';
import { Input } from '../../ui/forms/Input.jsx';
import { CheckBox } from '../../ui/forms/CheckBox.jsx';
import { TextLink } from '../../ui/navigation/TextLink.jsx';
import { MainButton } from '../../ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../../routes/index.js';
import PropTypes from 'prop-types';

export function LoginForm({successMessage}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message] = useState(successMessage);
    const [loading, setLoading] = useState(false);
    const axios = useAxios();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const data = {
            email: email,
            password,
        };

        try {
            const response = await axios.post('/login', data);
            const { token, user } = response.data;
            login(token, user);
            console.log('Login successful:', token);
            navigate(ROUTE_PATHS.HOME);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-auto">
            <h1 >Welcome Back</h1>
            <span className="text-grey dark:text-light-grey">
                Sign in by entering the information below
            </span>
            {error && (
                <div className="error bg-red-100 text-red-500 p-1 text-center rounded-sm mt-2 dark:bg-red-800/70 dark:text-red-100">
                    {error}
                </div>
            )}
            {message && (
                <div className="bg-green-100 text-green-500 p-1 text-center rounded-sm mt-2 dark:bg-green-800/70 dark:text-green-100">
                    {message}
                </div>
            )}
            <div className="grid gap-4 my-4">
                <Input
                    type="email"
                    label="Email"
                    inputName="email"
                    inputId="email"
                    labelText="Email"
                    value={email}
                    
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    label="Password"
                    inputName="password"
                    inputId="password"
                    labelText="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <CheckBox
                        id="remember"
                        name="remember"
                        label="Remember me"
                    />
                    <TextLink
                        route="/forgot-password"
                        text="Forgot password?"
                    />
                </div>
            </div>
            <MainButton
                text="Sign In"
                type="submit"
                variant="fill"
                customClass="w-full mb-2"
            />
            <span className="text-grey dark:text-light-grey text-sm mr-1 dark:text-white">
                Don&apos;t you have an account?
            </span>
            <TextLink route={ROUTE_PATHS.REGISTER} text="Register"  />
            {loading && <p className="text-secondary dark:text-light-blue">Loading...</p>}
        </form>
    );
}

export default LoginForm;

LoginForm.propTypes = {
    successMessage: PropTypes.string,
};