import { BackButton } from '../../components/ui/buttons/BackButton.jsx'; 
import { MapPin } from 'lucide-react';
import { ActionButton } from '../../components/ui/buttons/ActionButton.jsx';
import { MainButton } from '../../components/ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../routes/index.js';
import { useState, useEffect } from 'react';
import { Input } from '../../components/ui/forms/Input.jsx';
import { useAxios } from '../../components/hooks/useAxios.js';
import { useFetchUserProperties } from '../../components/hooks/useFetchUserProperties.js';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function PropertyManagement() {
    const { properties, isLoadingProps } = useFetchUserProperties();
    const [propertiesData, setPropertiesData] = useState(properties);
    const axios = useAxios();

    const formatPrice = (price) => {
        if (price >= 1e9) return `${(price / 1e9).toFixed(1)}B`;
        if (price >= 1e6) return `${(price / 1e6).toFixed(1)}M`;
        if (price >= 1e3) return `${(price / 1e3).toFixed(1)}K`;
        return price.toString();
    };
    
    useEffect(() => {
        // Actualizar el estado de propertiesData cuando properties cambie
        setPropertiesData(properties);
    }, [properties]);

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

    const renderPropertiesIndex = (items) => {
        return (
            <div className='grid gap-4'>
                {items.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row border rounded-md p-4 text-left justify-center sm:justify-between items-center"
                        >
                            <div className="grid gap-2 text-center sm:text-left">
                                <h3>{item.title}</h3>
                                <div className="flex gap-3 justify-center sm:justify-start">
                                    <MapPin
                                        size={22}
                                        strokeWidth={1}
                                        className="text-grey"
                                    />
                                    <p>{item.city || 'City not available'}</p>
                                </div>
                                <h5 className="text-2xl font-medium flex gap-3">
                                    {formatPrice(item.price ? item.price : item.rent_price)}
                                    {(item.payment_frequency ? <span className="text-grey"> {item.payment_frequency}</span> : '')}
                                </h5>
                            </div>
    
                            <div className="flex flex-col sm:flex-row justify-center p-2 gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                                <MainButton
                                    text="Edit"
                                    variant='none'
                                    customClass="w-full sm:w-auto bg-transparent border-2 border-gray-200 text-[#515151] hover:bg-gray-300 hover:border-gray-300 hover:text-black"
                                />
                                <MainButton
                                    text="Remove"
                                    variant="none"
                                    customClass="bg-[#edcaca] text-red-700 hover:bg-red-500 hover:text-white"
                                    onClick={() => deleteProperty(item.id)}
                                />
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
        <div className="max-w-7xl m-auto p-4 min-h-[85vh]">
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
                <section className='flex justify-between items-center mt-4'>
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
                            customClass="w-full sm:w-auto h-fit"
                        />
                </section>

                {isLoadingProps ? (
                    <div role="status" className='m-auto'>
                    <svg aria-hidden="true" className="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-500 fill-cyan-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                ) : (
                    // Usar propertiesData en lugar de properties
                    renderPropertiesIndex(propertiesData)
                )}
            </div>
        </div>
    );
}
