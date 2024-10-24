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
import { BareLandForm } from './BareLandForm.jsx';
import { globalProvider } from '../../../global/GlobalProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { BackButton } from '../../ui/buttons/BackButton';

const MAX_IMAGES = 6; // Número máximo de imágenes permitidas
const MIN_IMAGES = 3; // Número mínimo de imágenes requeridas

const EditPropertyForm = () => {
    const { id } = useParams(); // Obtiene el ID de la propiedad de la URL
    const { properties, isLoadingProps } = useFetchProperties(); // Obtiene las propiedades y su estado de carga
    const [selectedProperty, setSelectedProperty] = useState(null); // Propiedad seleccionada para editar
    const { setPropTypeForm, setPropTransacTypeForm } = useContext(globalProvider); // Actualiza el estado global de la categoría y tipo de transacción
    const [images, setImages] = useState([]); // Nuevas imágenes a subir
    const [newImagePreviews, setNewImagePreviews] = useState([]); // Previews de las nuevas imágenes
    const [existingImagesId, setExistingImagesId] = useState([]); // IDs de las imágenes existentes
    const [existingImagePreviews, setExistingImagePreviews] = useState([]); // Previews de las imágenes existentes
    const [data, setData] = useState({}); // Datos del formulario de la propiedad
    const [utilities, setUtilities] = useState([]); // Utilidades seleccionadas para la propiedad
    const [filterPropType, setFilterPropType] = useState(1); // Filtro de tipo de propiedad
    const [filterPropTransaction, setFilterPropTransaction] = useState(1); // Filtro de tipo de transacción
    const [userId, setUserId] = useState(null); // ID del usuario actual
    const navigate = useNavigate();
    const axios = useAxios(); // Hook personalizado para usar Axios

    // Obtiene el usuario del localStorage y guarda su ID
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserId(storedUser.id);
        }
    }, []);

    // Verifica el límite de imágenes permitidas
    const checkImageLimits = () => {
        const totalImages = existingImagesId.length + images.length;
        if (totalImages > MAX_IMAGES) {
            const allowedNewImages = MAX_IMAGES - existingImagesId.length;
            toast.error(`You can only upload up to ${MAX_IMAGES} images in total`);
            setImages(images.slice(0, allowedNewImages));
            setNewImagePreviews(newImagePreviews.slice(0, allowedNewImages));
        }
    };

    // Ejecuta la verificación del límite de imágenes cada vez que cambian las imágenes
    useEffect(checkImageLimits, [images, existingImagesId.length, newImagePreviews]);

    // Pobla el formulario con los datos de la propiedad seleccionada
    const populateForm = useCallback((property) => {
        const initialType = property.property_category_id || 1;
        const initialTransaction = property.property_transaction_id || 1;

        setFilterPropType(initialType);
        setPropTypeForm(initialType);
        setFilterPropTransaction(initialTransaction);
        setPropTransacTypeForm(initialTransaction);

        setData({
            ...property,
            city_id: property.city_id || '',
        });

        setUtilities(property.utilities || []);
        populateImages(property.images);
    }, [setPropTypeForm, setPropTransacTypeForm]);

    // Población de las imágenes existentes de la propiedad
    const populateImages = (images) => {
        if (images && images.length > 0) {
            const existingPreviews = images.map((img) => img.url);
            const existingIds = images.map((img) => img.id);
            setExistingImagePreviews(existingPreviews);
            setExistingImagesId(existingIds);
            resetNewImages();
        }
    };

    // Resetea las imágenes nuevas cargadas
    const resetNewImages = () => {
        setImages([]);
        setNewImagePreviews([]);
    };

    // Carga la propiedad a editar cuando termina la carga de propiedades
    useEffect(() => {
        if (!isLoadingProps && properties.length > 0) {
            const propertyToEdit = properties.find((prop) => prop.id === parseInt(id, 10));
            if (propertyToEdit) {
                console.log('Property utilities:', propertyToEdit.utilities); // Debug
                setSelectedProperty(propertyToEdit);
                populateForm(propertyToEdit);
            } else {
                toast.error('Property not found');
                navigate(ROUTE_PATHS.PROPERTY_MANAGEMENT);
            }
        }
    }, [isLoadingProps, properties, id, navigate, populateForm]);

    // Maneja la selección del tipo de propiedad
    const handleFilterPropType = useCallback((filterId) => {
        setFilterPropType(filterId);
        setPropTypeForm(filterId);
        resetFormData();
    }, [setPropTypeForm]);

    // Maneja la selección del tipo de transacción
    const handleFilterPropTransaction = useCallback((id) => {
        setFilterPropTransaction(id);
        setPropTransacTypeForm(id);
        resetFormData();
    }, [setPropTransacTypeForm]);

    // Restablece los datos del formulario
    const resetFormData = () => {
        setData({});
        setUtilities([]);
    };

    // Maneja la selección y eliminación de utilidades
    const handleUtilitiesData = (value, method) => {
        if (method === 'remove') {
            setUtilities((prevUtilities) => prevUtilities.filter((utility) => utility !== value));
        } else {
            setUtilities((prevUtilities) => [...prevUtilities, value]);
        }
    };

    // Actualiza los datos del formulario en tiempo real
    const handleInputChange = useCallback((key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value === '' ? undefined : value,
        }));
    }, []);

    // Maneja la subida de imágenes nuevas
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [...images];
        const newPreviews = [...newImagePreviews];

        const totalImages = existingImagesId.length + newImages.length + files.length;
        if (totalImages > MAX_IMAGES) {
            toast.error(`You can only upload up to ${MAX_IMAGES} images in total`);
            const allowedFiles = files.slice(0, MAX_IMAGES - existingImagesId.length - newImages.length);
            processImages(allowedFiles, newImages, newPreviews);
            event.target.value = '';
        } else {
            processImages(files, newImages, newPreviews);
        }
    };

    // Procesa las imágenes cargadas por el usuario
    const processImages = (files, newImages, newPreviews) => {
        files.forEach((file) => {
            if (newImages.length < MAX_IMAGES - existingImagesId.length) {
                newImages.push(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
                };
                reader.readAsDataURL(file);
            }
        });
        setImages(newImages);
    };

    // Elimina una imagen (existente o nueva)
    const removeImage = (index, type) => {
        if (type === 'existing') {
            setExistingImagePreviews((prev) => prev.filter((_, i) => i !== index));
            setExistingImagesId((prev) => prev.filter((_, i) => i !== index));
        } else {
            setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
            setImages((prev) => prev.filter((_, i) => i !== index));
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalImages = existingImagesId.length + images.length;

        // Verifica si hay al menos 3 imágenes
        if (totalImages < MIN_IMAGES) {
            toast.error('You must have at least 3 images');
            return;
        }

        const finalData = {
            ...data,
            property_category_id: filterPropType,
            property_transaction_type_id: filterPropTransaction,
            user_id: userId,
            _method: 'PUT',
        };

        const formData = prepareFormData(finalData);

        try {
            const response = await axios.post(`/properties/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 200) {
                toast.success('Property updated successfully');
                navigate(ROUTE_PATHS.PROPERTY_MANAGEMENT);
            } else {
                toast.error('Error updating property');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('An error occurred while updating the property');
        }
    };

    // Prepara los datos del formulario para ser enviados
    const prepareFormData = (finalData) => {
        const formData = new FormData();
        images.forEach((image) => formData.append('images[]', image));
        existingImagesId.forEach((id) => formData.append('existing_images_id[]', id));
        utilities.forEach((utility, index) => formData.append(`utilities[${index}]`, utility));
        Object.entries(finalData).forEach(([key, value]) => formData.append(key, value));
        return formData;
    };

    // Renderiza el formulario según el tipo de propiedad seleccionado
    const renderFormulario = () => {
        if (!filterPropType || !filterPropTransaction) return null;
        const formulariosPorTipo = {
            1: <HDSForm title="House details" transactionType={filterPropTransaction} fillData={handleInputChange} fillUtilities={handleUtilitiesData} initialData={data} />,
            2: <HDSForm title="Apartment details" transactionType={filterPropTransaction} fillData={handleInputChange} fillUtilities={handleUtilitiesData} initialData={data} />,
            3: <HDSForm title="Studio details" transactionType={filterPropTransaction} fillData={handleInputChange} fillUtilities={handleUtilitiesData} initialData={data} />,
            4: <BareLandForm transactionType={filterPropTransaction} fillData={handleInputChange} fillUtilities={handleUtilitiesData} initialData={data} />,
            5: <RetailSpaceForm transactionType={filterPropTransaction} fillData={handleInputChange} fillUtilities={handleUtilitiesData} initialData={data} />,
        };
        return formulariosPorTipo[filterPropType] || null;
    };

    if (isLoadingProps) return <div>Loading...</div>;
    if (!selectedProperty) return <div>Property not found.</div>;

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ToastContainer position="top-center" autoClose={900} hideProgressBar theme="light" />
            <section className="mt-10 flex flex-col sm:flex-row gap-4">
                <BackButton />
                <h1 className="text-center sm:text-start">Edit Property</h1>
            </section>
            <div className="container mx-auto">
                <SectionDivider text="Property type" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <MainFilterTag text="House" icon={<House size={20} />} isActivate={filterPropType === 1} handleActivateButton={() => handleFilterPropType(1)} />
                    <MainFilterTag text="Apartment" icon={<Hotel size={20} />} isActivate={filterPropType === 2} handleActivateButton={() => handleFilterPropType(2)} />
                    <MainFilterTag text="Studio" icon={<Warehouse size={20} />} isActivate={filterPropType === 3} handleActivateButton={() => handleFilterPropType(3)} />
                    <MainFilterTag text="Bare land" icon={<Fence size={20} />} isActivate={filterPropType === 4} handleActivateButton={() => handleFilterPropType(4)} />
                    <MainFilterTag text="Retail space" icon={<Store size={20} />} isActivate={filterPropType === 5} handleActivateButton={() => handleFilterPropType(5)} />
                </div>

                <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-8">
                    <div className="mb-10">
                        <SectionDivider text="What will you do with this property?" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <SecondaryFilterTag text="Sale" isActivate={filterPropTransaction === 1} handleSelectedValue={handleFilterPropTransaction} groupType="group" idValue={1} />
                            <SecondaryFilterTag text="Rent" isActivate={filterPropTransaction === 2} handleSelectedValue={handleFilterPropTransaction} groupType="group" idValue={2} />
                            <SecondaryFilterTag text="Both" isActivate={filterPropTransaction === 3} handleSelectedValue={handleFilterPropTransaction} groupType="group" idValue={3} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            {renderFormulario()}
                            <MainButton text="Update Property" type="submit" variant="fill" customClass="mt-4 w-full" />
                        </form>
                    </div>

                    <div>
                        <SectionDivider text="Upload at least 3 images" />
                        <div className="image-upload-container">
                            <label htmlFor="file-input" className="block text-center px-8 py-3 rounded-md bg-secondary text-white cursor-pointer hover:bg-light-blue">
                                Add
                            </label>
                            <p>Please upload an image file (JPG, JPEG, PNG, or WEBP). Max size: 5MB.</p>
                            <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" multiple />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
                                {existingImagePreviews.map((image, index) => (
                                    <div key={`existing-${index}`} className="relative">
                                        <img src={image} alt={`Existing Preview ${index + 1}`} className="w-full h-40 object-cover rounded-md" />
                                        <button type="button" onClick={() => removeImage(index, 'existing')} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                {newImagePreviews.map((image, index) => (
                                    <div key={`new-${index}`} className="relative">
                                        <img src={image} alt={`New Preview ${index + 1}`} className="w-full h-40 object-cover rounded-md" />
                                        <button type="button" onClick={() => removeImage(index, 'new')} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
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
