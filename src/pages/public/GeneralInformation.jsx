import { Input } from '../../components/ui/forms/Input';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useState, useEffect } from 'react';
import { useFetchUser } from "../../components/hooks/useFetchUser";
import { useAuth } from "../../global/AuthProvider";
import { Pencil } from 'lucide-react';

export function GeneralInformation() {

    const { getUser } = useAuth();
    const { user } = getUser();
    const {
        updateUserProfile,
        getUserInformation,
        loading,
        error,
        data
    } = useFetchUser();
    const [previewImage, setPreviewImage] = useState(user.image_url || "https://res.cloudinary.com/dvwtm566p/image/upload/v1728158504/users/dc8aagfamyqwaspllhz8.jpg");
        
    const [userData, setUserData] = useState(null); // Datos del usuario desde la API
    const [profileData, setProfileData] = useState({
        name: "",
        username: "",
        lastname1: "",
        lastname2: "",
        email: "",
        phone_number: ""
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
                name: data.name || "",
                username: data.username || "",
                lastname1: data.profile?.lastname1 || "",
                lastname2: data.profile?.lastname2 || "",
                email: data.email || "",
                phone_number: data.phone_number || ""
            });
            setUserData(data);
        }
    }, [data]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);

          // Actualizar el estado de profileData con la nueva imagen
            setProfileData((prevState) => ({
                ...prevState,
                image: file
            }));
        }
      };

    // Sincronizar los datos obtenidos con profileData
    useEffect(() => {
        if (data) {
            setProfileData({
                name: data.name || "",
                username: data.username || "",
                lastname1: data.profile?.lastname1 || "", 
                lastname2: data.profile?.lastname2 || "", 
                email: data.email || "",
                phone_number: data.phone_number || "",
                image: data.image_url || ""
            });
            setUserData(data);
        }
        console.log(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (user?.id) {
            const formData = new FormData();
    
            for (const key in profileData) {
                // Solo se envían los datos que no estén vacíos
                if (profileData[key]) {
                    formData.append(key, profileData[key]);
                }
            }
    
            formData.append('_method', 'PUT');
            console.log([...formData]); // Mostrar los datos que se envían :p
    
            await updateUserProfile(user.id, formData); 
            getUserInformation(user.id); 
        }
        setIsEditing(false); 
    };

    const handleEditClick = () => {
        setIsEditing((prev) => !prev); 
    };

    return (
        <div className='p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className="relative group w-48 mx-auto mt">
                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
                                <img src={previewImage} className="object-cover w-full h-full" alt="profile photo"/>
                        </div>
                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-gray-500 opacity-50 rounded-full w-full h-full flex items-center justify-center">
                            <input type="file" accept=".jpg, .jpeg, .png, .webp" className="w-full cursor-pointer h-full opacity-0 absolute" name="image" onChange={handleImageChange}/>
                            <Pencil className="text-white" />
                        </div>
                        </button>
                    </div>
                    <h2>Personal Information</h2>
                </div>
            </div>
            <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-3">
                    <Input
                        inputName="name"
                        inputId="name-input"
                        labelText="Name"
                        value={profileData.name}
                        onChange={handleChange}
                        disabled={!isEditing} // Deshabilitar cuando no está en modo edición
                    />

                    <Input
                        inputName="lastname1"
                        inputId="lastname1-input"
                        labelText="First Lastname"
                        value={profileData.lastname1}
                        onChange={handleChange}
                        disabled={!isEditing} // Deshabilitar cuando no está en modo edición
                    />
                    <Input
                        inputName="lastname2"
                        inputId="lastname2-input"
                        labelText="Second Lastname"
                        value={profileData.lastname2}
                        onChange={handleChange}
                        disabled={!isEditing} // Deshabilitar cuando no está en modo edición
                    />
                    <Input
                        inputName="username"
                        inputId="username-input"
                        labelText="Username"
                        value={profileData.username}
                        onChange={handleChange}
                        disabled={!isEditing} // Deshabilitar cuando no está en modo edición
                    />
                    <Input
                        inputName="email"
                        inputId="email-input"
                        labelText="Email Address"
                        type="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing} // Deshabilitar cuando no está en modo edición
                    />
                    <Input
                        inputName="phone_number"
                        inputId="phoneNumber-input"
                        labelText="Phone Number"
                        type="number"
                        value={profileData.phone_number}
                        onChange={handleChange}
                        disabled={!isEditing} // Deshabilitar cuando no está en modo edición
                    />
                </div>
                <div className="flex justify-end items-center mt-4">
                    {/* Botón para alternar entre Edit y Save */}
                    {isEditing &&
                        <MainButton
                            type="submit"
                            variant="fill"
                            text="Save Changes"
                            customClass="h-12 items-center"
                            onClick={handleProfileSubmit}
                        />
                    }
                </div>
            </form>
            <div className="flex justify-end items-center mt-4">
                {!isEditing &&
                    <MainButton
                        type="button"
                        variant="fill"
                        text="Edit"
                        customClass="h-12 items-center"
                        onClick={handleEditClick}
                    />}
            </div>
            {error && <p className="text-red-500">{error.message}</p>}
            {loading && <p>Loading...</p>}
        </div>
    );
}


