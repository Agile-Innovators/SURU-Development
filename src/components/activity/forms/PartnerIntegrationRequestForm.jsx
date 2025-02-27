import React, { useEffect, useState, useContext } from 'react';
import { MainButton } from '../../ui/buttons/MainButton';
import { useAxios } from '../../../components/hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../../../global/ThemeContext';
import { Input } from '../../ui/forms/Input.jsx';
import { X, ImageUp } from 'lucide-react'; 

export function PartnerIntegrationRequestForm() {
    const axios = useAxios();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); 

    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phone_number: '',
        email: '',
        image: null,
        website_url: '',
        instagram_url: '',
        facebook_url: '',
        tiktok_url: '',
        city_id: '',
        currency_id: '',
        partner_category_id: '',
        address: '',
        partner_comments: '',
    });

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('/locations');
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/partners-categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('/currencies');
                setCurrencies(response.data);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchCities();
        fetchCategories();
        fetchCurrencies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            const file = e.target.files[0];
            if (file) {
                // Verificar si el archivo es una imagen
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                    toast.error('Please upload a valid image file (jpg, jpeg, png, svg or webp).');
                    return; 
                }
                setFormData((prev) => ({
                    ...prev,
                    image: file,
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };    

    const handleImageRemove = () => {
        setFormData((prev) => ({
            ...prev,
            image: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phone_number.length !== 8) {
            toast.error('Phone number must be exactly 8 digits.');
            return;
        }

        if (!formData.image) {
            toast.error('You must apply your company logo.');
            return;
        }

        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                '/partner-request',
                formDataToSubmit,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            Swal.fire({
                icon: 'success',
                title: 'Request sent',
                text: 'Your partner request has been successfully submitted!',
                customClass: theme === 'dark' ? 'swal-dark' : '', // Aplica tema oscuro
            });
            navigate(ROUTE_PATHS.PARTNERS);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Request could not be processed',
                    text: 'We cannot process your request because some information is already registered.',
                    customClass: theme === 'dark' ? 'swal-dark' : '', // Aplica tema oscuro
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error submitting your request. Please try again later.',
                    customClass: theme === 'dark' ? 'swal-dark' : '', // Aplica tema oscuro
                });
            }
            console.error('Error submitting partner request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
            <div className="flex flex-col mb-4">
                <label htmlFor="name" className="font-medium text-gray-700">
                    Company Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Suru"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    required
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="description"
                    className="font-medium text-gray-700"
                >
                    Tell Us About Your Company
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly description of your company. This will be visible to all users if your application is approved."
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-32"
                    required
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="phone_number"
                    className="font-medium text-gray-700"
                >
                    Contact Phone Number
                </label>
                <Input
                    inputName="phone_number"
                    inputId="phoneNumber-input"
                    type="number"
                    placeholder='Enter your phone number'
                    value={formData.phone_number}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="email" className="font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    required
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="image" className="font-medium text-gray-700">
                    Company Logo
                </label>
                <div
                    className="border-2 mt-2 border-dashed border-light-grey justify-center items-center relative rounded-sm size-56 cursor-pointer grid content-center"
                >
                    {!formData.image ? (
                        <>
                        <ImageUp size={54} className="text-secondary/80 dark:text-light-grey stroke-[1.5] mx-4" />
                            <span className='text-secondary dark:text-light-grey mx-4'>Drag and drop your logo here, or click to select a file</span>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                                className="absolute top-0 left-0 w-full h-full opacity-0"
                            />
                        </>
                    ) : (
                        <>
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Company Logo"
                                className="w-full h-full object-cover"
                            />
                            <X
                                onClick={handleImageRemove}
                                size={24}
                                className="absolute top-2 right-2 text-red-500 cursor-pointer"
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="website_url"
                    className="font-medium text-gray-700"
                >
                    Website URL (Optional)
                </label>
                <input
                    type="url"
                    id="website_url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    placeholder="Enter your website URL"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="instagram_url"
                    className="font-medium text-gray-700"
                >
                    Instagram URL (Optional)
                </label>
                <input
                    type="url"
                    id="instagram_url"
                    name="instagram_url"
                    value={formData.instagram_url}
                    onChange={handleChange}
                    placeholder="Enter your Instagram URL"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="facebook_url"
                    className="font-medium text-gray-700"
                >
                    Facebook URL (Optional)
                </label>
                <input
                    type="url"
                    id="facebook_url"
                    name="facebook_url"
                    value={formData.facebook_url}
                    onChange={handleChange}
                    placeholder="Enter your Facebook URL"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="tiktok_url"
                    className="font-medium text-gray-700"
                >
                    TikTok URL (Optional)
                </label>
                <input
                    type="url"
                    id="tiktok_url"
                    name="tiktok_url"
                    value={formData.tiktok_url}
                    onChange={handleChange}
                    placeholder="Enter your TikTok URL"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="currency_id"
                    className="font-medium text-gray-700"
                >
                    Currency
                </label>
                <select
                    id="currency_id"
                    name="currency_id"
                    value={formData.currency_id}
                    onChange={handleChange}
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    required
                >
                    <option value="">Select a currency</option>
                    {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                            {currency.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="partner_category_id"
                    className="font-medium text-gray-700"
                >
                    Category
                </label>
                <select
                    id="partner_category_id"
                    name="partner_category_id"
                    value={formData.partner_category_id}
                    onChange={handleChange}
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="city_id" className="font-medium text-gray-700">
                    City where you are located
                </label>
                <select
                    id="city_id"
                    name="city_id"
                    value={formData.city_id}
                    onChange={handleChange}
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    required
                >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                        <option key={city.value} value={city.value}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="partner_comments"
                    className="font-medium text-gray-700"
                >
                    Physical Address (Optional)
                </label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address if you have a physical location"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-32"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="partner_comments"
                    className="font-medium text-gray-700"
                >
                    Extra Comments
                </label>
                <textarea
                    id="partner_comments"
                    name="partner_comments"
                    value={formData.partner_comments}
                    onChange={handleChange}
                    placeholder="Any additional comments or information about why you want to become a partner"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-32"
                />
            </div>
            <MainButton type="submit" text="Send Request" />
        </form>
    );
}
