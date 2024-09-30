import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "../../ui/forms/Input.jsx";
import { CheckBox } from "../../ui/forms/CheckBox.jsx";
import { TextLink } from "../../ui/navigation/TextLink.jsx";
import { MainButton } from "../../ui/buttons/MainButton.jsx";
import { ROUTE_PATHS } from "../../../routes/index.js";
import { useAuth } from '../../../global/AuthProvider.jsx';
import { useAxios } from '../../../components/hooks/useAxios.js';

export function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_type_id, setUserTypeId] = useState(2); // Establecer un valor predeterminado
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { saveAuthToken } = useAuth();
    const axios = useAxios();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!terms) {
            setError('You must agree to the Terms of Service and Privacy Policy.');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            setLoading(false);
            return;
        }

        const data = {
            username,
            email,
            password,
            user_type_id 
        };

        try {
            const response = await axios.post('/register', data);
            const { jwt } = response.data;
            saveAuthToken(jwt);
            console.log('Login successful:', jwt);
            navigate('/prueba-registro');
        } catch (err) {
            setError(err.response.data.error.message);
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-auto">
            <h1>Let&apos;s get started</h1>
            <span className="text-grey">Complete the form below to create your new account</span>

            {error && <div className="error text-red-500 mt-2">{error}</div>}

            <div className="grid gap-4 my-4">
                {/* <Input
                    type="hidden"
                    name="user_type_id"
                    id="user_type_id"
                    value={2}
                    onChange={(e) => setUserTypeId(e.target.value)}
                /> */}
                <Input
                    type="text"
                    label="Username"
                    inputName="username"
                    inputId="username"
                    labelText="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    spanText="Example: johndoe"
                />
                <Input
                    type="email"
                    label="Email"
                    inputName="email"
                    inputId="email"
                    labelText="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    spanText="Example: john@gmail.com"
                />
                <Input
                    type="password"
                    label="Password"
                    inputName="password"
                    inputId="password"
                    labelText="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    spanText="Password must be at least 8 characters"
                />

                <div className="flex align-center mt-2">
                    <CheckBox
                        inputName="terms"
                        inputId="terms"
                        checked={terms}
                        onChange={() => setTerms(!terms)}
                    />
                    <p className="text-grey text-sm">I agree to the <TextLink route="/terms" text="Terms of Service" /> and <TextLink route="/privacy" text="Privacy Policy" /></p>
                </div>
            </div>
            <MainButton text="Sign Up" type="submit" variant="fill" customClass="w-full mb-2" />
            <span className="text-grey text-sm mr-1">Do you have an account?</span>
            <TextLink route={ROUTE_PATHS.LOGIN} text="Sign In" />
            {loading && <p className='text-secondary'>Loading...</p>}
        </form>
    );
}

export default RegisterForm;