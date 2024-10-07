import { X, House, Hotel, Warehouse, Store, Fence } from 'lucide-react';
import { useState, useContext, useEffect } from 'react';
import SectionDivider from '../../ui/layout/SectionDivider';
import { MainButton } from '../../ui/buttons/MainButton';
import HDSForm from './HDSForm';
import RetailSpaceForm from './RetailSpaceForm';
import { useAxios } from '../../hooks/useAxios';
import { MainFilterTag } from '../../ui/buttons/MainFilterTag';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';
import { BareLandForm } from './BareLandForm';
import { globalProvider } from '../../../global/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { BackButton } from '../../ui/buttons/BackButton';

const CreatePropertyForm = () => {
    const axios = useAxios();
    const { setPropTypeForm, setPropTransacTypeForm } =
        useContext(globalProvider);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [data, setData] = useState({});
    const [utilities, setUtilities] = useState([]);
    const [filterPropType, setFilterPropType] = useState(1);
    const [filterPropTransaction, setFilterPropTransaction] = useState(1);
    const [userId, setUserId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            const userData = JSON.parse(data);
            setUserId(userData.id);
            console.log(userData.id);
        }
    });

    useEffect(() => {
      if (images.length+1 > 6) {
        toast.error("You can only upload up to 6 images");
          return;
      }
  }, [images]);

    //manejar el valor de tipo de propiedad
    const handleFilterPropType = (filterId) => {
        setFilterPropType(filterId);
        setPropTypeForm(filterId);
        setData({});
        setUtilities([]);
    };

    //manejar el valor de tipo de transaccion
    const handleFilterPropTransaction = (id) => {
        setFilterPropTransaction(id);
        setPropTransacTypeForm(id);
        setData({});
        setUtilities([]);
    };

    const clearData = () => {
        setData({});
    };

    //manejar el valor de las utilidades de la propiedad
    const handleUtilitiesData = (value, method) => {
        if (method === 'remove') {
            setUtilities((prevUtilities) =>
                prevUtilities.filter((utility) => utility !== value)
            );
        } else {
            setUtilities((prevUtilities) => [...prevUtilities, value]);
        }
    };

    //manejar el valor de los inputs de la propiedad
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

    //manejar el cambio de imagenes
    const handleImageChange = (event) => {
      const files = Array.from(event.target.files);
      const newImages = [...images];
      const newPreviews = [...imagePreviews];
  
      // Limitar la cantidad de imágenes, se dejan subir hasta 6
      if (newImages.length + files.length > 6) {
          toast.error("You can only upload up to 6 images");
          return; 
      }
  
      files.forEach((file) => {
          if (newImages.length < 6) {
              newImages.push(file);
              console.log("Image uploaded:", file.name);
              const reader = new FileReader();
              reader.onloadend = () => {
                  newPreviews.push(reader.result);
                  setImagePreviews([...newPreviews]);
              };
              reader.readAsDataURL(file);
          }
      });
  
      setImages(newImages);
      event.target.value = ''; // Resetear el input para permitir la selección de la misma imagen
  };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    //enviar los datos de la propiedad para el POST
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si se han subido imágenes
        if (images.length < 3) {
          toast.error("Upload at least 3 images");
            return;
        }

        const finalData = {
            ...data,
            property_category_id: filterPropType,
            property_transaction_type_id: filterPropTransaction,
            user_id: userId,
        };

        //Objeto para enviar los datos
        const formData = new FormData();

        //agregar imagenes a la consulta
        images.forEach((image) => {
            formData.append('images[]', image);
        });

        //agregar los datos a la consulta
        for (let key in finalData) {
            formData.append(key, finalData[key]);
        }

        //agregar las utilidades
        utilities.forEach((utility) => {
            formData.append('utilities[]', utility);
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post('/properties', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                navigate(ROUTE_PATHS.PROPERTY_MANAGEMENT);
            } else {
                alert('Error creating property');
            }
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
                    title={'House details'}
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    propertyType={filterPropType}
                    clearData={clearData}
                />
            ),
            //apartment
            2: (
                <HDSForm
                    title={'Apartment details'}
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    propertyType={filterPropType}
                    clearData={clearData}
                />
            ),
            //studio
            3: (
                <HDSForm
                    title={'Studio details'}
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                    propertyType={filterPropType}
                    clearData={clearData}
                />
            ),
            //bare land
            4: (
                <BareLandForm
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                />
            ),
            //retail
            5: (
                <RetailSpaceForm
                    transactionType={filterPropTransaction}
                    fillData={handleInputChange}
                    fillUtilities={handleUtilitiesData}
                />
            ),
        };
        return formulariosPorTipo[filterPropType] || null;
    };

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
            <section className='mt-10 flex flex-col sm:flex-row gap-4'>
              <BackButton />
              <h1 className="text-center sm:text-start">
                  Let&apos;s add a property
              </h1>
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
                                handleSelectedValue={
                                    handleFilterPropTransaction
                                }
                                groupType={'group'}
                                idValue={1}
                            />
                            <SecondaryFilterTag
                                text={'Rent'}
                                isActivate={filterPropTransaction === 2}
                                handleSelectedValue={
                                    handleFilterPropTransaction
                                }
                                groupType={'group'}
                                idValue={2}
                            />
                            <SecondaryFilterTag
                                text={'Both'}
                                isActivate={filterPropTransaction === 3}
                                handleSelectedValue={
                                    handleFilterPropTransaction
                                }
                                groupType={'group'}
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
                        <SectionDivider text="Upload at least 3 images" />
                        <div className="image-upload-container">
                            <label
                                htmlFor="file-input"
                                className="block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer bg-secondary text-white hover:bg-light-blue hover:text-primary"
                            >
                                Add
                            </label>

                            <p>
                                Please upload a image file (JPG, JPGE, PNG, or
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
                                {imagePreviews.map((image, index) => (
                                    <div key={index} className="relative">
                                  
                                      <img
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-md mr-2 grid"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2  bg-red-500 text-white rounded-full p-1"
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
