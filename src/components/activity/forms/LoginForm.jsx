import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../../components/hooks/useAxios.js';
import { useAuth } from '../../../global/AuthProvider.jsx';
import { Input } from "../../ui/Input.jsx";
import { CheckBox } from "../../ui/CheckBox.jsx";
import { TextLink } from "../../ui/TextLink.jsx";
import { MainButton } from "../../ui/MainButton.jsx";
import { ROUTE_PATHS } from "../../../routes/index.js";

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const axios = useAxios();
    const { saveAuthToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const data = {
            identifier: username,
            password
        };

        try {
            const response = await axios.post('/auth/local/', data); 
            const { jwt } = response.data;  
            saveAuthToken(jwt);
            console.log('Login successful:', jwt);
            navigate('/suru/prueba');
        } catch (err) {
            setError(err.response.data.error.message);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-auto">
            <h1>Welcome Back</h1>
            <span className="text-grey">Sign in by entering the information below</span>

            {error && <div className="error text-red-500 mt-2">{error}</div>}

            <div className="grid gap-4 my-4">
                <Input 
                    type="text" 
                    label="Username" 
                    inputName="username" 
                    inputId="username" 
                    labelText="Username"
                    value={username}  
                    onChange={(e) => setUsername(e.target.value)} 
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
                    <CheckBox id="remember" name="remember" label="Remember me"/>
                    <TextLink route="/forgot-password" text="Forgot password?"/>
                </div>
            </div>
            <MainButton text="Sign In" type="submit" variant="fill" customClass="w-full mb-2"/> 
            <span className="text-grey text-sm mr-1">Don&apos;t you have an account?</span>
            <TextLink route={ROUTE_PATHS.REGISTER} text="Register"/>
            {loading && <p className='text-secondary'>Loading...</p>} 
        </form>
    );
}

export default LoginForm;
