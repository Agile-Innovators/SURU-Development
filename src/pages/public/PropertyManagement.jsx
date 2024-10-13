import { BackButton } from '../../components/ui/buttons/BackButton.jsx'; 
import { MapPin, EllipsisVertical, Pencil, Trash2, Eye } from 'lucide-react'; 
import { MainButton } from '../../components/ui/buttons/MainButton.jsx'; 
import { ROUTE_PATHS } from '../../routes/index.js'; 
import { useState, useEffect } from 'react'; 
import { useAxios } from '../../components/hooks/useAxios.js'; 
import { useFetchUserProperties } from '../../components/hooks/useFetchUserProperties.js'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom'; 
import { globalProvider } from '../../global/GlobalProvider.jsx';
import { useContext } from 'react';

export function PropertyManagement() {
    const { properties, isLoadingProps } = useFetchUserProperties();
    const [propertiesData, setPropertiesData] = useState(properties);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const axios = useAxios();
    const navigate = useNavigate(); // Inicializar useNavigate

    const {
        setPropertyID,
    } = useContext(globalProvider);

    const formatPrice = (price) => {
        if (price >= 1e9) return `${(price / 1e9).toFixed(1)}B`;
        if (price >= 1e6) return `${(price / 1e6).toFixed(1)}M`;
        if (price >= 1e3) return `${(price / 1e3).toFixed(1)}K`;
        return price.toString();
    };

    useEffect(() => {
        setPropertiesData(properties);
    }, [properties]);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const deleteProperty = async (id) => {
        try {
            const response = await axios.delete(`properties/delete/${id}`);
            const data = await response.data;

            setPropertiesData((prevProperties) =>
                prevProperties.filter((property) => property.id !== id)
            );

            toast.success(data.message);
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the property.");
        }
    };

    const showProperty = (id) => {
        setPropertyID(id);
        console.log('ID HOME:', id);
        navigate(ROUTE_PATHS.PROPERTY_DETAILS);
    };

    const renderPropertiesIndex = (items) => {
        return (
            <div className='grid grid-cols-1 gap-4'>
                {items.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row border rounded-md p-4 text-left justify-center sm:justify-between items-center"
                        >
                            <div className="grid gap-2 text-center sm:text-left">
                                <h3>{item.title}</h3>
                                <div className="flex gap-3 justify-center sm:justify-start">
                                    <MapPin size={22} strokeWidth={1} className="text-grey" />
                                    <p>{item.city || 'City not available'}</p>
                                </div>
                                <h5 className="text-2xl font-medium flex gap-3">
                                    {formatPrice(item.price ? item.price : item.rent_price)}
                                    {(item.payment_frequency ? <span className="text-grey"> {item.payment_frequency}</span> : '')}
                                </h5>
                            </div>
                            <div className="relative">
                                <button
                                    className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                                    onClick={() => toggleDropdown(item.id)}
                                >
                                    <EllipsisVertical size={24} />
                                </button>

                                {/* Opciones del menú desplegable (los tres puntitos) */}
                                {openDropdownId === item.id && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        <ul className="text-left">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-400 hover:text-white flex items-center gap-2 cursor-pointer"
                                                onClick={() => {
                                                    showProperty(item.id); // Llamar a showProperty para redirigir
                                                    setOpenDropdownId(null);
                                                }}
                                            >
                                                <Eye size={16} /> View Property
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-cyan-200 hover:text-white flex items-center gap-2 cursor-pointer"
                                                onClick={() => {
                                                    console.log('Edit clicked');
                                                    setOpenDropdownId(null);
                                                }}
                                            >
                                                <Pencil size={16} /> Edit
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-red-500 hover:text-white flex items-center gap-2 cursor-pointer"
                                                onClick={() => {
                                                    deleteProperty(item.id);
                                                    setOpenDropdownId(null);
                                                }}
                                            >
                                                <Trash2 size={16} /> Delete
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <input
                                id={`input_prop_id_${item.id}`}
                                type="hidden"
                                value={item.id}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="max-w-7xl m-auto mt-5 p-4 xl:p-0">
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
            <div className="text-center grid gap-4">
                <div className='grid gap-4 items-center mt-4'>
                    <section className='flex gap-4'>
                        <BackButton />
                        <h1 className="text-center sm:text-start">
                            Manage Publications
                        </h1>
                    </section>
                    <MainButton
                        type="link"
                        to={ROUTE_PATHS.CREATE_PROPERTY}
                        text="+ Add New Property"
                        customClass="w-full sm:w-fit h-fit"
                    />
                </div>
                {isLoadingProps ? <p>Loading...</p> : renderPropertiesIndex(propertiesData)}
            </div>
        </div>
    );
}
