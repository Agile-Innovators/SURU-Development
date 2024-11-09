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

export function PropertyManagement() {
    const { properties, isLoadingProps } = useFetchUserProperties();
    const [propertiesData, setPropertiesData] = useState(properties);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const axios = useAxios();
    const navigate = useNavigate(); // Inicializar useNavigate


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
            // console.log(error);
            toast.error('An error occurred while deleting the property.');
        }
    };

    const showProperty = (id) => {
        navigate(`${ROUTE_PATHS.PROPERTY_DETAILS.replace(':propertyId', id)}`);
    };

    const renderPropertiesIndex = (items) => {
        return (
            <div className="grid grid-cols-1 gap-4 mb-6">
                {items.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex flex-row border rounded-md p-4 text-left justify-between items-center"
                        >
                            <div className="grid gap-2 text-center sm:text-left">
                                <h3 className="text-start">{item.title}</h3>
                                <div className="flex gap-3 sm:justify-start">
                                    <MapPin
                                        size={22}
                                        strokeWidth={1}
                                        className="text-grey"
                                    />
                                    <p>{item.city || 'City not available'}</p>
                                </div>
                                <h5 className="text-2xl font-medium flex gap-3">
                                    {formatPrice(
                                        item.price
                                            ? item.price
                                            : item.rent_price
                                    )}
                                    {item.payment_frequency ? (
                                        <span className="text-grey">
                                            {' '}
                                            {item.payment_frequency}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </h5>
                            </div>
                            <div className="relative">
                                <button
                                    className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => toggleDropdown(item.id)}
                                >
                                    <EllipsisVertical size={24} />
                                </button>

                                {/* Opciones del menú desplegable (los tres puntitos) */}
                                {openDropdownId === item.id && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                                        <ul className="text-left">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 hover:text-white flex items-center gap-2 cursor-pointer"
                                                onClick={() => {
                                                    showProperty(item.id);
                                                    setOpenDropdownId(null);
                                                }}
                                            >
                                                <Eye size={16} /> View Property
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-cyan-200 dark:hover:bg-gray-600 hover:text-white flex items-center gap-2 cursor-pointer"
                                                onClick={() => {
                                                    // console.log('Edit clicked');
                                                    navigate(ROUTE_PATHS.EDIT_PROPERTY.replace(':id', item.id));
                                                    setOpenDropdownId(null);
                                                }}
                                            >
                                                <Pencil size={16} /> Edit
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white flex items-center gap-2 cursor-pointer"
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
        <div className="max-w-7xl w-full min-h-[70vh] m-auto mt-5 p-4 xl:p-0">
            <ToastContainer
                position="top-center"
                autoClose={1500}
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
                <div className="flex flex-col  justify-between gap-4 items-center mt-4">
                    <section className="flex gap-4 justify-between w-full flex-col">
                        <BackButton />
                        <h1 className="text-center sm:text-start">
                            Manage Publications
                        </h1>
                        <div className='flex justify-end'>
                            <MainButton
                                type="link"
                                to={ROUTE_PATHS.CREATE_PROPERTY}
                                text="+ Add New Property"
                                customClass="w-full sm:w-fit h-fit"
                            />
                        </div>
                    </section>

                </div>
                {isLoadingProps ? (
                    <p>Loading...</p>
                ) : (
                    renderPropertiesIndex(propertiesData)
                )}
            </div>
        </div>
    );
}
