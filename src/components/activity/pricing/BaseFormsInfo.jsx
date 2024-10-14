import { InputForms } from '../../ui/forms/InputForms';
import { useFetchLocations } from '../../hooks/useFetchLocations';
import { useState, useContext, useEffect } from 'react';
import { globalProvider } from '../../../global/GlobalProvider';

export function BaseFormsInfo({ fillData, initialData }) {
    const { locations, isLoadingLocat } = useFetchLocations();
    const [selectedLocation, setSelectedLocation] = useState('');
    const { propTypeForm, propTransacTypeForm } = useContext(globalProvider);

    // Manejar selección de ubicación
    const handleLocationSelect = (e) => {
        const value = e.target.value;
        if (value !== selectedLocation) {
            setSelectedLocation(value);
            fillData('city_id', value);
        }
    };

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0 && locations.length > 0) {
            const cityId = String(initialData.city_id);
            const cityExists = locations.some(location => String(location.value) === cityId);

            if (cityExists && cityId !== selectedLocation) {
                setSelectedLocation(cityId);
                fillData('city_id', cityId);
            } else if (!cityExists) {
                setSelectedLocation('');
            }
        }
    }, [initialData, locations, selectedLocation, fillData]);

    useEffect(() => {
        if (propTypeForm || propTransacTypeForm) {
            setSelectedLocation('');
            fillData('city_id', '');
        }
    }, [propTypeForm, propTransacTypeForm, fillData]);

    // Depuración: Verificar los valores
    useEffect(() => {
        console.log('Initial Data:', initialData);
        console.log('Locations:', locations);
        console.log('Selected Location:', selectedLocation);
    }, [initialData, locations, selectedLocation]);

    return (
        <div className="flex flex-col">
            <div>
                <InputForms
                    inputName="title"
                    inputId="title"
                    labelText="Title"
                    placeholder="Enter the title"
                    onChange={(value) => fillData('title', value)}
                    required={true}
                    value={initialData.title || ''}
                />
            </div>
            <div className="mt-4">
                <InputForms
                    inputName="availability_date"
                    inputId="availability_date"
                    labelText="Availability date"
                    placeholder="Select the date"
                    type="date"
                    onChange={(value) => fillData('availability_date', value)}
                    required={true}
                    value={initialData.availability_date || ''}
                />
            </div>
            <div className="mt-4">
                <InputForms
                    inputName="description"
                    inputId="description"
                    labelText="Description"
                    placeholder="Enter the description"
                    type="textarea"
                    onChange={(value) => fillData('description', value)}
                    required={true}
                    value={initialData.description || ''}
                />
            </div>
            <div>
                {isLoadingLocat ? (
                    <p>Loading</p>
                ) : (
                    <>
                        <label
                            htmlFor="cities_Select"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Location
                        </label>
                        <select
                            name="citiesSelect"
                            id="cities_Select"
                            value={selectedLocation}
                            onChange={handleLocationSelect}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            required
                        >
                            <option value="" disabled={!selectedLocation}>
                                {selectedLocation
                                    ? locations.find(location => String(location.value) === selectedLocation)?.name || 'Select a location'
                                    : 'Select a location'}
                            </option>
                            {locations.map((location) => (
                                <option
                                    key={location.value}
                                    value={String(location.value)}
                                >
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>
        </div>
    );
}

export default BaseFormsInfo;
