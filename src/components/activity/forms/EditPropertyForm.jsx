// EditPropertyForm.jsx

import { X, House, Hotel, Warehouse, Store, Fence } from 'lucide-react';
import { useState, useContext, useEffect, useCallback } from 'react';
import SectionDivider from '../../ui/layout/SectionDivider';
import { MainButton } from '../../ui/buttons/MainButton';
import HDSForm from './HDSForm.jsx';
import RetailSpaceForm from './RetailSpaceForm';
import { useAxios } from '../../hooks/useAxios';
import { useFetchProperty } from '../../hooks/useFetchProperty';
import { MainFilterTag } from '../../ui/buttons/MainFilterTag';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';
import { BareLandForm } from './BareLandForm.jsx';
import { globalProvider } from '../../../global/GlobalProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { BackButton } from '../../ui/buttons/BackButton';
import { ThemeContext } from '../../../global/ThemeContext';

const MAX_IMAGES = 6;
const MIN_IMAGES = 3;

const EditPropertyForm = () => {
    const { id } = useParams();
    const { property, isLoadingProp } = useFetchProperty(id);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { setPropTypeForm, setPropTransacTypeForm } = useContext(globalProvider);
    const [images, setImages] = useState([]);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [existingImagesId, setExistingImagesId] = useState([]);
    const [existingImagePreviews, setExistingImagePreviews] = useState([]);
    const [data, setData] = useState(); // city_id inicializado seguro
    const [utilities, setUtilities] = useState([]);
    const [filterPropType, setFilterPropType] = useState(1);
    const [filterPropTransaction, setFilterPropTransaction] = useState(1);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const axios = useAxios();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserId(storedUser.id);
        }
    }, []);

    const checkImageLimits = useCallback(() => {
        const totalImages = existingImagesId.length + images.length;
        if (totalImages > MAX_IMAGES) {
            const allowedNewImages = MAX_IMAGES - existingImagesId.length;
            toast.error(`You can only upload up to ${MAX_IMAGES} images in total`);
            setImages(images.slice(0, allowedNewImages));
            setNewImagePreviews(newImagePreviews.slice(0, allowedNewImages));
        }
    }, [existingImagesId.length, images.length, newImagePreviews]);

    useEffect(checkImageLimits, [images, existingImagesId.length, newImagePreviews, checkImageLimits]);

    const populateForm = useCallback((property) => {
        if (!property) return;

        const initialType = property.property_category_id || 1;
        const initialTransaction = property.property_transaction_id || 1;

        setFilterPropType(initialType);
        setPropTypeForm(initialType);
        setFilterPropTransaction(initialTransaction);
        setPropTransacTypeForm(initialTransaction);

        setData((prevData) => ({
            ...prevData,
            ...property,
            city_id: property.city_id || prevData.city_id || '', // city_id se mantiene si ya tiene valor
        }));

        populateImages(property.images);

        if (property.utilities && property.utilities.length > 0) {
            const utilityIds = property.utilities.map((utility) => utility.id);
            setUtilities(utilityIds);
        }
    }, [setPropTypeForm, setPropTransacTypeForm]);

    const populateImages = useCallback((images) => {
        if (images && images.length > 0) {
            const existingPreviews = images.map((img) => img.url);
            const existingIds = images.map((img) => img.id);
            setExistingImagePreviews(existingPreviews);
            setExistingImagesId(existingIds);
            resetNewImages();
        }
    }, []);

    const resetNewImages = useCallback(() => {
        setImages([]);
        setNewImagePreviews([]);
    }, []);

    useEffect(() => {
        if (!isLoadingProp && property) {
            setSelectedProperty(property);
            populateForm(property);
        } else if (!isLoadingProp && !property) {
            toast.error('Property not found');
            navigate(ROUTE_PATHS.PROPERTY_MANAGEMENT);
        }
    }, [isLoadingProp, property, navigate, populateForm]);

    const handleFilterPropType = useCallback((filterId) => {
        setFilterPropType(filterId);
        setPropTypeForm(filterId);
        resetFormData();
    }, [setPropTypeForm]);

    const handleFilterPropTransaction = useCallback((id) => {
        setFilterPropTransaction(id);
        setPropTransacTypeForm(id);
        resetFormData();
    }, [setPropTransacTypeForm]);

    const resetFormData = useCallback(() => {
        setData((prevData) => ({ ...prevData, city_id: property?.city_id || prevData.city_id || '' }));
        setUtilities([]);
    }, [property]);

    const handleUtilitiesData = useCallback((utilityId) => {
        setUtilities((prevUtilities) => prevUtilities.includes(utilityId)
            ? prevUtilities.filter((utility) => utility !== utilityId)
            : [...prevUtilities, utilityId]);
    }, []);

    const handleInputChange = useCallback((key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value === '' ? undefined : value,
        }));
    }, []);

    const handleCityChange = useCallback((cityId) => {
        setData((prevData) => ({
            ...prevData,
            city_id: cityId,
        }));
    }, []);

    const handleImageChange = useCallback((event) => {
        const files = Array.from(event.target.files);
        const totalImages = existingImagesId.length + images.length + files.length;
        if (totalImages > MAX_IMAGES) {
            toast.error(`You can only upload up to ${MAX_IMAGES} images in total`);
            const allowedFiles = files.slice(0, MAX_IMAGES - existingImagesId.length - images.length);
            processImages(allowedFiles);
            event.target.value = '';
        } else {
            processImages(files);
        }
    }, [existingImagesId.length, images.length]);

    const processImages = useCallback((files) => {
        const newImages = [...images];
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
    }, [existingImagesId.length, images]);

    const removeImage = useCallback((index, type) => {
        if (type === 'existing') {
            setExistingImagePreviews((prev) => prev.filter((_, i) => i !== index));
            setExistingImagesId((prev) => prev.filter((_, i) => i !== index));
        } else {
            setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
            setImages((prev) => prev.filter((_, i) => i !== index));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalImages = existingImagesId.length + images.length;

        if (totalImages < MIN_IMAGES) {
            toast.error('You must have at least 3 images');
            return;
        }

        const finalData = {
            ...data,
            property_category_id: filterPropType,
            property_transaction_type_id: filterPropTransaction,
            user_id: userId,
            city_id: data.city_id,
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

    const prepareFormData = (finalData) => {
        const formData = new FormData();
        images.forEach((image) => formData.append('images[]', image));
        existingImagesId.forEach((id) => formData.append('existing_images_id[]', id));

        Object.entries(finalData).forEach(([key, value]) => {
            if (key !== 'utilities' && value !== undefined && value !== null && value !== '') {
                formData.append(key, value);
            }
        });

        if (utilities.length > 0) {
            utilities.forEach((utilityId) => formData.append('utilities[]', utilityId));
        }

        return formData;
    };

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

    if (isLoadingProp) return <div>Loading...</div>;
    if (!selectedProperty) return <div>Property not found.</div>;

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ToastContainer position="top-center" autoClose={2500} hideProgressBar theme={theme}/>
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
