import React, { useState } from "react";
import SectionDivider from "../../ui/SectionDivider";
import BaseFormsInfo from "../../ui/BaseFormsInfo";
import { InputForms } from "../../ui/InputForms";
import { MainButton } from "../../ui/MainButton";
import PriceDetails from "../../ui/PriceDetails";
import { useFetchData } from "../../hooks/useFetchData"; // Asegúrate de que la ruta sea correcta
import { X } from "lucide-react";

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

  // ************************************imagenes
  const [images, setImages] = useState([]);
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...images];

    files.forEach((file) => {
      if (newImages.length < 6) {
        // 6 imágenes
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          setImages(newImages);
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = "";
  };
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };
  // ************************************

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      type: tipoPropiedad,
      action: accion,
      services: Object.keys(services).filter((service) => services[service]),
    };
    try {
      const response = await sendData("/api/properties", dataToSend);
      console.log("Property created:", response);
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
              inputName="Floor"
              inputId="Floor"
              type="number"
              labelText="Floor"
            />
            <InputForms
              inputName="Pools"
              inputId="Pools"
              type="boolean"
              labelText="Pools"
            />
            <InputForms
              inputName="Pets"
              inputId="Pets"
              type="boolean"
              labelText="Pets"
            />
            <InputForms
              inputName="Backyard"
              inputId="Backyard"
              type="boolean"
              labelText="Backyard"
            />
            <InputForms
              inputName="Garage"
              inputId="Garage"
              type="boolean"
              labelText="Garage"
            />
            <InputForms
              inputName="Size"
              inputId="Size"
              type="number"
              labelText="Size"
              placeholder="Property size in square meters"
            />
          </div>
          {(accion === "rent" || accion === "both") && (
            <>
              <SectionDivider text="Include services" />
              <div className="grid grid-cols-2 gap-4 my-4">
                {["water", "electricity", "wifi", "cable"].map((service) => (
                  <MainButton
                    key={service}
                    onClick={() => toggleService(service)}
                    type="boolean"
                    variant="border"
                    isChecked={services[service]}
                    customClass="capitalize"
                    text={service.charAt(0).toUpperCase() + service.slice(1)}
                  />
                ))}
              </div>
            </>
          )}
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
              inputName="Floor"
              inputId="Floor"
              type="number"
              labelText="Floor"
            />
            <InputForms
              inputName="Pools"
              inputId="Pools"
              type="boolean"
              labelText="Pools"
            />
            <InputForms
              inputName="Pets"
              inputId="Pets"
              type="boolean"
              labelText="Pets"
            />
            <InputForms
              inputName="Backyard"
              inputId="Backyard"
              type="boolean"
              labelText="Backyard"
            />
            <InputForms
              inputName="Garage"
              inputId="Garage"
              type="boolean"
              labelText="Garage"
            />
            <InputForms
              inputName="Size"
              inputId="Size"
              type="number"
              labelText="Size"
              placeholder="Property size in square meters"
            />
          </div>
          {(accion === "rent" || accion === "both") && (
            <>
              <SectionDivider text="Include services" />
              <div className="grid grid-cols-2 gap-4 my-4">
                {["water", "electricity", "wifi", "cable"].map((service) => (
                  <MainButton
                    key={service}
                    onClick={() => toggleService(service)}
                    type="boolean"
                    variant="border"
                    isChecked={services[service]}
                    customClass="capitalize"
                    text={service.charAt(0).toUpperCase() + service.slice(1)}
                  />
                ))}
              </div>
            </>
          )}
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
              inputName="Floor"
              inputId="Floor"
              type="number"
              labelText="Floor"
            />
            <InputForms
              inputName="Pools"
              inputId="Pools"
              type="boolean"
              labelText="Pools"
            />
            <InputForms
              inputName="Pets"
              inputId="Pets"
              type="boolean"
              labelText="Pets"
            />
            <InputForms
              inputName="Backyard"
              inputId="Backyard"
              type="boolean"
              labelText="Backyard"
            />
            <InputForms
              inputName="Garage"
              inputId="Garage"
              type="boolean"
              labelText="Garage"
            />
            <InputForms
              inputName="Size"
              inputId="Size"
              type="number"
              labelText="Size"
              placeholder="Property size in square meters"
            />
          </div>

          {(accion === "rent" || accion === "both") && (
            <>
              <SectionDivider text="Include services" />
              <div className="grid grid-cols-2 gap-4 my-4">
                {["water", "electricity", "wifi", "cable"].map((service) => (
                  <MainButton
                    key={service}
                    onClick={() => toggleService(service)}
                    type="boolean"
                    variant="border"
                    isChecked={services[service]}
                    customClass="capitalize"
                    text={service.charAt(0).toUpperCase() + service.slice(1)}
                  />
                ))}
              </div>
            </>
          )}
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
      {["availableWater", "availableElectricity"].map((service) => (
        <MainButton
          key={service}
          onClick={() => toggleService(service)} // Función para manejar la selección de servicios disponibles
          type="boolean"
          variant="border"
          isChecked={services[service]} // Verifica si el servicio está habilitado
          customClass="capitalize"
          text={service.replace("available", "")} // Mostrar texto sin el prefijo 'available'
        />
      ))}
    </div>

    {/* Mostrar la sección de "Include services" solo si "availableWater" o "availableElectricity" están seleccionados */}
    {(services.availableWater || services.availableElectricity) && (
      <>
        {(accion === "rent" || accion === "both") && (
          <>
            <SectionDivider text="Include services" />
            <div className="grid grid-cols-2 gap-4 my-4">
              {services.availableWater && (
                <MainButton
                  key="water"
                  onClick={() => toggleService("water")}
                  type="boolean"
                  variant="border"
                  isChecked={services["water"]}
                  customClass="capitalize"
                  text="Water"
                />
              )}
              {services.availableElectricity && (
                <>
                  <MainButton
                    key="electricity"
                    onClick={() => toggleService("electricity")}
                    type="boolean"
                    variant="border"
                    isChecked={services["electricity"]}
                    customClass="capitalize"
                    text="Electricity"
                  />
                  <MainButton
                    key="wifi"
                    onClick={() => toggleService("wifi")}
                    type="boolean"
                    variant="border"
                    isChecked={services["wifi"]}
                    customClass="capitalize"
                    text="WiFi"
                  />
                  <MainButton
                    key="cable"
                    onClick={() => toggleService("cable")}
                    type="boolean"
                    variant="border"
                    isChecked={services["cable"]}
                    customClass="capitalize"
                    text="Cable"
                  />
                </>
              )}
            </div>
          </>
        )}
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
          {(accion === "rent" || accion === "both") && (
            <>
              <SectionDivider text="Include services" />
              <div className="grid grid-cols-2 gap-4 my-4">
                {["water", "electricity", "wifi", "cable"].map((service) => (
                  <MainButton
                    key={service}
                    onClick={() => toggleService(service)}
                    type="boolean"
                    variant="border"
                    isChecked={services[service]}
                    customClass="capitalize"
                    text={service.charAt(0).toUpperCase() + service.slice(1)}
                  />
                ))}
              </div>
            </>
          )}
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

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <h1 className="mt-10 text-center sm:text-start">Let's add a property</h1>
      <div className="container mx-auto">
        <SectionDivider text="Property type" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mx-auto max-w-7xl">
          {["house", "department", "bare-land", "retail-space", "studio"].map(
            (tipo) => (
              <MainButton
                key={tipo}
                onClick={() => setTipoPropiedad(tipo)}
                type="button"
                variant={tipoPropiedad === tipo ? "fill" : "border"}
                customClass="capitalize"
                text={tipo.replace("-", " ").toUpperCase()}
              />
            )
          )}
        </div>
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
                  text={acc.charAt(0).toUpperCase() + acc.slice(1)}
                />
              ))}
            </div>
            {renderFormulario()}
            {error && <p>Error: {error.message}</p>}
          </div>
          <div>
            <SectionDivider text="Upload an image" />
            <div className="image-upload-container">
              <label
                for="file-input"
                class="block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer bg-secondary text-white hover:bg-light-blue hover:text-primary"
              >
                Add
              </label>
              <p>
                Please upload an image file (JPG, PNG, or GIF). Max size: 5MB.{" "}
              </p>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                class="opacity-0"
              />

              <div className="grid sm:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="flex rounded-md my-4 ">
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
