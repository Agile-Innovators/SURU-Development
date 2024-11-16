import { Input } from '../../components/ui/forms/Input';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useState, useEffect } from 'react';
import { useFetchUser } from '../../components/hooks/useFetchUser';
import { useAuth } from '../../global/AuthProvider';
import { Pencil } from 'lucide-react';
import { useFetchLocations } from '../../components/hooks/useFetchLocations';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../../global/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';

export function GeneralInformation() {
    const { getUser } = useAuth();
    const { user } = getUser();
    const { updateUserProfile, getUserInformation, loading, error, data } = useFetchUser();
    const [userData, setUserData] = useState(null);
    const { locations } = useFetchLocations();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); 
    if (user.user_type == "partner") {
        navigate(ROUTE_PATHS.HOME);
    }

    const [profileData, setProfileData] = useState({
        name: '',
        username: '',
        lastname1: '',
        lastname2: '',
        city_id: '',
        email: '',
        phone_number: '',
        image:
            user.image_url ||
            'https://res.cloudinary.com/dvwtm566p/image/upload/v1728158504/users/dc8aagfamyqwaspllhz8.jpg',
    });

    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando o no

    // Efecto para obtener la información del usuario
    useEffect(() => {
        if (user?.id) {
            getUserInformation(user.id);
        }
    }, [user?.id]);

    // Efecto para sincronizar los datos del usuario con profileData
    useEffect(() => {
        if (data) {
            setProfileData({
                name: data.name || '',
                username: data.username || '',
                lastname1: data.profile?.lastname1 || '',
                lastname2: data.profile?.lastname2 || '',
                city_id: data.location?.city_id || '',
                email: data.email || '',
                phone_number: data.phone_number || '',
                image: data.image_url || '',
            });
            setUserData(data);
        }
    }, [data]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const preview = document.getElementById('previewImage');
                preview.src = reader.result;
            };
            reader.readAsDataURL(file);

            // Actualizar el estado de profileData con la nueva imagen
            setProfileData((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
    };

    // Sincronizar los datos obtenidos con profileData
    useEffect(() => {
        if (data) {
            setProfileData({
                name: data.name || '',
                username: data.username || '',
                lastname1: data.profile?.lastname1 || '',
                city_id: data.location?.city_id || '',
                lastname2: data.profile?.lastname2 || '',
                email: data.email || '',
                phone_number: data.phone_number || '',
                image: data.image_url || '',
            });
            setUserData(data);
        }
        // console.log(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (user?.id) {
            const formData = new FormData();

            for (const key in profileData) {
                if (profileData[key]) {
                    formData.append(key, profileData[key]);
                }
            }

            formData.append('_method', 'PUT');
            // console.log([...formData]);
            const updatedUser = await updateUserProfile(user.id, formData);

            // Actualizar el estado de profileData con la nueva imagen
            if (updatedUser?.image_url) {
                setProfileData((prevState) => ({
                    ...prevState,
                    image: updatedUser.image_url,
                }));
            }

            // Actualizar los datos del usuario
            getUserInformation(user.id);
            toast.success('Information updated successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });


        }
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <div className="p-4">
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
            {loading ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-4">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-semibold">Loading...</p>
                </div>
            ) : (
                <div>
                    <div className="flex justify-center">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="relative group w-48 mx-auto mt">
                                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
                                    <img
                                        id="previewImage"
                                        src={profileData.image}
                                        className="object-cover w-full h-full"
                                        alt={user.name}
                                    />
                                </div>
                                {isEditing && (
                                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="bg-gray-700 opacity-50 rounded-full w-full h-full flex items-center justify-center">
                                            <input
                                                type="file"
                                                accept=".jpg, .jpeg, .png, .webp"
                                                className="w-full cursor-pointer h-full opacity-0 absolute"
                                                name="image"
                                                onChange={handleImageChange}

                                            />
                                            <Pencil className="text-white" />
                                        </div>
                                    </button>
                                )}
                            </div>
                            <h2>Personal Information</h2>
                        </div>
                    </div>
                    <form onSubmit={handleProfileSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
                            <Input
                                inputName="name"
                                inputId="name-input"
                                labelText="Name"
                                value={profileData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <Input
                                inputName="lastname1"
                                inputId="lastname1-input"
                                labelText="First Lastname"
                                value={profileData.lastname1}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <Input
                                inputName="lastname2"
                                inputId="lastname2-input"
                                labelText="Second Lastname"
                                value={profileData.lastname2}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <Input
                                inputName="username"
                                inputId="username-input"
                                labelText="Username"
                                value={profileData.username}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <div className='flex flex-col'>
                                <label className="font-medium text-gray-700">
                                    Ciudad
                                </label>
                                <select
                                    name="city_id"
                                    id="city-input"
                                    value={profileData.city_id}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className='border border-light-grey bg-transparent rounded-md min-h-8 px-4 py-2 mt-2 focus:outline-light-blue'
                                >
                                    {/* Se agrega el mapa de locations */}
                                    {locations.map((location) => (
                                        <option key={location.value} value={location.value}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Input
                                inputName="email"
                                inputId="email-input"
                                labelText="Email Address"
                                type="email"
                                value={profileData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <Input
                                inputName="phone_number"
                                inputId="phoneNumber-input"
                                labelText="Phone Number"
                                type="number"
                                value={profileData.phone_number}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                        </div>
                        <div className="flex justify-end items-center mt-4">
                            {/* Botón para alternar entre Edit y Save */}
                            {isEditing && (
                                <MainButton
                                    type="submit"
                                    variant="fill"
                                    text="Save Changes"
                                    customClass="h-12 items-center"
                                    onClick={handleProfileSubmit}
                                />
                            )}
                        </div>
                    </form>
                    <div className="flex justify-end items-center mt-4">
                        {!isEditing && (
                            <MainButton
                                type="button"
                                variant="fill"
                                text="Edit"
                                customClass="h-12 items-center"
                                onClick={handleEditClick}
                            />
                        )}
                    </div>
                </div>
            )}
            {/* { error && <p className="text-red-500">{error.message}</p> } */}
        </div >
    );
}
