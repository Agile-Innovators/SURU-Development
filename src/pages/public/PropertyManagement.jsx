import { BackButton } from '../../components/ui/buttons/BackButton.jsx'; 
import { MapPin } from 'lucide-react';
import { ActionButton } from '../../components/ui/buttons/ActionButton.jsx';
import { MainButton } from '../../components/ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../routes/index.js';
import { useState, useEffect } from 'react';
import { Input } from '../../components/ui/forms/Input.jsx';
import { useAxios } from '../../components/hooks/useAxios.js';
import { useFetchProperties } from '../../components/hooks/useFetchProperties.js';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function PropertyManagement() {
    const { properties, isLoadingProps } = useFetchProperties();
    const [propertiesData, setPropertiesData] = useState(properties);

    const axios = useAxios();
    
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
        return items.map((item) => {
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
                            {item.sale_price || '0.00'}
                            <span className="text-grey"> Monthly</span>
                        </h5>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center p-2 gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                        <MainButton
                            text="Edit"
                            customClass="w-full sm:w-auto"
                            variant="border"
                        />
                        <MainButton
                            text="Remove"
                            customClass="bg-red-500 hover:bg-red-400"
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
        });
    };

    return (
        <div className="max-w-7xl m-auto p-4">
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
            <BackButton />
            <div className="text-center grid gap-4">
                <h1>Manage Publications</h1>
                <div className="flex w-full justify-center sm:justify-end mt-4">
                    <MainButton
                        type="link"
                        to={ROUTE_PATHS.CREATE_PROPERTY}
                        text="Add New Property"
                        customClass="w-full sm:w-auto"
                    />
                </div>

                {isLoadingProps ? (
                    <p>Loading</p>
                ) : (
                    // Usar propertiesData en lugar de properties
                    renderPropertiesIndex(propertiesData)
                )}
            </div>
        </div>
    );
}
