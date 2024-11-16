import { Input } from '../../components/ui/forms/Input';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useState } from 'react';
import { useFetchUser } from '../../components/hooks/useFetchUser';
import { useAuth } from '../../global/AuthProvider';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../../global/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
export function ChangePassword() {
    const { getUser } = useAuth();
    const { user } = getUser();
    const { updateUserPassword, getUserInformation, loading, error, data } =
        useFetchUser();
    const { theme } = useContext(ThemeContext);
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value, // Corrige el uso de name
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        // Validación de contraseñas
        if (
            passwordData.new_password.length < 8 ||
            passwordData.confirm_password.length < 8
        ) {
            toast.error(
                'The new password needs to be at least 8 characters long.',
                {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                }
            );
            return;
        }

        if (passwordData.new_password !== passwordData.confirm_password) {
            toast.error('New password and confirm password do not match.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
            return;
        }

        if (user?.id) {
            try {
                // Llama a la función para actualizar la contraseña
                const response = await updateUserPassword(
                    user.id,
                    passwordData
                );

                // Verifica si la respuesta es exitosa
                if (response && response.message) {
                    // Limpia los campos después de una actualización exitosa
                    setPasswordData({
                        old_password: '',
                        new_password: '',
                        confirm_password: '',
                    });

                    // Notificación de éxito
                    toast.success('Password updated successfully!', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                        transition: Bounce,
                    });
                } else {
                    // Maneja el caso donde no hay mensaje o es diferente
                    toast.error(
                        response?.message ||
                            'Failed to update password, please try again.',
                        {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                            transition: Bounce,
                        }
                    );
                }
            } catch (err) {
                // Notificación de error
                toast.error(
                    err.response?.data?.message || 'Failed to update password.',
                    {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                        transition: Bounce,
                    }
                );
            }
        } else {
            toast.error('User ID is missing, please try again.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        }
    };

    return (
        <form className="p-4" onSubmit={handleProfileSubmit}>
            <ToastContainer
                position="top-center"
                autoClose={200}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />

            <div className="flex flex-col gap-2">
                <h2>Change your Password</h2>
                <p>
                    You can easily update your current password here. Just
                    follow the steps and you’ll be all set!
                </p>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-3">
                <Input
                    inputName="old_password"
                    inputId="oldPassword-input"
                    labelText="Old Password"
                    value={passwordData.old_password}
                    onChange={handleInputChange}
                    required={true}
                />
                <Input
                    inputName="new_password"
                    inputId="newPassword-input"
                    labelText="New Password"
                    value={passwordData.new_password}
                    onChange={handleInputChange}
                    required={true}
                />
                <Input
                    inputName="confirm_password"
                    inputId="confirmPassword-input"
                    labelText="Confirm Password"
                    value={passwordData.confirm_password}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>
            <div className="flex justify-end items-center mt-4">
                <MainButton
                    type="submit"
                    variant="fill"
                    text="Save Changes"
                    customClass="h-12 items-center"
                />
            </div>
            {loading && <p>Loading...</p>}
        </form>
    );
}
