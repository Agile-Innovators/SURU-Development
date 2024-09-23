import { BackButton } from "../../components/ui/BackButton.jsx";
import { MapPin } from "lucide-react";
import { ActionButton } from "../../components/ui/ActionButton.jsx";
import { MainButton } from "../../components/ui/MainButton.jsx";
import { ROUTE_PATHS } from "../../routes/index.js";
import { useFetchProperties } from "../../components/hooks/useFetchProperties.js";
import { useState, useEffect } from "react";
import { Input } from "./../../components/ui/Input";
import { useAxios } from "../../components/hooks/useAxios.js";

export function PropertyManagement() {
    const { properties, isLoadingProps } = useFetchProperties();
    const [propertiesData, setPropertiesData] = useState(properties);
    // const [isPropertyDeleted, setIsPropertyDeleted] = useState(false);
    const axios = useAxios();

    console.log(properties);
    useEffect(() => {
        setPropertiesData(properties);
    }, [isLoadingProps, properties]);

    const deleteProperty = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`properties/${id}`);
            const data = await response.data;
            console.log(data);

            // Filtrar las propiedades para remover la eliminada
            setPropertiesData((prevProperties) =>
                prevProperties.filter((property) => property.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    function renderPropertiesIndex(items) {
        return (
            <>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row border rounded-md p-4 text-left justify-center sm:justify-between items-center"
                    >
                        <div className="grid gap-2 text-center sm:text-left">
                            <h3>{item.attributes.title}</h3>
                            <div className="flex gap-3 justify-center sm:justify-start">
                                <MapPin
                                    size={22}
                                    strokeWidth={1}
                                    className="text-grey"
                                />
                                <p>
                                    {item.attributes.city_id?.data?.attributes
                                        ?.name || "City not available"}
                                </p>
                            </div>
                            <h5 className="text-2xl font-medium flex gap-3">
                                {item.attributes.sale_price || "0.00"}
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
                ))}
            </>
        );
    }

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
                    renderPropertiesIndex(propertiesData)
                )}
            </div>
        </div>
    );
}
