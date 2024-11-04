import { Input } from '../../components/ui/forms/Input';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useState, useEffect } from 'react';
import { useFetchPartner } from '../../components/hooks/useFetchPartner';
import { useAuth } from '../../global/AuthProvider';
import { Pencil } from 'lucide-react';
import { useFetchLocations } from '../../components/hooks/useFetchLocations';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function GeneralInformationPartner() {
    const { getUser } = useAuth();
    const { user } = getUser();
    const { updatePartnerProfile, getPartnerInformation, loading, error, data } = useFetchPartner();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const { locations } = useFetchLocations();

    if (user.user_type !== "partner") {
        navigate(ROUTE_PATHS.HOME);
    }

    const [profileData, setProfileData] = useState({
        name: '',
        city_id: '',
        email: '',
        phone_number: '',
        description: '',
        address: '',
        website_url: '',
        _method: 'PUT',
        profile_picture: '',
        tiktok_url: '',
        instagram_url: '',
        facebook_url: '',
        image:
            user.image_url ||
            'https://res.cloudinary.com/dvwtm566p/image/upload/v1728158504/users/dc8aagfamyqwaspllhz8.jpg',
    });

    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando o no
    // Efecto para obtener la información del usuario
    useEffect(() => {
        if (user?.id) {
            getPartnerInformation(user.id);
        }
    }, [user?.id]);

    // console.log(data);

    // Efecto para sincronizar los datos del usuario con profileData
    useEffect(() => {
        if (data) {
            setProfileData({
                name: data.name || '',
                email: data.email || '',
                phone_number: data.phone_number || '',
                description: data.description || '',
                // Asegúrate de que locations tenga elementos antes de acceder a ellos
                city_id: (data.locations && data.locations.length > 0) ? data.locations[0].city_id : '',
                address: (data.locations && data.locations.length > 0) ? data.locations[0].address : '',
                website_url: data.website_url || '',
                tiktok_url: data.tiktok_url || '',
                instagram_url: data.instagram_url || '',
                facebook_url: data.facebook_url || '',
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
            formData.append('_method', 'PUT');

            try {
                const response = await updatePartnerProfile(user.id, formData);
                if (response?.data?.image_url) {
                    setProfileData((prevState) => ({
                        ...prevState,
                        image: response.data.image_url,

                    }));
                }
                getPartnerInformation(user.id);
            } catch (err) {
                console.error("Error al actualizar perfil:", err);
                toast.error('An unexpected error occurred. Please try again later.', {
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
                theme="light"
            />

            <p>PARTNER</p>
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
                        inputName="email"
                        inputId="email-input"
                        labelText="Email Address"
                        type="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                    <Input
                        inputName="website_url"
                        inputId="websiteUrl-input"
                        labelText="Website URL"
                        value={profileData.website_url}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        inputName="tiktok_url"
                        inputId="tiktokUrl-input"
                        labelText="TikTok URL"
                        value={profileData.tiktok_url}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        inputName="instagram_url"
                        inputId="instagramUrl-input"
                        labelText="Instagram URL"
                        value={profileData.instagram_url}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        inputName="facebook_url"
                        inputId="facebookUrl-input"
                        labelText="Facebook URL"
                        value={profileData.facebook_url}
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
                    <div className='flex flex-col'>
                        <label className="font-medium text-gray-700 span" >
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
                </div>

                <Input
                    inputName="address"
                    inputId="address-input"
                    labelText="Address"
                    value={profileData.address} onChange={handleChange}
                    disabled={!isEditing}
                />

                <Input
                    inputName="description"
                    inputId="description-input"
                    labelText="Description"
                    value={profileData.description} onChange={handleChange}
                    disabled={!isEditing}
                />

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
            {error && <p className="text-red-500">{error.message}</p>}
            {loading && <p>Loading...</p>}
        </div>
    );
}