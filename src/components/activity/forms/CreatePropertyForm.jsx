import { X, House, Hotel, Warehouse, Store, Fence } from "lucide-react";
import React, { useState } from "react";
import SectionDivider from "../../ui/layout/SectionDivider";
import { MainButton } from "../../ui/buttons/MainButton";
import { IconTextButton } from "../../ui/buttons/IconTextButton";
import HDSForm from "./HDSForm";
import RetailSpaceForm from "./RetailSpaceForm";
import { useAxios } from "../../hooks/useAxios";
import { MainFilterTag } from "../../ui/buttons/MainFilterTag";
import { SecondaryFilterTag } from "../../ui/buttons/SecondaryFilterTag";
import { BareLandForm } from './BareLandForm';

const CreatePropertyForm = () => {
    const axios = useAxios();
    const [tipoPropiedad, setTipoPropiedad] = useState(null);
    const [accion, setAccion] = useState(null);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [data, setData] = useState({});
    const [utilities, setUtilities] = useState([]);
    const [filterPropType, setFilterPropType] = useState(1);
    const [filterPropTransaction, setFilterPropTransaction] = useState(1);

    const handleFilterPropType = (filterId) => {
        setFilterPropType(filterId);
    };

    const handleFilterPropTransaction = (id) => {
        setFilterPropTransaction(id);
    };

    const [services, setServices] = useState({
        availableWater: false,
        water: false,
        availableElectricity: false,
        electricity: false,
        wifi: false,
        cable: false,
    });

    const serviceIds = {
        availableWater: 1,
        water: 2,
        availableElectricity: 3,
        electricity: 4,
        wifi: 5,
        cable: 6,
    };

    const toggleService = (service) => {
        setServices((prevState) => {
            const newState = { ...prevState, [service]: !prevState[service] };
            console.log(
                `toggleService llamado para servicio: "${service}", nuevo estado: ${newState[service]}`
            );

            if (service === "availableWater" && !newState.availableWater) {
                newState.water = false;
                console.log(
                    `Servicio disponible 'availableWater' desactivado, removiendo 'water' de los datos`
                );
            }

            if (
                service === "availableElectricity" &&
                !newState.availableElectricity
            ) {
                newState.electricity = false;
                newState.wifi = false;
                newState.cable = false;
                console.log(
                    `Servicio disponible 'availableElectricity' desactivado, removiendo 'electricity', 'wifi', 'cable' de los datos`
                );
            }

            return newState;
        });
    };

    const handleUtilitiesData = (value, method) => {
        if (method === "remove") {
            setUtilities((prevUtilities) =>
                prevUtilities.filter((utility) => utility !== value)
            );
        } else {
            setUtilities((prevUtilities) => [...prevUtilities, value]);
        }
    };

    const handleInputChange = (key, value) => {
        setData((prevData) => {
            let updatedData;
            if (value) {
                updatedData = { ...prevData, [key]: value };
            } else {
                const { [key]: removed, ...rest } = prevData;
                updatedData = rest;
            }
            return updatedData;
        });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [...images];
        const newPreviews = [...imagePreviews];

        files.forEach((file) => {
            if (newImages.length < 6) {
                newImages.push(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result);
                    setImagePreviews([...newPreviews]);
                };
                reader.readAsDataURL(file);
            }
        });

        setImages(newImages);
        // Considerar eliminar esta línea si las imágenes se manejan por separado
        // handleInputChange("images", newImages);
        event.target.value = "";
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = {
            ...data,
            property_category_id: filterPropType,
            property_transaction_type_id: filterPropTransaction,
            city_id: 1,
            // currency_id: 1,
            user_id: 2,
        };

        //Objeto para enviar los datos
        const formData = new FormData();

        //agregar imagenes a la consulta
        images.forEach((image) => {
            formData.append("images[]", image);
        });

        //agregar los datos a la consulta
        for (let key in finalData) {
            formData.append(key, finalData[key]);
        }

        utilities.forEach((utility) => {
            formData.append("utilities[]", utility);
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const response = await axios.post("/properties", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("respuesta del servidor:", response);
        } catch (error) {
            console.log(error);
        }
        return;
    };

    const renderFormulario = () => {
        if (!filterPropType || !filterPropTransaction) return null;

        const formulariosPorTipo = {
            //casa
            1: (
                <HDSForm
                    title={"House details"}
                    transactionType={filterPropTransaction}
                    services={services}
                    toggleService={toggleService}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                />
            ),
            //apartment
            2: (
                <HDSForm
                    title={"Apartment details"}
                    transactionType={filterPropTransaction}
                    services={services}
                    toggleService={toggleService}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                />
            ),
            //studio
            3: (
                <HDSForm
                    title={"Studio details"}
                    transactionType={filterPropTransaction}
                    services={services}
                    toggleService={toggleService}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                />
            ),
            //bare land
            4: (
                <BareLandForm
                    transactionType={filterPropTransaction}
                    services={services}
                    toggleService={toggleService}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                />
            ),
            //retail
            5: (
                <RetailSpaceForm
                    transactionType={filterPropTransaction}
                    services={services}
                    toggleService={toggleService}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                />
            ),
        };
        return formulariosPorTipo[filterPropType] || null;
    };

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="mt-10 text-center sm:text-start">
                Let's add a property
            </h1>
            <div className="container mx-auto">
                <SectionDivider text="Property type" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mx-auto max-w-7xl">
                    <MainFilterTag
                        text={"House"}
                        icon={<House size={20} />}
                        isActivate={filterPropType === 1}
                        handleActivateButton={() => handleFilterPropType(1)}
                    />
                    <MainFilterTag
                        text={"Apartment"}
                        icon={<Hotel size={20} />}
                        isActivate={filterPropType === 2}
                        handleActivateButton={() => handleFilterPropType(2)}
                    />
                    <MainFilterTag
                        text={"Studio"}
                        icon={<Warehouse size={20} />}
                        isActivate={filterPropType === 3}
                        handleActivateButton={() => handleFilterPropType(3)}
                    />
                    <MainFilterTag
                        text={"Bare land"}
                        icon={<Fence size={20} />}
                        isActivate={filterPropType === 4}
                        handleActivateButton={() => handleFilterPropType(4)}
                    />
                    <MainFilterTag
                        text={"Retail space"}
                        icon={<Store size={20} />}
                        isActivate={filterPropType === 5}
                        handleActivateButton={() => handleFilterPropType(5)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="mb-10">
                        <SectionDivider text="What will you do with this property?" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mx-auto max-w-7xl">
                            <SecondaryFilterTag
                                text={"Sale"}
                                isActivate={filterPropTransaction === 1}
                                handleSelectedValue={
                                    handleFilterPropTransaction
                                }
                                groupType={"group"}
                                idValue={1}
                            />
                            <SecondaryFilterTag
                                text={"Rent"}
                                isActivate={filterPropTransaction === 2}
                                handleSelectedValue={
                                    handleFilterPropTransaction
                                }
                                groupType={"group"}
                                idValue={2}
                            />
                            <SecondaryFilterTag
                                text={"Both"}
                                isActivate={filterPropTransaction === 3}
                                handleSelectedValue={
                                    handleFilterPropTransaction
                                }
                                groupType={"group"}
                                idValue={3}
                            />
                        </div>
                        {/* Formulario de publicación */}
                        <form onSubmit={handleSubmit}>
                            {renderFormulario()}
                            <MainButton
                                text="Publish Property"
                                type="submit"
                                variant="fill"
                                disabled={false} // Aquí puedes gestionar el estado de loading si lo deseas
                                customClass="mt-4 w-full"
                            />
                        </form>
                        {/* {error && <p>Error: {error.message}</p>} */}
                    </div>

                    <div>
                        <SectionDivider text="Upload a image" />
                        <div className="image-upload-container">
                            <label
                                htmlFor="file-input"
                                className="block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer bg-secondary text-white hover:bg-light-blue hover:text-primary"
                            >
                                Add
                            </label>

                            <p>
                                Please upload a image file (JPG, PNG, or GIF).
                                Max size: 5MB.
                            </p>

                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                multiple
                            />
                            <div className="image-preview-container mt-4">
                                {imagePreviews.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            className="w-32 h-32 object-cover rounded-md mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePropertyForm;
