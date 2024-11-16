import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MainButton } from '../../components/ui/buttons/MainButton.jsx';
import { Input } from '../../components/ui/forms/Input.jsx';
import { useAxios } from '../../components/hooks/useAxios.js';
import { ROUTE_PATHS } from '../../routes/index.js';

export function ResetPassword() {
    const axios = useAxios();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const email = params.get('email');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !token) {
            setError("Token o correo faltante.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await axios.post('/password/reset', {
                email,
                token,
                password,
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                navigate(ROUTE_PATHS.LOGIN, {
                    state: { message: 'Password reset successfully!' },
                });
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || 'Error al restablecer la contraseña'
            );
        }
    };

    return (
        <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <form onSubmit={handleSubmit} className="m-auto text-center">
                    <h1>New Password</h1>
                    <span className="text-grey">Must be at least 8 characters</span>

                    <div className="grid gap-3 my-4 text-start">
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            labelText="New Password"
                            required
                        />

                        <Input
                            type="password"
                            name="confirm-password"
                            id="confirm-confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            labelText="Confirm Password"
                            required
                        />
                    </div>

                    <MainButton
                        text="Reset Password"
                        type="submit"
                        variant="fill"
                        customClass="w-full mt-3"
                    />

                    {message && <p className="text-green-500 mt-3">{message}</p>}
                    {error && <p className="text-red-500 mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
