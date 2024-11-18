import React, { useState, useContext } from 'react';
import { useAuth } from '../../global/AuthProvider.jsx';
import { useFetchServices } from '../../components/hooks/useFetchServices';
import { ThemeContext } from '../../global/ThemeContext.jsx';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export function PartnerServices() {
    const [selectedService, setSelectedService] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filters, setFilters] = useState([]);
    const navigate = useNavigate();
    const { getUser } = useAuth();
    const { user } = getUser();
    const { theme } = useContext(ThemeContext); 
    const { services, loading, error, updatePartnerServices, partnerServices, getPartnerServices } = useFetchServices(1);
    console.log("Datos del Usuario", user);

    useEffect(() => {
        getPartnerServices(user.id);
        console.log("Datos de los servicios del partner", partnerServices);

    }, [user.id]);
    console.log("Datos de los servicios", services);
    //se agregan los servicios del partner a los filtros
    useEffect(() => {
        if (partnerServices) {

            const newFilters = partnerServices.map(service => {
                return {
                    id: service.business_services_id,
                    name: service.name,
                    minPrice: service.price,
                    maxPrice: service.price_max,
                };
            }
            );
            setFilters(newFilters);

        }
    }, [partnerServices]);
    


    if (user.user_type !== "partner") {
        navigate(ROUTE_PATHS.HOME);
    }

    if (loading) return <p>Loading services...</p>;

    if (error) return <p>Error: {error}</p>;

    const validateService = (serviceId, min, max) => {
        if (!serviceId || min === '' || max === '') return false;
        return parseFloat(min) >= 0 && parseFloat(max) >= 0 && parseFloat(min) <= parseFloat(max);
    };

    const handleAdd = () => {

        if (!selectedService || minPrice === '' || maxPrice === '') {
            alert("Please complete all fields.");
            return;
        }

        if (filters.some(filter => filter.id === selectedService)) {
            toast.error("Service already added.");
            return;
        }
        
        if (parseFloat(minPrice) > parseFloat(maxPrice)) {
            toast.error("Min Price cannot be greater than Max Price.");
            return;
        }

        if (!validateService(selectedService, minPrice, maxPrice)) {
            toast.error("Invalid input. Please check your data.");
            return;
        }



        // console.log("Datos de los filtros", filters);
        // console.log("Datos del servicios", services);
        // console.log("Datos del servicio seleccionado ID", selectedService);
        const serviceName = services.find(service => service.id == selectedService)?.name;

        // console.log("Nombre del servicio", serviceName);
        const newFilter = { id: selectedService, name: serviceName, minPrice, maxPrice, isEditing: false };
        setFilters([...filters, newFilter]);
        // Reset input fields
        setSelectedService('');
        setMinPrice('');
        setMaxPrice('');
    };

    const handleEditToggle = (index) => {
        setFilters(filters.map((filter, i) => i === index ? { ...filter, isEditing: !filter.isEditing } : filter));
    };

    const handleFilterChange = (index, field, value) => {
        setFilters(filters.map((filter, i) => i === index ? { ...filter, [field]: value } : filter));
    };

    const handleDelete = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const formattedServices = filters.map(filter => ({
            id: filter.id,
            price: parseFloat(filter.minPrice),
            price_max: filter.maxPrice ? parseFloat(filter.maxPrice) : null
        }));
        if (formattedServices.length === 0) {
            toast.error('Please add at least one service.');
            return;
        }

        try {
            await updatePartnerServices(user.id, { services: formattedServices });
            toast.success('Information updated successfully');
        } catch (error) {
            toast.error('Failed to update services.');
        }
    };

    return (
        <div className='p-6'>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />

            <div className='border rounded-lg p-6 bg-white dark:bg-transparent'>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Service</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                        <label className="font-medium text-gray-700">Name</label>
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="border border-light-grey bg-gray-100 rounded-md w-full px-4 py-2 mt-2 focus:outline-blue-400"
                            disabled={loading}
                        >
                            <option value="">Select a Service</option>
                            {services && services.length > 0 ? (
                                services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No services available</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Min. Price</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min. Price"
                            className="border border-light-grey bg-gray-100 rounded-md w-full px-4 py-2 mt-2 focus:outline-cyan-400 dark:bg-[#1f2937]"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="font-medium text-gray-700">Max. Price</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max Price"
                            className="border border-light-grey bg-gray-100 rounded-md w-full px-4 py-2 mt-2 focus:outline-cyan-400 dark:bg-[#1f2937]"
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className='flex justify-end mt-6'>
                    <button
                        onClick={handleAdd}
                        className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-800 dark:hover:bg-cyan-700 text-white rounded-md px-6 py-2 font-semibold shadow-md transition duration-150 ease-in-out"
                        disabled={loading}
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="filters-list mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Added Services:</h3>
                <ul className="space-y-2">
                    {filters.length > 0 ? (
                        filters.map((filter, index) => (
                            <li key={index} className="flex flex-col items-center justify-between bg-gray-50 dark:bg-transparent p-4 rounded-lg border sm:flex-row">
                                <div className="text-sm text-gray-700 ">
                                    <span className="font-medium dark:text-white">Service: </span>
                                    {
                                        filter.isEditing ? (
                                            <select
                                                value={filter.id}
                                                onChange={(e) => handleFilterChange(index, 'id', e.target.value)}
                                                className="border border-light-grey bg-gray-100 rounded-md px-2 py-1 dark:text-white"
                                                disabled={loading || services.length === 0}
                                            >
                                                {services && services.length > 0 ? (
                                                    services.map((service) => (
                                                        <option key={service.id} value={service.id}>
                                                            {service.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>No services available</option>
                                                )}
                                            </select>
                                        ) : (
                                            filter.name
                                        )
                                    }

                                    <span className="font-medium dark:text-white"> Min. Price:</span> {filter.isEditing ? (
                                        <input
                                            type="number"
                                            value={filter.minPrice}
                                            onChange={(e) => handleFilterChange(index, 'minPrice', e.target.value)}
                                            className="border border-light-grey bg-gray-100 rounded-md px-2 py-1 dark:bg-[#1f2937] dark:text-white"
                                            disabled={loading}
                                        />
                                    ) : (
                                        filter.minPrice
                                    )},

                                    <span className="font-medium"> Max. Price:</span> {filter.isEditing ? (
                                        <input
                                            type="number"
                                            value={filter.maxPrice}
                                            onChange={(e) => handleFilterChange(index, 'maxPrice', e.target.value)}
                                            className="border border-light-grey bg-gray-100 rounded-md px-2 py-1 dark:bg-[#1f2937] dark:text-white"
                                            disabled={loading}
                                        />
                                    ) : (
                                        filter.maxPrice
                                    )}
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEditToggle(index)}
                                        className="text-cyan-600 hover:text-cyan-700 dark:text-[#81aab6] dark:hover:text-white transition duration-150 ease-in-out font-semibold"
                                        disabled={loading}
                                    >
                                        {filter.isEditing ? "Save" : "Edit"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition duration-150 ease-in-out text-sm py-100 font-semibold"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 text-sm dark:text-white">No filters added.</li>
                    )}
                </ul>
            </div>

            <div className='flex justify-end mt-6'>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-md px-6 py-2 font-semibold shadow-md transition duration-150 ease-in-out"
                    disabled={loading}
                >
                    Update Services
                </button>
            </div>
        </div>
    );
}
