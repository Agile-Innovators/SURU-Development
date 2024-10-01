import { X, House, Hotel, Warehouse, Store, Fence } from "lucide-react";
import React, { useState, useEffect } from "react";
import SectionDivider from "../../ui/layout/SectionDivider";
import { MainButton } from "../../ui/buttons/MainButton";
import { useFetchData } from "../../hooks/useFetchData";
import { IconTextButton } from "../../ui/buttons/IconTextButton";
import HDSForm from "./HDSForm";
import BareLandForm from "./BareLandForm";
import RetailSpaceForm from "./RetailSpaceForm";
import { useAxios } from "../../hooks/useAxios";

const CreatePropertyForm = () => {
  const axios = useAxios();
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [accion, setAccion] = useState(null);

  const [services, setServices] = useState({
    availableWater: false,
    water: false,
    availableElectricity: false,
    electricity: false,
    wifi: false,
    cable: false,
  });

  const propertyCategoriesId = {
    house: 1,
    apartment: 2,
    "bare-land": 3,
    "retail-space": 4,
    studio: 5,
  };

  const transactionTypesId = {
    sale: 1,
    rent: 2,
    both: 3,
  };

  const { sendData, loading, error } = useFetchData();

  const toggleService = (service) => {
    setServices((prevState) => {
      const newState = { ...prevState, [service]: !prevState[service] };
      console.log(
        `toggleService called for service: "${service}", new state: ${newState[service]}`
      );

      if (service === "availableWater" && !newState.availableWater) {
        newState.water = false;
        handleInputChange("water", false);
        console.log(
          `Available service 'availableWater' deactivated, removing 'water' from data`
        );
      }

      if (
        service === "availableElectricity" &&
        !newState.availableElectricity
      ) {
        newState.electricity = false;
        newState.wifi = false;
        newState.cable = false;
        handleInputChange("electricity", false);
        handleInputChange("wifi", false);
        handleInputChange("cable", false);
        console.log(
          `Available service 'availableElectricity' deactivated, removing 'electricity', 'wifi', 'cable' from data`
        );
      }

      return newState;
    });
  };

  const [data, setData] = useState({});

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

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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
    // Agregar imágenes al estado 'data'
    handleInputChange("images", newImages); // Aquí se añade
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

    // Verificar el estado de `data` antes de actualizarlo
    console.log("Estado actual de 'data':", data);

    // Actualizar el objeto `data` con los IDs correctos según el tipo de propiedad y transacción
    const updatedData = {
        ...data,
        property_category_id: propertyCategoriesId[tipoPropiedad], // Obtenemos el ID correspondiente
        transaction_type_id: transactionTypesId[accion], // Obtenemos el ID de transacción
    };

    // Mostrar los datos actualizados en la consola antes de enviarlos
    console.log("Datos actualizados a enviar:", updatedData);

    // Preparar el objeto FormData para subir las imágenes
    const formData = new FormData();
    let imageIdS = [];

    // Añadir las imágenes al FormData
    images.forEach((image) => {
        formData.append("files", image);
    });

    // Realizar la subida de imágenes
    try {
        const response = await axios.post("upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Obtener los IDs de las imágenes subidas
        imageIdS = response.data.map((image) => image.id);

        // Limpiar el estado de imágenes y vistas previas tras la subida exitosa
        setImages([]);
        setImagePreviews([]);

        // Mostrar los IDs de las imágenes subidas en la consola
        console.log("IDs de las imágenes subidas:", imageIdS);

    } catch (error) {
        // Manejo de errores durante la subida de imágenes
        console.error("Error al subir archivos:", error.response?.data || error.message);
        return; // Detener la ejecución si hay un error en la subida de imágenes
    }

    // Preparar el objeto final que será enviado junto con los IDs de las imágenes
    const finalData = {
        ...updatedData,
        images: imageIdS, // Incluir los IDs de las imágenes subidas
    };

    // Mostrar los datos finales en la consola antes de enviarlos
    console.log("Datos finales que serán enviados:", finalData);

    // Enviar los datos usando Axios
    try {
        const result = await axios.post("tu-endpoint-para-enviar-datos", finalData, {
            headers: {
                "Authorization": `Bearer ${token}`, // Si usas autenticación, añade el token aquí
            },
        });

        // Mostrar la respuesta del servidor
        console.log("Datos enviados con éxito:", result.data);

    } catch (error) {
        // Manejo de errores durante el envío de datos
        console.error("Error al enviar datos:", error.response?.data || error.message);
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
          fillData={handleInputChange}
        />
      ),
      apartment: (
        <HDSForm
          accion={accion}
          services={services}
          toggleService={toggleService}
          fillData={handleInputChange}
        />
      ),
      studio: (
        <HDSForm
          accion={accion}
          services={services}
          toggleService={toggleService}
          fillData={handleInputChange}
        />
      ),
      "bare-land": (
        <BareLandForm
          accion={accion}
          services={services}
          toggleService={toggleService}
          fillData={handleInputChange}
        />
      ),
      "retail-space": (
        <RetailSpaceForm
          accion={accion}
          services={services}
          toggleService={toggleService}
          fillData={handleInputChange}
        />
      ),
    };

    return formulariosPorTipo[tipoPropiedad] || null;
  };

  const propertyIcons = {
    house: <House size={20} />,
    apartment: <Hotel size={20} />,
    "bare-land": <Fence size={20} />,
    "retail-space": <Store size={20} />,
    studio: <Warehouse size={20} />,
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <h1 className="mt-10 text-center sm:text-start">Let's add a property</h1>
      <div className="container mx-auto">
        <SectionDivider text="Property type" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mx-auto max-w-7xl">
          {["house", "apartment", "bare-land", "retail-space", "studio"].map(
            (tipo) => (
              <IconTextButton
                key={tipo}
                onClick={() => setTipoPropiedad(tipo)}
                type="button"
                variant={tipoPropiedad === tipo ? "fill" : "border"}
                customClass="capitalize"
                text={tipo.replace("-", " ").toUpperCase()}
                icon={propertyIcons[tipo]}
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
            {/* Formulario de publicación */}
            <form onSubmit={handleSubmit}>
              {renderFormulario()}
              <MainButton
                text="Publish"
                type="submit"
                variant="fill"
                disabled={loading}
                customClass="mt-4"
              >
                {loading ? "Publishing..." : "Publish Property"}
              </MainButton>
            </form>
            {error && <p>Error: {error.message}</p>}
          </div>

          <div>
            <SectionDivider text="Upload an image" />
            <div className="image-upload-container">
              <label
                htmlFor="file-input"
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
