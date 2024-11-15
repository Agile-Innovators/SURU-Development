import { MainButton } from '../../components/ui/buttons/MainButton';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../global/ThemeContext'; // Asegúrate de importar el contexto
import { useAuth } from '../../global/AuthProvider';
import { useFetchCurrency } from '../../components/hooks/useFetchCurrency';
import { useFetchPartner } from '../../components/hooks/useFetchPartner';
import { useEffect, useState } from 'react';
import { useFetchUser } from '../../components/hooks/useFetchUser';
import Swal from 'sweetalert2';
export function Preferences() {
    const { theme, toggleTheme } = useContext(ThemeContext); // Usamos el contexto del tema
    const { getUser } = useAuth();
    const { user } = getUser();
    const { updatePartnerCurrency } = useFetchCurrency();
    const { updateUserProfile, getPartnerInformation, getUserInformation, loading, error, data } = useFetchUser();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (user?.id && user?.user_type !== 'partner') {
            getUserInformation(user.id);
        } else if (user?.user_type === 'partner') {
            getPartnerInformation(user.id);
        }
    }, [user?.id]);

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

    useEffect(() => {
        if (data) {
            console.log("Data", data.location);

            setProfileData({
                name: data.name || '',
                city_id: data.location?.city_id || '',
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

    console.log('profileData', profileData);

    //actualizamos el currency del partner
    const handleProfileSubmit = async (event) => {
        console.log('entro', event.target.currency_id.value);
        event.preventDefault();
        const userData = {
            currency_id: event.target.currency_id.value,
        };
        try {
            await updatePartnerCurrency(user.id, userData);
            Swal.fire({
                icon: 'success',
                title: 'Cuurency Updated Successfully',
                text: 'The currency have been updated.',
            })
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'An unexpected error occurred.',
                text: 'Please try again later.',
            });
        }
    };


    const handleThemeChange = (event) => {
        toggleTheme(event.target.value); // Cambia el tema basado en la selección
    };

    return (

        <div className='p-4'>
            <div className='flex'>
                <div className='flex flex-col gap-2'>
                    <h2>Preferences</h2>
                    <p>Change your preference settings</p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-8 mt-4 sm:grid-cols-3'>
                {/* <div className="grid gap-2">
                    <label htmlFor="language-select" className="dark:text-white">Language</label>
                    <select
                        name="language"
                        id="language-select"
                        className="p-3 border bg-transparent border-gray-300 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="Español">Spanish</option>
                        <option value="Inglés">English</option>
                    </select>
                </div>

                <div className="grid gap-2">
                    <label htmlFor="notifications-select" className="dark:text-white">Notifications</label>
                    <select
                        name="notifications"
                        id="notifications-select"
                        className="p-3 border bg-transparent border-gray-300 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="On">On</option>
                        <option value="Off">Off</option>
                    </select>
                </div> */}
                <div className="grid gap-2">
                    <label htmlFor="theme-select" className="dark:text-white">Theme</label>
                    <select
                        name="theme"
                        id="theme-select"
                        value={theme} // El valor actual del tema
                        onChange={handleThemeChange} // Cambiar tema al seleccionar
                        className="p-3 border bg-transparent border-gray-300 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>

            {user.user_type === "partner" && (
                <div>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-48 space-y-4">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 font-semibold">Loading...</p>
                        </div>
                    ) : (
                        <>
                            <div className='flex flex-col gap-2 mt-4'>
                                <h2>Currency Change</h2>
                                <p>Notice: Proceed with caution. This section involves currency-sensitive information. Please double-check all entries before proceeding.</p>
                            </div>
                            <form onSubmit={handleProfileSubmit}>
                                <div className='grid grid-cols-1 gap-8 mt-4 sm:grid-cols-3'>
                                    <div className="flex flex-col">
                                        <label className="font-medium text-gray-700 span" htmlFor="currency-select">
                                            Currency
                                        </label>
                                        <select
                                            id="currency-select"
                                            name="currency_id"
            
                                            className="border border-light-grey bg-transparent rounded-md min-h-8 px-4 py-2 mt-2 focus:outline-light-blue"
                                        >
                                            {profileData.currency_id == 1 ? (
                                                <>
                                                    <option value="1" selected>Dollar Currency</option>
                                                    <option value="2">Colon Currency</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="1">Dollar Currency</option>
                                                    <option value="2" selected>Colon Currency</option>
                                                </>
                                            )}
                                        </select>
            
                                    </div>
            
                                </div>
                                <MainButton
                                    type="submit"
                                    variant="fill"
                                    text="Save Changes"
                                    customClass="mt-4"
                                />
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
