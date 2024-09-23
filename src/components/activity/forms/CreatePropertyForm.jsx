import React, { useState } from "react";
import SectionDivider from "../../ui/SectionDivider";
import { MainButton } from "../../ui/MainButton";
import { useFetchData } from "../../hooks/useFetchData";
import HDSForm from './HDSForm';
import BareLandForm from './BareLandForm';
import RetailSpaceForm from './RetailSpaceForm';
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
        <HDSForm
        accion={accion}
        services={services}
        toggleService={toggleService}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      ),
      department: (
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
                htmlFor="file-input" // Ahora está corregido
                className="block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer bg-secondary text-white hover:bg-light-blue hover:text-primary"
              >
                Add
              </label>

              <p>
                Please upload an image file (JPG, PNG, or GIF). Max size: 5MB.
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
                {images.map((image, index) => (
                  <div key={index} className="flex rounded-md my-4">
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
