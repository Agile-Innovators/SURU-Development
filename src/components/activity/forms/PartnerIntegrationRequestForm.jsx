import { useEffect, useState } from 'react';
import { MainButton } from '../../ui/buttons/MainButton';
import { useAxios } from '../../../components/hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes';

export function PartnerIntegrationRequestForm() {
    const axios = useAxios();
    const navigate = useNavigate();

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
            setFormData((prev) => ({
                ...prev,
                image: e.target.files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        try {
            const response = await axios.post('/partner-request', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
            console.log('Partner request submitted:', response.data);
            navigate(ROUTE_PATHS.PARTNERS);
        } catch (error) {
            console.error('Error submitting partner request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
            <div className="flex flex-col mb-4">
                <label htmlFor="name" className="font-medium text-gray-700">Company Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    required
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="description" className="font-medium text-gray-700">Tell Us About Your Company</label>
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
                <label htmlFor="phone_number" className="font-medium text-gray-700">Contact Phone Number</label>
                <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter contact phone number"
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    required
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="email" className="font-medium text-gray-700">Email Address</label>
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
                <label htmlFor="image" className="font-medium text-gray-700">Company Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
                    accept="image/*" 
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="website_url" className="font-medium text-gray-700">Website URL</label>
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
                <label htmlFor="instagram_url" className="font-medium text-gray-700">Instagram URL</label>
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
                <label htmlFor="facebook_url" className="font-medium text-gray-700">Facebook URL</label>
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
                <label htmlFor="tiktok_url" className="font-medium text-gray-700">TikTok URL</label>
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
                <label htmlFor="currency_id" className="font-medium text-gray-700">Currency</label>
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
                        <option key={currency.id} value={currency.id}>{currency.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="partner_category_id" className="font-medium text-gray-700">Category</label>
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
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="city_id" className="font-medium text-gray-700">City</label>
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
                        <option key={city.value} value={city.value}>{city.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="partner_comments" className="font-medium text-gray-700">Address</label>
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
                <label htmlFor="partner_comments" className="font-medium text-gray-700">Extra Comments</label>
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