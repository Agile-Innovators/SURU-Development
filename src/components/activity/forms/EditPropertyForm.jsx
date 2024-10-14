// src/components/activity/forms/EditPropertyForm.jsx

import { X, House, Hotel, Warehouse, Store, Fence } from 'lucide-react';
import { useState, useContext, useEffect, useCallback } from 'react';
import SectionDivider from '../../ui/layout/SectionDivider';
import { MainButton } from '../../ui/buttons/MainButton';
import HDSForm from './HDSForm.jsx';
import RetailSpaceForm from './RetailSpaceForm';
import { useAxios } from '../../hooks/useAxios';
import { useFetchProperties } from '../../hooks/useFetchProperties';
import { MainFilterTag } from '../../ui/buttons/MainFilterTag';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';
import { BareLandForm } from './BareLandForm';
import { globalProvider } from '../../../global/GlobalProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { BackButton } from '../../ui/buttons/BackButton';

const EditPropertyForm = () => {
    const { id } = useParams(); // Obtener el ID de la propiedad desde los params
    const { properties, isLoadingProps } = useFetchProperties();
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { setPropTypeForm, setPropTransacTypeForm } = useContext(globalProvider);
    const [images, setImages] = useState([]); // Nuevas imágenes
    const [newImagePreviews, setNewImagePreviews] = useState([]); // Previews de nuevas imágenes
    const [existing_images_id, setExistingImagesId] = useState([]); // IDs de imágenes existentes
    const [existingImagePreviews, setExistingImagePreviews] = useState([]); // Previews de imágenes existentes
    const [data, setData] = useState({});
    const [utilities, setUtilities] = useState([]);
    const [filterPropType, setFilterPropType] = useState(1);
    const [filterPropTransaction, setFilterPropTransaction] = useState(1);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const axios = useAxios();

    // Establecer el ID de usuario desde localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUserId(userData.id);
            console.log('User ID set to:', userData.id); // Depuración
        }
    }, []);

    // Manejar el límite de imágenes
    useEffect(() => {
        const maxImages = 6;
        const totalImages = existing_images_id.length + images.length;
        if (totalImages > maxImages) {
            toast.error(`You can only upload up to ${maxImages} images in total`);
            const allowedNewImages = maxImages - existing_images_id.length;
            setImages(images.slice(0, allowedNewImages));
            setNewImagePreviews(newImagePreviews.slice(0, allowedNewImages));
        }
    }, [images, existing_images_id.length, newImagePreviews]);

    // Función para poblar el formulario con los datos de la propiedad
    const populateForm = useCallback((property) => {
        console.log('Populating form with property:', property); // Depuración
        const initialType = property.property_category_id || 1; // Valor por defecto
        const initialTransaction = property.property_transaction_type_id || 1; // Valor por defecto

        setFilterPropType(initialType);
        setPropTypeForm(initialType);

        setFilterPropTransaction(initialTransaction);
        setPropTransacTypeForm(initialTransaction);

        setData({
            ...property,
            city_id: property.city_id || '', // Asegúrate de que city_id esté en el objeto de propiedad
        });
        setUtilities(property.utilities || []);

        // Manejar imágenes existentes
        if (property.images && property.images.length > 0) {
            const existingPreviews = property.images.map((img) => img.url); // Ajusta según tu estructura de imágenes
            const existingIds = property.images.map((img) => img.id);
            setExistingImagePreviews(existingPreviews);
            setExistingImagesId(existingIds);
            setImages([]); // Limpiar nuevas imágenes
            setNewImagePreviews([]); // Limpiar previews de nuevas imágenes
        }

        // Manejar campos que pueden ser nulos
        if (property.furnished === undefined) {
            setData((prevData) => ({ ...prevData, furnished: 0 }));
        }
        if (property.services === undefined) {
            setData((prevData) => ({ ...prevData, services: [] }));
        }

        console.log('Data state set to:', property); // Depuración
    }, [setPropTypeForm, setPropTransacTypeForm]);

    // Población del formulario con los datos de la propiedad seleccionada
    useEffect(() => {
        if (!isLoadingProps && properties.length > 0) {
            const propertyToEdit = properties.find(
                (prop) => prop.id === parseInt(id, 10)
            );
            if (propertyToEdit) {
                setSelectedProperty(propertyToEdit);
                populateForm(propertyToEdit); // Ahora memoizado
            } else {
                toast.error('Property not found');
                navigate(ROUTE_PATHS.PROPERTY_MANAGEMENT);
            }
        }
    }, [isLoadingProps, properties, id, navigate, populateForm]);

    // Memoizar las funciones para evitar cambios en sus referencias
    const handleFilterPropType = useCallback(
        (filterId) => {
            setFilterPropType(filterId);
            setPropTypeForm(filterId);
            setData({});
            setUtilities([]);
        },
        [setPropTypeForm]
    );

    const handleFilterPropTransaction = useCallback(
        (id) => {
            setFilterPropTransaction(id);
            setPropTransacTypeForm(id);
            setData({});
            setUtilities([]);
        },
        [setPropTransacTypeForm]
    );

    const clearData = useCallback(() => {
        setData({});
    }, []);

    const handleUtilitiesData = useCallback((value, method) => {
        console.log(`Handling utility: ${value}, method: ${method}`); // Depuración
        if (method === 'remove') {
            setUtilities((prevUtilities) =>
                prevUtilities.filter((utility) => utility !== value)
            );
        } else {
            setUtilities((prevUtilities) => [...prevUtilities, value]);
        }
    }, []);

    const handleInputChange = useCallback((key, value) => {
        console.log(`Updating key: ${key} with value: ${value}`); // Depuración
        setData((prevData) => {
            let updatedData = { ...prevData, [key]: value };
            if (value === '' || value === null || value === undefined) {
                const { [key]: removed, ...rest } = updatedData;
                updatedData = rest;
            }
            return updatedData;
        });
    }, []);

    // Verificar cambios en data
    useEffect(() => {
        console.log('Current data state:', data); // Depuración
    }, [data]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [...images];
        const newPreviews = [...newImagePreviews];

        // Verificar el límite total de imágenes (existentes + nuevas)
        const maxImages = 6;
        const totalImages = existing_images_id.length + newImages.length + files.length;
        if (totalImages > maxImages) {
            toast.error(`You can only upload up to ${maxImages} images in total`);
            const allowedNewImages = maxImages - existing_images_id.length - newImages.length;
            const allowedFiles = files.slice(0, allowedNewImages);
            allowedFiles.forEach((file) => {
                newImages.push(file);
                console.log("Image uploaded:", file.name);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
                };
                reader.readAsDataURL(file);
            });
            setImages(newImages);
            event.target.value = '';
            return;
        }

        files.forEach((file) => {
            if (newImages.length < maxImages - existing_images_id.length) {
                newImages.push(file);
                console.log("Image uploaded:", file.name);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
                };
                reader.readAsDataURL(file);
            }
        });

        setImages(newImages);
        event.target.value = '';
    };

    const removeImage = (index, type) => {
        if (type === 'existing') {
            // Eliminar de existing_images_id y existingImagePreviews
            const updatedExistingPreviews = existingImagePreviews.filter((_, i) => i !== index);
            const updatedExistingIds = existing_images_id.filter((_, i) => i !== index);
            setExistingImagePreviews(updatedExistingPreviews);
            setExistingImagesId(updatedExistingIds);
        } else if (type === 'new') {
            // Eliminar de images y newImagePreviews
            const updatedNewPreviews = newImagePreviews.filter((_, i) => i !== index);
            const updatedNewImages = images.filter((_, i) => i !== index);
            setNewImagePreviews(updatedNewPreviews);
            setImages(updatedNewImages);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar el número mínimo de imágenes (existentes + nuevas)
        if ((existing_images_id.length + images.length) < 3) {
            toast.error("You must have at least 3 images in total");
            return;
        }

        // Crear un objeto final con todos los datos necesarios
        const finalData = {
            availability_date: data.availability_date || '',
            city_id: data.city_id || '',
            currency_id: data.currency_id || '',
            description: data.description || '',
            property_category_id: filterPropType,
            property_transaction_type_id: filterPropTransaction,
            user_id: userId,
            size_in_m2: data.size_in_m2 || '',
            title: data.title || '',
            price: data.price || null,
            rent_price: data.rent_price || null,
            deposit_price: data.deposit_price || null,
            bedrooms: data.bedrooms || null,
            bathrooms: data.bathrooms || null,
            floors: data.floors || null,
            garages: data.garages || null,
            pools: data.pools || null,
            pets_allowed: data.pets_allowed || false,
            green_area: data.green_area || false,
            payment_frequency_id: data.payment_frequency_id || null,
        };

        // Mostrar el objeto finalData en la consola para depuración
        console.log('Final Data to submit:', finalData);

        const formData = new FormData();

        // Añadir imagenes al FormData
        images.forEach((image) => {
            formData.append('images[]', image);
        });
      
        // Añadir IDs de imágenes existentes al FormData
        existing_images_id.forEach((id) => {
            formData.append('existing_images_id[]', id);
        });

        // Llenar el formData con los datos de finalData
        Object.entries(finalData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach(item => formData.append(`${key}[]`, item));
                } else {
                    formData.append(key, value);
                }
            }
        });

        // Añadir utilidades al FormData
        utilities.forEach((utility) => {
            formData.append('utilities[]', utility);
        });

        // Mostrar los pares clave-valor de FormData para depuración
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await axios.put(`/properties/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Manejar la respuesta correctamente
            if (response.status === 200) {
                toast.success('Property updated successfully'); // Mensaje de éxito
                navigate(ROUTE_PATHS.PROPERTY_MANAGEMENT);
            } else {
                toast.error('Error updating property');
            }
        } catch (error) {
            // Manejar errores más detalladamente
            console.error('Update error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                // Mostrar errores de validación específicos
                Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                    messages.forEach(message => {
                        toast.error(`${field}: ${message}`);
                    });
                });
            } else {
                toast.error('An error occurred while updating the property');
            }
        }
    };

    const renderFormulario = () => {
        if (!filterPropType || !filterPropTransaction) return null;

        const formulariosPorTipo = {
            1: (
                <HDSForm
                    title={'House details'}
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    initialData={data} // Pasar initialData
                />
            ),
            2: (
                <HDSForm
                    title={'Apartment details'}
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    initialData={data}
                />
            ),
            3: (
                <HDSForm
                    title={'Studio details'}
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    initialData={data}
                />
            ),
            4: (
                <BareLandForm
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    initialData={data}
                />
            ),
            5: (
                <RetailSpaceForm
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    initialData={data}
                />
            ),
        };
        return formulariosPorTipo[filterPropType] || null;
    };

    if (isLoadingProps) {
        return <div>Loading...</div>;
    }

    if (!selectedProperty) {
        return <div>Property not found.</div>;
    }

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ToastContainer
                position="top-center"
                autoClose={900}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <section className="mt-10 flex flex-col sm:flex-row gap-4">
                <BackButton />
                <h1 className="text-center sm:text-start">Edit Property</h1>
            </section>
            <div className="container mx-auto">
                <SectionDivider text="Property type" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mx-auto max-w-7xl">
                    <MainFilterTag
                        text={'House'}
                        icon={<House size={20} />}
                        isActivate={filterPropType === 1}
                        handleActivateButton={() => handleFilterPropType(1)}
                    />
                    <MainFilterTag
                        text={'Apartment'}
                        icon={<Hotel size={20} />}
                        isActivate={filterPropType === 2}
                        handleActivateButton={() => handleFilterPropType(2)}
                    />
                    <MainFilterTag
                        text={'Studio'}
                        icon={<Warehouse size={20} />}
                        isActivate={filterPropType === 3}
                        handleActivateButton={() => handleFilterPropType(3)}
                    />
                    <MainFilterTag
                        text={'Bare land'}
                        icon={<Fence size={20} />}
                        isActivate={filterPropType === 4}
                        handleActivateButton={() => handleFilterPropType(4)}
                    />
                    <MainFilterTag
                        text={'Retail space'}
                        icon={<Store size={20} />}
                        isActivate={filterPropType === 5}
                        handleActivateButton={() => handleFilterPropType(5)}
                    />
                </div>

                <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-8">
                    <div className="mb-10">
                        <SectionDivider text="What will you do with this property?" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mx-auto max-w-7xl">
                            <SecondaryFilterTag
                                text={'Sale'}
                                isActivate={filterPropTransaction === 1}
                                handleSelectedValue={handleFilterPropTransaction}
                                groupType={'group'}
                                idValue={1}
                            />
                            <SecondaryFilterTag
                                text={'Rent'}
                                isActivate={filterPropTransaction === 2}
                                handleSelectedValue={handleFilterPropTransaction}
                                groupType={'group'}
                                idValue={2}
                            />
                            <SecondaryFilterTag
                                text={'Both'}
                                isActivate={filterPropTransaction === 3}
                                handleSelectedValue={handleFilterPropTransaction}
                                groupType={'group'}
                                idValue={3}
                            />
                        </div>
                        {/* Formulario de publicación */}
                        <form onSubmit={handleSubmit}>
                            {renderFormulario()}
                            <MainButton
                                text="Update Property"
                                type="submit"
                                variant="fill"
                                disabled={false} // Puedes gestionar el estado de loading si lo deseas
                                customClass="mt-4 w-full"
                            />
                        </form>
                    </div>

                    <div>
                        <SectionDivider text="Upload at least 3 images" />
                        <div className="image-upload-container">
                            <label
                                htmlFor="file-input"
                                className="block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer bg-secondary text-white hover:bg-light-blue hover:text-primary"
                            >
                                Add
                            </label>

                            <p>
                                Please upload an image file (JPG, JPEG, PNG, or
                                WEBP). Max size: 5MB.
                            </p>

                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                multiple
                            />
                            <div className="image-preview-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
                                {/* Imágenes existentes */}
                                {existingImagePreviews.map((image, index) => (
                                    <div key={`existing-${index}`} className="relative">
                                        <img
                                            src={image}
                                            alt={`Existing Preview ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-md mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index, 'existing')}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}

                                {/* Nuevas imágenes */}
                                {newImagePreviews.map((image, index) => (
                                    <div key={`new-${index}`} className="relative">
                                        <img
                                            src={image}
                                            alt={`New Preview ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-md mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index, 'new')}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
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

export default EditPropertyForm;
