import { Input } from '../../ui/forms/Input.jsx';
import { TextLink } from '../../ui/navigation/TextLink.jsx';
import { MainButton } from '../../ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { useAxios } from '../../hooks/useAxios.js';
import { useState } from 'react';

export function ForgotPasswordForm() {
    const axios = useAxios();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/password/email', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                    'An error occurred while sending the instructions'
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-auto">
            <h1>Password reset</h1>
            <span className="text-grey">
                Don&apos;t worry, enter your email for instructions
            </span>
            <div className="grid gap-4 my-4">
                <Input
                    type="email"
                    label="Email"
                    inputName="email"
                    inputId="email"
                    labelText="Email Address"
                   
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <MainButton
                    text="Send Instructions"
                    type="submit"
                    variant="fill"
                    customClass="w-full"
                />
            </div>
            {message && <p>{message}</p>}
            <span className="text-grey text-sm mr-1">
                Do you remember your password?
            </span>
            <TextLink route={ROUTE_PATHS.LOGIN} text="Sign In" />
        </form>
    );
}
