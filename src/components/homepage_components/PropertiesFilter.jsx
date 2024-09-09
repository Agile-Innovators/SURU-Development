import { AdvancedCard } from "../../components/ui/AdvancedCard";
import { Divider } from "@mui/joy";
import React from 'react';
import { MainButton } from "./../../components/ui/MainButton";
import { ROUTE_PATHS } from "../../routes/index.js";


export function PropertiesFilter() {

    const selectOptions = [
        {
            id: 'location',
            label: 'Location',
            options: [
                { value: 'all', label: 'All Properties' },
                { value: 'house', label: 'San José' },
                { value: 'apartment', label: 'Heredia' },
                { value: 'condo', label: 'Cartago' }
            ]
        },
        {
            id: 'price',
            label: 'Price',
            options: [
                { value: 'all', label: 'All Prices' },
                { value: '100000', label: '₡100,000-₡150,000' },
                { value: '150000', label: '₡150,000-₡200,000' },
                { value: '200000', label: '₡200,000-₡250,000' }
            ]
        },
        {
            id: 'propertyType',
            label: 'Property Type',
            options: [
                { value: 'all', label: 'All Types' },
                { value: 'house', label: 'House' },
                { value: 'apartment', label: 'Apartment' },
                { value: 'condo', label: 'Condo' }
            ]
        }
        
    ];

    return (
        <section className="mt-20">
            <div className="text-center flex flex-col items-center gap-6 px-4 py-8">
                <h1>Property Gallery</h1>
                {/* Le cambie el color y este se ve mas presentable */}
                <p className="max-w-[60ch] text-gray-600">
                    Discover our great selection of properties and choose the one that best suits you.
                </p>
                <div className="w-full lg:w-auto flex flex-col justify-center flex-wrap lg:flex-row items-center border border-gray-200 p-6 rounded-lg shadow-sm gap-6 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                    {selectOptions.map((select, index) => (
                        <React.Fragment key={select.id}>
                            <div className="w-full lg:w-auto flex flex-col">
                                <label htmlFor={select.id} className="block text-sm font-medium text-gray-700 mb-2">
                                    {select.label}
                                </label>
                                <select id={select.id} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                                    {select.options.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {index < selectOptions.length - 1 && <Divider orientation="vertical" flexItem />}
                        </React.Fragment>
                    ))}
                    <Divider orientation="vertical" flexItem />
                    <div className="flex flex-col gap-2 w-full sm:flex-row lg:w-auto">
                    <MainButton
                            text="Clear"
                            type="link"
                            customClass="p-3 w-full lg:w-fit"
                            variant="border"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                        <MainButton
                            text="Search"
                            type="link"
                            customClass="p-3 w-full lg:w-fit"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                    </div>
                    {/* <div className="w-full sm:w-auto mt-4 sm:mt-0">
                        <MainButton
                            text="Search"
                            type="link"
                            customClass="p-3"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                    </div> */}
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 justify-center items-center mt-10">
                {Array.from({ length: 6 }).map((_, index) => (
                    <AdvancedCard
                        srcImage="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                        title="Casa en la Montaña"
                        location="San José"
                        price={100000}
                        frequency="monthly"
                        key={index}
                        customClass={'m-auto'}
                    >
                        <MainButton
                            text="View"
                            variant="border"
                            type="link"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                    </AdvancedCard>
                ))}
            </div>
        </section>
    );
}