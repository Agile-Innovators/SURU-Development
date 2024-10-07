import { BackButton } from '../../components/ui/buttons/BackButton.jsx';
import { MapPin } from 'lucide-react';
import { ActionButton } from '../../components/ui/buttons/ActionButton.jsx';
import { MainButton } from '../../components/ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../routes/index.js';
// import { useFetchProperties } from "../../components/hooks/useFetchProperties.js";
import { useState, useEffect } from 'react';
import { Input } from '../../components/ui/forms/Input.jsx';
import { useAxios } from '../../components/hooks/useAxios.js';
import { useFetchProperties } from '../../components/hooks/useFetchProperties.js';

export function PropertyManagement() {
    const { properties, isLoadingProps } = useFetchProperties();
    const [propertiesData, setPropertiesData] = useState(properties);
    // const [isPropertyDeleted, setIsPropertyDeleted] = useState(false);
    const axios = useAxios();
    console.log(properties);
    //  useEffect(() => {
    //      setPropertiesData(properties);

    //      console.log("propertiesData");
    //      console.log("datoss:", propertiesData);
    //  }, [isLoadingProps, properties]);

    const deleteProperty = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`properties/delete/${id}`);
            const data = await response.data;

            // Filtrar las propiedades para remover la eliminada
            setPropertiesData((prevProperties) =>
                prevProperties.filter((property) => property.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const renderPropertiesIndex = (items) => {
        return items.map((item, index) => {
            return (
                <div
                    key={item.id}
                    className="flex flex-col sm:flex-row border rounded-md p-4 text-left justify-center sm:justify-between items-center"
                >
                    <div className="grid gap-2 text-center sm:text-left">
                        <h3>{item.title} - {item.property_transaction} </h3>
                        <div className="flex gap-3 justify-center sm:justify-start">
                            <MapPin
                                size={22}
                                strokeWidth={1}
                                className="text-grey"
                            />
                            <p>{item.city || 'City not available'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* el siguiente condicional if que verifica el tipo de moneda: si es CRC o USD */}
                            {item.currency_code === "CRC" ? (
                                <p>₡</p>
                            ) : (
                                <p>$</p>
                            )}

                            <h5 className="text-2xl font-medium flex gap-3">
                                {item.price || "0.00"}
                            </h5>
                            {item.property_transaction === "Rent" ? (
                                <span className="text-grey">{item.payment_frequency}</span>
                            ) : (
                                <span className="text-grey"> One-time payment</span>
                            )}
                        </div>
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
        <div className="max-w-7xl m-auto p-4 ">
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
                    // console.log("propertiesData", properties)
                    renderPropertiesIndex(properties)
                )}
            </div>
        </div>
    );
}
