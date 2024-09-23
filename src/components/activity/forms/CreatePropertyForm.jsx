import React, { useState } from "react";
import SectionDivider from "../../ui/SectionDivider";
import { MainButton } from "../../ui/MainButton";
import { useFetchData } from "../../hooks/useFetchData";
import HDSForm from "./HDSForm";
import BareLandForm from "./BareLandForm";
import RetailSpaceForm from "./RetailSpaceForm";
import { X } from "lucide-react";
import { useAxios } from "../../hooks/useAxios";

const CreatePropertyForm = () => {
    const axios = useAxios();
    const [tipoPropiedad, setTipoPropiedad] = useState(null);
    const [accion, setAccion] = useState(null);
    const [services, setServices] = useState({
        water: false,
        electricity: false,
        wifi: false,
        cable: false,
    });

    //objeto para manejar los id de las categorias(TEMPORAL)
    const propertyCategoriesId = {
        house: 1,
        apartment: 2,
        "bare-land": 3,
        "retail-space": 4,
        studio: 5,
    };

    //objeto para manejar los id de las categorias(TEMPORAL)
    const transactionTypesId = {
        sale: 1,
        rent: 2,
        both: 3,
    };

    const { sendData, loading, error } = useFetchData();
    const toggleService = (service) => {
        setServices((prevState) => ({
            ...prevState,
            [service]: !prevState[service],
        }));
    };

    const [data, setData] = useState({});

    const handleInputChange = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    };

    // ************************************imagenes
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [...images];
        const newPreviews = [...imagePreviews];

        files.forEach((file) => {
            if (newImages.length < 6) {
                newImages.push(file); // Agrega el archivo en lugar de leerlo como URL

                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result); // Agrega la URL base64
                    setImagePreviews(newPreviews); // Actualiza el estado de previsualización
                };
                reader.readAsDataURL(file);
            }
        });
        setImages(newImages);
        event.target.value = ""; // Limpiar el input
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImagePreviews(newImages);
    };
    // ************************************

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let imageIdS = [];

        images.forEach((image) => {
            formData.append("files", image);
        });

        try {
            const response = await axios.post("upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const data = await response;

            imageIdS = response.data.map((image) => image.id);

            // console.log(imagesId)
            console.log(data);
            setImages([]);
            setImagePreviews([]);
        } catch (error) {
            console.error(
                "Error al subir archivos:",
                error.response?.data || error.message
            );
        }

        handleInputChange(
            "property_category_id",
            propertyCategoriesId[tipoPropiedad]
        );
        handleInputChange("transaction_type_id", transactionTypesId[accion]);

        if (typeof data["sale_price"] === "string") {
            data["sale_price"] = Number(data["sale_price"].replace(/,/g, ""));
        } else {
            // Si no es una cadena, asegúrate de manejar el caso (por ejemplo, puedes asignar 0 o un valor predeterminado)
            data["sale_price"] = Number(data["sale_price"]) || 0; // Cambia 0 por el valor que consideres
        }

        const payload = {
            data: {
                ...data,
                images: imageIdS,
            },
        };

        console.log(payload);

        try {
            const response = await axios.post("properties", payload);
            console.log(response.data);
            const dataResponse = await response;
            console.log(dataResponse);
            
        } catch (error) {
            console.log(error);
        }
    };

    const renderFormulario = () => {
        if (!tipoPropiedad || !accion) return null;

        const formulariosPorTipo = {
            house: (
                <HDSForm
                    accion={accion}
                    services={services}
                    toggleService={toggleService}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    fillData={handleInputChange}
                />
            ),
            apartment: (
                <HDSForm
                    accion={accion}
                    services={services}
                    toggleService={toggleService}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            ),
            studio: (
                <HDSForm
                    accion={accion}
                    services={services}
                    toggleService={toggleService}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            ),
            "bare-land": (
                <BareLandForm
                    accion={accion}
                    services={services}
                    toggleService={toggleService}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            ),

            "retail-space": (
                <RetailSpaceForm
                    accion={accion}
                    services={services}
                    toggleService={toggleService}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            ),
        };

        return formulariosPorTipo[tipoPropiedad] || null;
    };

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="mt-10 text-center sm:text-start">
                Let's add a property
            </h1>
            <div className="container mx-auto">
                {/* Filtros para tipo de propiedad */}
                <SectionDivider text="Property type" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mx-auto max-w-7xl">
                    {[
                        "house",
                        "apartment",
                        "bare-land",
                        "retail-space",
                        "studio",
                    ].map((tipo) => (
                        <MainButton
                            key={tipo}
                            onClick={() => setTipoPropiedad(tipo)}
                            type="button"
                            variant={tipoPropiedad === tipo ? "fill" : "border"}
                            customClass="capitalize"
                            text={tipo.replace("-", " ").toUpperCase()}
                        />
                    ))}
                </div>

                {/* Filtros para tipo de transaccion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="mb-10">
                        <SectionDivider text="What will you do with this property?" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mx-auto max-w-7xl">
                            {["sale", "rent", "both"].map((acc) => (
                                <MainButton
                                    key={acc}
                                    onClick={() => setAccion(acc)}
                                    type="button"
                                    variant={accion === acc ? "fill" : "border"}
                                    customClass="capitalize"
                                    text={
                                        acc.charAt(0).toUpperCase() +
                                        acc.slice(1)
                                    }
                                />
                            ))}
                        </div>
                        {/* Mostrar formulario */}
                        <form onSubmit={handleSubmit}>
                            {renderFormulario()}
                            <MainButton
                                text="Publish"
                                onClick={handleSubmit}
                                type="submit"
                                disabled={loading}
                                customClass="mt-4"
                            >
                                {loading ? "Publishing..." : "Publish Property"}
                            </MainButton>
                        </form>
                        {error && <p>Error: {error.message}</p>}
                    </div>
                    <div>
                        {/* Apartado de imagenes */}
                        <SectionDivider text="Upload an image" />
                        <div className="image-upload-container">
                            <label
                                htmlFor="file-input" // Ahora está corregido
                                className="block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer bg-secondary text-white hover:bg-light-blue hover:text-primary"
                            >
                                Add
                            </label>

                            <p>
                                Please upload an image file (JPG, PNG, or GIF).
                                Max size: 5MB.
                            </p>

                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="opacity-0"
                            />

                            <div className="grid sm:grid-cols-3">
                                {imagePreviews.map((image, index) => (
                                    <div
                                        key={index}
                                        className="flex rounded-md my-4"
                                    >
                                        <button
                                            className="m-1 p-2 sm:p-0 bg-white absolute rounded-full"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X />
                                        </button>
                                        <img
                                            className="rounded-md w-full aspect-square sm:w-40 sm:h-40"
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                        />
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
