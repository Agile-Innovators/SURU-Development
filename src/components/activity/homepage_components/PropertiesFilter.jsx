import { useContext } from "react";
import { AdvancedCard } from "../../ui/cards/AdvancedCard.jsx";
import { Divider } from "@mui/joy";
import { MainButton } from "../../ui/buttons/MainButton.jsx";
import { ROUTE_PATHS } from "../../../routes/index.js";
import { useNavigate } from "react-router-dom";
import { useFetchRegions } from "../../hooks/useFetchRegions.js";
import { useFetchPropertyCategories } from "../../hooks/useFetchPropertyCategories.js";
import { globalProvider } from "../../../global/GlobalProvider.jsx";

export function PropertiesFilter() {
    const {
        setRegionId,
        setMinPrice,
        setMaxPrice,
        setPropertyTypeId,
        setIsFilterUsed,
    } = useContext(globalProvider);
    const navigate = useNavigate();
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
                        <option key={`region_${region.id}`} value={region.id}>
                            {region.name}
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
                            key={`category_${category.id}`}
                            value={category.id}
                        >
                            {category.name}
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
        //obtener valor de los select
        const selectRegion = document.getElementById("select_regions").value;
        const minPrice = document.getElementById("select_min_price").value;
        const maxPrice = document.getElementById("select_max_price").value;
        const propertyCategory = document.getElementById("select_props_cats").value;
        // console.log(selectRegion, minPrice, maxPrice, propertyCategory);

        //cargar datos para el globalProvider
        setRegionId(selectRegion);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setPropertyTypeId(propertyCategory);
        setIsFilterUsed(true)

        navigate(ROUTE_PATHS.SEARCH);
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
                                htmlFor="select_min_price"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Price
                            </label>
                            <select
                                id="select_min_price"
                                name="select_min_price"
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
                                htmlFor="select_max_price"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Maximum Price
                            </label>
                            <select
                                id="select_max_price"
                                name="select_max_price"
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
                            to={ROUTE_PATHS.PROPERTY_DETAILS}
                        />
                        <MainButton
                            text="Search"
                            type="submit"
                            customClass="p-3 w-full lg:w-fit"
                            to={ROUTE_PATHS.PROPERTY_DETAILS}
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
                            to={ROUTE_PATHS.PROPERTY_DETAILS}
                        />
                    </AdvancedCard>
                ))}
            </div>
        </section>
    );
}
