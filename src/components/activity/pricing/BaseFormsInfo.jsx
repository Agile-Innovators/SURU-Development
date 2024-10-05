import { InputForms } from "../../ui/forms/InputForms";
import { useFetchLocations } from "../../hooks/useFetchLocations";
import { useState } from "react";

export function BaseFormsInfo({ fillData }) {
    const { locations, isLoadingLocat } = useFetchLocations();
    const [selectedLocation, setSelectedLocation] = useState("");

    const handleLocationSelect = (e) =>{
      setSelectedLocation(e.target.value);
      fillData("city_id", e.target.value)
    }

    return (
        <div className="flex flex-col">
            <div>
                <InputForms
                    inputName="title"
                    inputId="title"
                    labelText="Title"
                    placeholder="Enter the title"
                    onChange={(value) => fillData("title", value)}
                    required={true}
                />
            </div>
            <div className="mt-4">
                <InputForms
                    inputName="availability_date"
                    inputId="availability_date"
                    labelText="Availability date"
                    placeholder="Select the date"
                    customClass=""
                    type="date"
                    onChange={(value) => fillData("availability_date", value)}
                    required={true}
                />
            </div>
            <div className="mt-4">
                <InputForms
                    inputName="description"
                    inputId="description"
                    labelText="Description"
                    placeholder="Enter the description"
                    customClass=""
                    type="textarea"
                    onChange={(value) => fillData("description", value)}
                    required={true}
                />
            </div>
            <div>
                {isLoadingLocat ? (
                    <p>Loading</p>
                ) : (
                    <>
                        <label
                            htmlFor={"cities_Select"}
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
                            <option value="" disabled>
                                Select a location
                            </option>
                            {locations.map((location) => (
                                <option
                                    key={location.value}
                                    value={location.value}
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
