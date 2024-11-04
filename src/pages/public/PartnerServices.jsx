import React, { useState } from 'react';
import { useAuth } from '../../global/AuthProvider.jsx';
import { useFetchServices } from '../../components/hooks/useFetchServices';

export function PartnerServices() {
    const [selectedService, setSelectedService] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filters, setFilters] = useState([]);

    const { getUser } = useAuth();
    const { user } = getUser();
    const { services, loading, error, updatePartnerServices } = useFetchServices(1);

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleAdd = () => {
        if (!selectedService || minPrice === '' || maxPrice === '') {
            alert("Please complete all fields.");
            return;
        }

        const serviceName = services.find(service => service.id === selectedService)?.name;
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
        try {
            await updatePartnerServices(user.id, { services: formattedServices });
            toast.success('Information updated successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        } catch (error) {
            toast.error('Failed to update services.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
        <div className='p-6'>
            <div className='border rounded-lg p-6 bg-white'>
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
                            className="border border-light-grey bg-gray-100 rounded-md w-full px-4 py-2 mt-2 focus:outline-blue-400"
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
                            className="border border-light-grey bg-gray-100 rounded-md w-full px-4 py-2 mt-2 focus:outline-blue-400"
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className='flex justify-end mt-6'>
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-6 py-2 font-semibold shadow-md transition duration-150 ease-in-out"
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
                            <li key={index} className="flex flex-col items-center justify-between bg-gray-50 p-4 rounded-lg border sm:flex-row">
                                <div className="text-sm text-gray-700 ">
                                    <span className="font-medium">Service:</span>
                                    {filter.isEditing ? (
                                        <select
                                            value={filter.id}
                                            onChange={(e) => handleFilterChange(index, 'id', e.target.value)}
                                            className="border border-light-grey bg-gray-100 rounded-md px-2 py-1"
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
                                    )}
                                    
                                    <span className="font-medium"> Min. Price:</span> {filter.isEditing ? (
                                        <input
                                            type="number"
                                            value={filter.minPrice}
                                            onChange={(e) => handleFilterChange(index, 'minPrice', e.target.value)}
                                            className="border border-light-grey bg-gray-100 rounded-md px-2 py-1"
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
                                            className="border border-light-grey bg-gray-100 rounded-md px-2 py-1"
                                            disabled={loading}
                                        />
                                    ) : (
                                        filter.maxPrice
                                    )}
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEditToggle(index)}
                                        className="text-blue-500 hover:text-blue-600 font-semibold"
                                        disabled={loading}
                                    >
                                        {filter.isEditing ? "Save" : "Edit"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:text-red-600 font-semibold"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 text-sm">No filters added.</li>
                    )}
                </ul>
            </div>
            
            <div className='flex justify-end mt-6'>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6 py-2 font-semibold shadow-md transition duration-150 ease-in-out"
                    disabled={loading}
                >
                    Update Services
                </button>
            </div>
        </div>
    );
}
