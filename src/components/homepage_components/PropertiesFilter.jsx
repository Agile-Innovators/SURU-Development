import { AdvancedCard } from "../../components/ui/AdvancedCard";
import { Divider } from "@mui/joy";
import React from "react";
import { MainButton } from "./../../components/ui/MainButton";
import { ROUTE_PATHS } from "../../routes/index.js";
import { useNavigate } from "react-router-dom";
import { useFetchRegions } from "../hooks/useFetchRegions.js";
import { useFetchPropertyCategories } from "../hooks/useFetchPropertyCategories.js";

export function PropertiesFilter() {
    const { regions, isLoadingRegions } = useFetchRegions();
    const { propertyCategories, isLoadingPropsCats } =
        useFetchPropertyCategories();

    const createRegionsSelect = (items) => {
        return (
            <div className="w-full lg:w-auto flex flex-col">
                <label
                    htmlFor={"select_regions"}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Region
                </label>
                <select
                    id="select_regions"
                    name={`select_regions`}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    {items.map((region) => (
                        <option
                            key={`region_${region.attributes.id}`}
                            value={region.attributes.id}
                        >
                            {region.attributes.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };





    const createPropsCatsSelect = (items) => {
        return (
            <div className="w-full lg:w-auto flex flex-col">
                <label
                    htmlFor={"select_props_cats"}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Property Type
                </label>
                <select
                    id="select_props_cats"
                    name={`select_props_cats`}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    {items.map((category) => (
                        <option
                            key={`category_${category.attributes.id}`}
                            value={category.attributes.id}
                        >
                            {category.attributes.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const selectPriceOptions = [
        {
            id: "price",
            label: "Price",
            options: [
                { value: "0", label: "₡0" },
                { value: "100000", label: "₡100,000" },
                { value: "200000", label: "₡200,000" },
                { value: "300000", label: "₡300,000" },
                { value: "400000", label: "₡400,000" },
                { value: "500000", label: "₡500,000" },
                { value: "600000", label: "₡600,000" },
            ],
        },
    ];

    function filter(event) {
        event.preventDefault();
        const formFilter = event.target;
        const selectElements = formFilter.querySelectorAll("select");

        const selectValues = Array.from(selectElements).map(
            (select) => select.value
        );

        console.log(selectValues);

        // navigate(ROUTE_PATHS.LOGIN);
    }

    return (
        <section className="mt-20">
            <div className="text-center flex flex-col items-center gap-6 px-4 py-8">
                <h1>Property Gallery</h1>
                {/* Le cambie el color y este se ve mas presentable */}
                <p className="max-w-[60ch] text-gray-600">
                    Discover our great selection of properties and choose the
                    one that best suits you.
                </p>
                <form
                    onSubmit={(e) => filter(e)}
                    name="form_filter"
                    className="w-full lg:w-auto flex flex-col justify-center flex-wrap lg:flex-row items-center border border-gray-200 p-6 rounded-lg shadow-sm gap-6 transition-all duration-300 hover:shadow-md hover:border-gray-300"
                >
                    {isLoadingRegions ? (
                        <p>Loading</p>
                    ) : (
                        createRegionsSelect(regions)
                    )}

                    {
                        <div className="w-full lg:w-auto flex flex-col">
                            <label
                                htmlFor="select_minimum_price"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Minimum Price
                            </label>
                            <select
                                id="select_minimum_price"
                                name="select_minimum_price"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            >
                                {selectPriceOptions.map((option) =>
                                    option.options.map((priceOption) => (
                                        <option
                                            key={priceOption.value}
                                            value={priceOption.value}
                                        >
                                            {priceOption.label}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    }
                    {
                        <div className="w-full lg:w-auto flex flex-col">
                            <label
                                htmlFor="select_maximum_price"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Maximum Price
                            </label>
                            <select
                                id="select_maximum_price"
                                name="select_maximum_price"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            >
                                {selectPriceOptions.map((option) =>
                                    option.options.map((priceOption) => (
                                        <option
                                            key={priceOption.value}
                                            value={priceOption.value}
                                        >
                                            {priceOption.label}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        
                    }
                    {/* <input type="range" /> */}
                    {isLoadingPropsCats ? (
                        <p>Loading</p>
                    ) : (
                        createPropsCatsSelect(propertyCategories)
                    )}

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
                            type="submit"
                            customClass="p-3 w-full lg:w-fit"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                    </div>

                </form>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 justify-center items-center mt-10">
                {Array.from({ length: 6 }).map((_, index) => (
                    <AdvancedCard
                        srcImage="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                        title="Woodie Comfy Property"
                        location="Santa Teresa, Puntarenas. CR."
                        price={100000}
                        frequency="monthly"
                        key={index}
                        customClass={"m-auto"}
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
