import React, { useState } from "react";
import SectionDivider from "../../ui/SectionDivider";
import BaseFormsInfo from "../../ui/BaseFormsInfo";
import { InputForms } from "../../ui/InputForms";
import { MainButton } from "../../ui/MainButton";
import PriceDetails from "../../ui/PriceDetails";
import { useFetchData } from "../../hooks/useFetchData"; // Asegúrate de que la ruta sea correcta

const CreatePropertyForm = () => {
    const [tipoPropiedad, setTipoPropiedad] = useState(null);
    const [accion, setAccion] = useState(null);
    const [services, setServices] = useState({
        water: false,
        electricity: false,
        wifi: false,
        cable: false,
    });

    const { sendData, loading, error } = useFetchData();

    const toggleService = (service) => {
        setServices((prevState) => ({
            ...prevState,
            [service]: !prevState[service],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            type: tipoPropiedad,
            action: accion,
            services: Object.keys(services).filter(
                (service) => services[service]
            ),
        };
        try {
            const response = await sendData("properties", dataToSend);
            const data = await response;
            console.log("Property created:", data);
        } catch (err) {
            console.error("Error creating property:", err);
        }
    };

    const renderFormulario = () => {
        if (!tipoPropiedad || !accion) return null;

        const formulariosPorTipo = {
            house: (
                <form onSubmit={handleSubmit}>
                    <SectionDivider text="House details" />
                    <BaseFormsInfo />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms
                            inputName="bedrooms"
                            inputId="bedrooms"
                            type="number"
                            labelText="Bedrooms"
                        />
                        <InputForms
                            inputName="bathrooms"
                            inputId="bathrooms"
                            type="number"
                            labelText="Bathrooms"
                        />
                        <InputForms
                            inputName="size"
                            inputId="size"
                            type="number"
                            labelText="Size"
                            placeholder="Property size in square meters"
                        />
                    </div>
                    <SectionDivider text="Include services" />
                    <div className="flex space-x-2">
                        {["water", "electricity", "wifi", "cable"].map(
                            (service) => (
                                <MainButton
                                    key={service}
                                    onClick={() => toggleService(service)}
                                    type="boolean"
                                    variant="border"
                                    isChecked={services[service]}
                                    customClass="capitalize"
                                    text={
                                        service.charAt(0).toUpperCase() +
                                        service.slice(1)
                                    }
                                />
                            )
                        )}
                    </div>
                    {accion === "sale" && <PriceDetails type="Sale" />}
                    {accion === "rent" && <PriceDetails type="Rent" />}
                    {accion === "both" && <PriceDetails type="Both" />}
                    <MainButton
                        text="Publish"
                        onClick={handleSubmit}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish Property"}
                    </MainButton>
                </form>
            ),
            department: (
                <form onSubmit={handleSubmit}>
                    <SectionDivider text="Department details" />
                    <BaseFormsInfo />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms
                            inputName="bedrooms"
                            inputId="bedrooms"
                            type="number"
                            labelText="Bedrooms"
                        />
                        <InputForms
                            inputName="bathrooms"
                            inputId="bathrooms"
                            type="number"
                            labelText="Bathrooms"
                        />
                        <InputForms
                            inputName="size"
                            inputId="size"
                            type="number"
                            labelText="Size"
                            placeholder="Property size in square meters"
                        />
                    </div>
                    <SectionDivider text="Include services" />
                    <div className="flex space-x-2">
                        {["water", "electricity", "wifi", "cable"].map(
                            (service) => (
                                <MainButton
                                    key={service}
                                    onClick={() => toggleService(service)}
                                    type="boolean"
                                    variant="border"
                                    isChecked={services[service]}
                                    customClass="capitalize"
                                    text={
                                        service.charAt(0).toUpperCase() +
                                        service.slice(1)
                                    }
                                />
                            )
                        )}
                    </div>
                    {accion === "sale" && <PriceDetails type="Sale" />}
                    {accion === "rent" && <PriceDetails type="Rent" />}
                    {accion === "both" && <PriceDetails type="Both" />}
                    <MainButton
                        text="Publish"
                        onClick={handleSubmit}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish Property"}
                    </MainButton>
                </form>
            ),
            studio: (
                <form onSubmit={handleSubmit}>
                    <SectionDivider text="Studio details" />
                    <BaseFormsInfo />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms
                            inputName="size"
                            inputId="size"
                            type="number"
                            labelText="Size"
                            placeholder="Property size in square meters"
                        />
                    </div>
                    <SectionDivider text="Include services" />
                    <div className="flex space-x-2">
                        {["water", "electricity", "wifi", "cable"].map(
                            (service) => (
                                <MainButton
                                    key={service}
                                    onClick={() => toggleService(service)}
                                    type="boolean"
                                    variant="border"
                                    isChecked={services[service]}
                                    customClass="capitalize"
                                    text={
                                        service.charAt(0).toUpperCase() +
                                        service.slice(1)
                                    }
                                />
                            )
                        )}
                    </div>
                    {accion === "sale" && <PriceDetails type="Sale" />}
                    {accion === "rent" && <PriceDetails type="Rent" />}
                    {accion === "both" && <PriceDetails type="Both" />}
                    <MainButton
                        text="Publish"
                        onClick={handleSubmit}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish Property"}
                    </MainButton>
                </form>
            ),
            "bare-land": (
                <form onSubmit={handleSubmit}>
                    {/* Sección de detalles del terreno */}
                    <SectionDivider text="Bare Land details" />
                    <BaseFormsInfo />

                    {/* Input para el tamaño de la propiedad */}
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms
                            inputName="size"
                            inputId="size"
                            type="number"
                            labelText="Size"
                            placeholder="Property size in square meters"
                        />
                    </div>

                    {/* Servicios disponibles */}
                    <SectionDivider text="Available services" />
                    <div className="flex space-x-2">
                        {["availableWater", "availableElectricity"].map(
                            (service) => (
                                <MainButton
                                    key={service}
                                    onClick={() => toggleService(service)} // Función para manejar la selección de servicios disponibles
                                    type="boolean"
                                    variant="border"
                                    isChecked={services[service]} // Verifica si el servicio está habilitado
                                    customClass="capitalize"
                                    text={service.replace("available", "")} // Mostrar texto sin el prefijo 'available'
                                />
                            )
                        )}
                    </div>

                    {/* Mostrar la sección de "Include services" solo si "availableWater" o "availableElectricity" están seleccionados */}
                    {(services.availableWater ||
                        services.availableElectricity) && (
                        <>
                            <SectionDivider text="Include services" />
                            <div className="flex space-x-2">
                                {[
                                    "includeWater",
                                    "includeElectricity",
                                    "includeWifi",
                                    "includeCable",
                                ].map((service) => (
                                    <MainButton
                                        key={service}
                                        onClick={() => toggleService(service)} // Función para manejar la selección de servicios a incluir
                                        type="boolean"
                                        variant="border"
                                        isChecked={services[service]} // Verifica si el servicio está habilitado
                                        customClass="capitalize"
                                        text={service.replace("include", "")} // Mostrar texto sin el prefijo 'include'
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Mostrar secciones de precios según la acción seleccionada */}
                    {accion === "sale" && <PriceDetails type="Sale" />}
                    {accion === "rent" && <PriceDetails type="Rent" />}
                    {accion === "both" && <PriceDetails type="Both" />}

                    {/* Botón para publicar */}
                    <MainButton
                        text="Publish"
                        onClick={handleSubmit}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish Property"}
                    </MainButton>
                </form>
            ),

            "retail-space": (
                <form onSubmit={handleSubmit}>
                    <SectionDivider text="Retail Space details" />
                    <BaseFormsInfo />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms
                            inputName="size"
                            inputId="size"
                            type="number"
                            labelText="Size"
                            placeholder="Property size in square meters"
                        />
                        <InputForms
                            inputName="bathrooms"
                            inputId="bathrooms"
                            type="number"
                            labelText="Bathrooms"
                        />
                    </div>
                    <SectionDivider text="Include services" />
                    <div className="flex space-x-2">
                        {["water", "electricity", "wifi", "cable"].map(
                            (service) => (
                                <MainButton
                                    key={service}
                                    onClick={() => toggleService(service)}
                                    type="boolean"
                                    variant="border"
                                    isChecked={services[service]}
                                    customClass="capitalize"
                                    text={
                                        service.charAt(0).toUpperCase() +
                                        service.slice(1)
                                    }
                                />
                            )
                        )}
                    </div>
                    {accion === "sale" && <PriceDetails type="Sale" />}
                    {accion === "rent" && <PriceDetails type="Rent" />}
                    {accion === "both" && <PriceDetails type="Both" />}
                    <MainButton
                        text="Publish"
                        onClick={handleSubmit}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish Property"}
                    </MainButton>
                </form>
            ),
        };

        return formulariosPorTipo[tipoPropiedad] || null;
    };

    return (
        <div className="max-w-7xl m-auto">
            <h1 className="mt-10">Let's add a property</h1>
            <div className="container mx-auto">
                <SectionDivider text="Property type" />
                <div className="mb-4 flex space-x-2">
                    {[
                        "house",
                        "department",
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
                <SectionDivider text="What will you do with this property?" />
                <div className="mb-4 flex space-x-2">
                    {["sale", "rent", "both"].map((acc) => (
                        <MainButton
                            key={acc}
                            onClick={() => setAccion(acc)}
                            type="button"
                            variant={accion === acc ? "fill" : "border"}
                            customClass="capitalize"
                            text={acc.charAt(0).toUpperCase() + acc.slice(1)}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-10">{renderFormulario()}</div>
                </div>
                {error && <p>Error: {error.message}</p>}
            </div>
        </div>
    );
};

export default CreatePropertyForm;
