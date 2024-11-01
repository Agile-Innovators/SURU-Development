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
            //console.log('Login successful:', token);
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
            <h1 className="dark:text-secondary">Welcome Back</h1>
            <span className="text-grey">
                Sign in by entering the information below
            </span>
            {error && (
                <div className="error text-red-500 p-1 text-center rounded-sm bg-red-100 mt-2">
                    {error}
                </div>
            )}
            {message && (
                <div className="text-green-500 p-1 text-center rounded-sm bg-green-100 mt-2">
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
                    customClass='dark:text-black'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    label="Password"
                    inputName="password"
                    inputId="password"
                    labelText="Password"
                    value={password}
                    customClass='dark:text-black'
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
            <span className="text-grey text-sm mr-1">
                Don&apos;t you have an account?
            </span>
            <TextLink route={ROUTE_PATHS.REGISTER} text="Register" />
            {error && <p className="error-message">{error}</p>}
            {loading && <p className="text-secondary">Loading...</p>}
        </form>
    );
}

export default LoginForm;

LoginForm.propTypes = {
    successMessage: PropTypes.string,
};