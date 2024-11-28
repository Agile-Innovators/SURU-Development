import { Input } from '../../components/ui/forms/Input';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useState, useEffect, useContext } from 'react';
import { useFetchUser } from '../../components/hooks/useFetchUser';
import { useAuth } from '../../global/AuthProvider';
import { Pencil } from 'lucide-react';
import { useFetchLocations } from '../../components/hooks/useFetchLocations';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import { useAxios } from '../../components/hooks/useAxios.js';
import { useFetchPartner } from '../../components/hooks/useFetchPartner';
import { ThemeContext } from '../../global/ThemeContext.jsx';
import Swal from 'sweetalert2';
export function GeneralInformation() {
    // Traemos al usuario
    const { getUser } = useAuth();
    const { user } = getUser();
    const { theme } = useContext(ThemeContext); 

    //Si el usuario es Partner lo devuelve a la vista principal
    const navigate = useNavigate();
    if (user.user_type == "partner") {
        // navigate(ROUTE_PATHS.HOME);
        // console.log("Partner");
    }
    
    //Traemos la información del Usuario
    const { updateUserProfile, getPartnerInformation, getUserInformation, loading, error, data } = useFetchUser();
    const { updatePartnerProfile } = useFetchPartner();
    //Traemos los lugares para mostrar
    const { locations } = useFetchLocations();
    //Creamos un variable que guarde los datos del usuario
    const [userData, setUserData] = useState(null);

    // Estado para controlar si se está editando o no
    const [isEditing, setIsEditing] = useState(false);

    // Efecto para obtener la información del usuario
    useEffect(() => {
        if (user?.id && user?.user_type !== 'partner') {
            getUserInformation(user.id);
        } else if (user?.user_type === 'partner') {
            getPartnerInformation(user.id);
        }
    }, [user?.id]);
    // Estado para guardar los datos del perfil del usuario
    const [profileData, setProfileData] = useState({
        name: '',
        city_id: '',
        email: '',
        phone_number: '',
        image: user.image_url || 'https://res.cloudinary.com/dvwtm566p/image/upload/v1728158504/users/dc8aagfamyqwaspllhz8.jpg',
        ...(user.user_type === 'partner' && {
            address: '',
            website_url: '',
            description: '',
            tiktok_url: '',
            _method: 'PUT',
            instagram_url: '',
            facebook_url: '',
            currency_id: '',
        }),
        ...(user.user_type === 'user' && {
            lastname1: '',
            lastname2: '',
            username: '',
        }),
    });

    // Sincronizar los datos obtenidos con profileData
    useEffect(() => {
        if (data) {

            setProfileData({
                name: data.name || '',
                city_id: (data.locations && data.locations.length > 0) ? data.locations[0].city_id : '',
                email: data.email || '',
                phone_number: data.phone_number || '',
                image: data.image_url || '',
                ...(user.user_type === 'partner' && {
                    address: (data.locations && data.locations.length > 0) ? data.locations[0].address : '',
                    city_id: (data.locations && data.locations.length > 0) ? data.locations[0].city_id : '',

                    website_url: data.website_url || '',
                    tiktok_url: data.tiktok_url || '',
                    instagram_url: data.instagram_url || '',
                    facebook_url: data.facebook_url || '',
                    description: data.description || '',
                    currency_id: data.currency_id || '',
                }),
                ...(user.user_type === 'user' && {
                    lastname1: data.profile?.lastname1 || '',
                    lastname2: data.profile?.lastname2 || '',
                    username: data.username || '',
                }),
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

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        tiktok_url: '',
        instagram_url: '',
        facebook_url: '',

        // otros errores
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        // Validación para el nombre
        if (name === 'name' && value.trim() === '') {
            errorMessage = 'El nombre no puede estar vacío';
        }

        // Validación para el correo electrónico
        if (name === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            errorMessage = 'Correo no válido';
        }

        // Expresiones regulares para URLs de redes sociales
        const urlPatterns = {
            tiktok_url: /^https?:\/\/(www\.)?tiktok\.com\/.*$/,
            instagram_url: /^https?:\/\/(www\.)?instagram\.com\/.*$/,
            facebook_url: /^https?:\/\/(www\.)?facebook\.com\/.*$/
        };

        // Validación para URLs de redes sociales solo si el campo tiene información
        if (urlPatterns[name] && value !== '' && !urlPatterns[name].test(value)) {
            errorMessage = `URL de ${name.split('_')[0].charAt(0).toUpperCase() + name.split('_')[0].slice(1)} no válida`;
        }

        // Validación para el número de teléfono
        if (name === 'phone_number' && !/^\d{8}$/.test(value)) {
            errorMessage = 'Número de teléfono no válido';
        }

        // Actualiza los errores específicos
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));

        // Actualiza isSaving en base a si hay errores
        setIsSaving(errorMessage !== '');

        // Actualiza el estado solo si no hay error
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (user?.id && user?.user_type === 'user') {
            const formData = new FormData();

            for (const key in profileData) {
                if (profileData[key]) {
                    formData.append(key, profileData[key]);
                }
            }

            if (!profileData.city_id && profileData.city_id !== "") {
                formData.append('city_id', null); 
                console.log("city_id no seleccionado, enviando null");
            }

            formData.append('_method', 'PUT');
            try {
                const response = await updateUserProfile(user.id, formData);
                if (response?.data?.image_url) {
                    setProfileData((prevState) => ({
                        ...prevState,
                        image: response.data.image_url,

                    }));
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Personal Information Updated Successfully',
                    text: 'The personal information have been updated.',
                    customClass: theme === 'dark' ? 'swal-dark' : '', 
                })
                getPartnerInformation(user.id);
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'An unexpected error occurred.',
                    text: 'Please try again later.',
                    customClass: theme === 'dark' ? 'swal-dark' : '', 
                });
                console.error("Error al actualizar perfil:", err);
            }
        }

        if (user?.id && user?.user_type === 'partner') {
            
            const formData = new FormData();

            // Asegúrate de agregar todos los campos requeridos
            formData.append('username', profileData.username);
            formData.append('email', profileData.email);
            formData.append('name', profileData.name);
            formData.append('phone_number', profileData.phone_number);

            // Agrega los campos opcionales según sea necesario
            if (profileData.city_id) {
                formData.append('city_id', profileData.city_id);
            }
            if (profileData.address) {
                formData.append('address', profileData.address);
            }
            if (profileData.lastname1) {
                formData.append('lastname1', profileData.lastname1);
            }
            if (profileData.lastname2) {
                formData.append('lastname2', profileData.lastname2);
            }
            if (profileData.description) {
                formData.append('description', profileData.description);
            }
            if (profileData.website_url) {
                formData.append('website_url', profileData.website_url);
            }
            if (profileData.facebook_url) {
                formData.append('facebook_url', profileData.facebook_url);
            }
            if (profileData.instagram_url) {
                formData.append('instagram_url', profileData.instagram_url);
            }
            if (profileData.tiktok_url) {
                formData.append('tiktok_url', profileData.tiktok_url);
            }
            if (profileData.partner_category_id) {
                formData.append('partner_category_id', profileData.partner_category_id);
            }

            // Incluye la imagen si está presente
            if (profileData.image) {
                formData.append('image', profileData.image);
            }

            formData.append('_method', 'PUT');
            try {
                const response = await updatePartnerProfile(user.id, formData);
                if (response?.data?.image_url) {
                    setProfileData((prevState) => ({
                        ...prevState,
                        image: response.data.image_url,

                    }));
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Personal Information Updated Successfully',
                    text: 'The personal information have been updated.',
                    customClass: theme === 'dark' ? 'swal-dark' : '', 
                })
                getPartnerInformation(user.id);
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'An unexpected error occurred.',
                    text: 'Please try again later.',
                    customClass: theme === 'dark' ? 'swal-dark' : '', 
                });
                console.error("Error al actualizar perfil:", err);
            }
        }
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <div className="p-4">
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
                            <div className="flex justify-end items-center mt-4 ">
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleProfileSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
                            <Input inputName="name" spanText={errors.name} inputId="name-input" labelText="Name" value={profileData.name} onChange={handleChange} disabled={!isEditing} />
                            {user.user_type !== 'partner' && (
                                <>
                                    <Input inputName="lastname1" inputId="lastname1-input" labelText="First Lastname" value={profileData.lastname1} onChange={handleChange} disabled={!isEditing} />
                                    <Input inputName="lastname2" inputId="lastname2-input" labelText="Second Lastname" value={profileData.lastname2} onChange={handleChange} disabled={!isEditing} />
                                    <Input inputName="username" inputId="username-input" labelText="Username" value={profileData.username} onChange={handleChange} disabled={!isEditing} />
                                </>
                            )}

                            <div className='flex flex-col'>
                                <label className="font-medium text-gray-700">Ciudad</label>
                                <select name="city_id" id="city-input" value={profileData.city_id} onChange={handleChange} disabled={!isEditing} className='border border-light-grey bg-transparent rounded-md min-h-8 px-4 py-2 mt-2 focus:outline-light-blue'>
                                    <option value="">Select a city</option>
                                    {locations.map((location) => (
                                        <option key={location.value} value={location.value}> {location.name} </option>
                                    ))}
                                </select>
                            </div>
                            <Input inputName="email" inputId="email-input" spanText={errors.email} labelText="Email Address" type="email" value={profileData.email} onChange={handleChange} disabled={!isEditing} />
                            <Input inputName="phone_number" spanText={errors.phone_number} inputId="phoneNumber-input" labelText="Phone Number" type="number" value={profileData.phone_number} onChange={handleChange} disabled={!isEditing} />
                            {user.user_type === 'partner' && (
                                <>
                                    <Input inputName="address" inputId="address-input" labelText="Address" value={profileData.address} onChange={handleChange} disabled={!isEditing} />
                                    <Input inputName="website_url" inputId="website-input" labelText="Website URL" value={profileData.website_url} onChange={handleChange} disabled={!isEditing} />
                                    <Input inputName="tiktok_url" spanText={errors.tiktok_url} inputId="tiktok-input" labelText="TikTok URL" value={profileData.tiktok_url} onChange={handleChange} disabled={!isEditing} />
                                    <Input inputName="instagram_url" spanText={errors.instagram_url} inputId="instagram-input" labelText="Instagram URL" value={profileData.instagram_url} onChange={handleChange} disabled={!isEditing} />
                                    <Input inputName="facebook_url" spanText={errors.facebook_url} inputId="facebook-input" labelText="Facebook URL" value={profileData.facebook_url} onChange={handleChange} disabled={!isEditing} />
                                    <Input inputName="description" inputId="description-input" labelText="Description" value={profileData.description} onChange={handleChange} disabled={!isEditing} />
                                    {/* <Input inputName="currency_id" inputId="currency-input" labelText="Currency" value={profileData.currency_id} onChange={handleChange} disabled={!isEditing} /> */}


                                </>
                            )}
                        </div>
                        <div className="flex justify-end items-center mt-4">
                            {isEditing && (
                                <MainButton
                                    type="submit"
                                    variant="none"
                                    text="Save Changes"
                                    customClass={`block text-white text-center px-8 py-3 rounded-md transition-colors duration-150  ${isSaving ? 'cursor-not-allowed bg-grey ' : 'cursor-pointer bg-secondary'}`}
                                    disabled={isSaving}

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
        </div >
    );
}
