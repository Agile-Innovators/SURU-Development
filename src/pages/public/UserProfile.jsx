import { GeneralInformation } from '../../components/activity/user_profile/GeneralInformation';
import { UserPreference } from '../../components/activity/user_profile/UserPreference';
import { UserOperationalHours } from '../../components/activity/user_profile/UserOperationalHours';
import { Input } from '../../components/ui/forms/Input';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useState } from 'react';


//importamos el hook
import { useFetchUser } from "../../components/hooks/useFetchUser";
//fin de importamos el hook

//importamos el contexto
import { useAuth } from "../../global/AuthProvider";
//fin de importamos el contexto


export function UserProfile() {
    //traemos el id del contexto
    const { getUser, logout } = useAuth(); // Desestructura las funciones que necesitas del contexto
    const { user, authToken } = getUser(); // Extrae la información del usuario y el token
    //console.log(user); // Imprime la información del usuario en la consola
    //fin de traemos el id del contexto

    //usamos el hook
    const {
        updateUserProfile,
        updateUserPassword,
        updateUserOperationalHours,
        loading,
        error
    } = useFetchUser();

    const [password, setPassword] = useState('');
    //fin de usamos el hook
    // Estado para almacenar los datos del formulario
    const [profileData, setProfileData] = useState({
        name: '',
        username: '',
        lastname1: '',
        lastname2: '',
        email: '',
        phone_number: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    // Función para enviar los datos del formulario
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const userId = user.id; // Debes obtener este ID de la autenticación o el contexto
        updateUserProfile(userId, profileData);
    };

    return (
        <div className="bg-gray-300 p-8">
            <section className="max-w-7xl m-auto">
                {/* <GeneralInformation />
                 */}
                <div className="bg-white p-8">
                    <h2>General Information</h2>
                    <p>Change your profile information</p>
                    <div className="mt-8 w-full">
                        <h4 className="text-base">Profile picture</h4>
                        <div className="flex gap-4 items-center mt-4 flex-col sm:flex-row">
                            <img
                                src="https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
                                alt="profile avatar"
                                className="rounded-full aspect-square h-24"
                            />
                            <MainButton
                                type="button"
                                variant="fill"
                                text="Upload New"
                                customClass="h-fit"
                            />
                            <MainButton
                                type="button"
                                variant="border"
                                text="Delete"
                                customClass="h-fit bg-gray-300 border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-10">
                        <h4 className="text-base">Personal Information</h4>
                        <form className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2" onSubmit={handleProfileSubmit}>
                            <Input
                                inputName="name"
                                inputId="name-input"
                                labelText="Name"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            />
                            <Input
                                inputName="username"
                                inputId="username-input"
                                labelText="Username"
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            />
                            <Input
                                inputName="lastname1"
                                inputId="lastname1-input"
                                labelText="First Lastname"
                                value={profileData.firstLastname}
                                onChange={(e) => setProfileData({ ...profileData, firstLastname: e.target.value })}
                            />
                            <Input
                                inputName="lastname2"
                                inputId="secondLastname-input"
                                labelText="Second Lastname"
                                value={profileData.secondLastname}
                                onChange={(e) => setProfileData({ ...profileData, secondLastname: e.target.value })}
                            />
                            <Input
                                inputName="email"
                                inputId="email-input"
                                labelText="Email Address"
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                            <Input
                                inputName="phone_number"
                                inputId="phoneNumber-input"
                                labelText="Phone Number"
                                type="number"
                                value={profileData.phoneNumber}
                                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                            />
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <MainButton type="submit" variant="fill" text="Save changes" customClass="h-12 items-center" />
                                <MainButton type="button" variant="border" text="Cancel" customClass="h-12 items-center" />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
                    <UserPreference />
                    <UserOperationalHours />
                </div>
                <div className="bg-white p-6 mt-5">
                    <h2 className="text-lg">Change password</h2>
                    <p>
                        You want to change your pass word?{' '}
                        <a href="#" className="text-black">
                            Request a code here
                        </a>
                    </p>
                    <form className="grid gap-4 mt-5 sm:flex sm:flex-row sm:items-end">
                        <Input
                            inputName="oldPassword"
                            inputId="oldPassword-input"
                            labelText="Old password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                        <Input
                            inputName="newPassword"
                            inputId="newPassword-input"
                            labelText="New password"
                            required={true}
                        />
                        <Input
                            inputName="confirmPassword"
                            inputId="confirmPassword-input"
                            labelText="Confirm password"
                            required={true}
                        />
                        <Input
                            inputName="verifyCode"
                            inputId="verifyCode-input"
                            labelText="Verify Code"
                            required={true}
                        />
                        <div className="grid items-end gap-4 sm:flex">
                            <MainButton
                                type="button"
                                variant="fill"
                                text="Save changes"
                                customClass="h-12 items-center"
                            />
                            <MainButton
                                type="button"
                                variant="border"
                                text="Cancel"
                                customClass="h-12 items-center"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
