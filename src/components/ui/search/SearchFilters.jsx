import { ROUTE_PATHS } from "../../../routes";
import { MainButton } from "../buttons/MainButton";
import { useFetchPropertyCategories } from "../../hooks/useFetchPropertyCategories";
import { useFetchRegions } from "../../hooks/useFetchRegions";
import { useAxios } from "../../hooks/useAxios";

export function SearchFilter({setData}) {
    const { regions, isLoadingRegions } = useFetchRegions();
    const { propertyCategories, isLoadingPropsCats } =
        useFetchPropertyCategories();
    const axios = useAxios();

    const filterProperties = async (e) => {
        e.preventDefault();
        const regionId = document.getElementById("select_regions").value;
        const minPrice = document.getElementById("select_min_price").value;
        const maxPrice = document.getElementById("select_max_price").value;
        const propertyCategoryId = document.getElementById("select_props_cats").value;
        // console.log(selectValueRegion)
        try{
            const response = await axios.get(`properties/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&region_id=${regionId}&category_id=${propertyCategoryId}`);
            const data = await response.data
            setData(data);
        }catch(error){
            console.log(error)
        }
    }

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

    const clearFilter = (e) =>{
        e.preventDefault();
        const selectRegion = document.getElementById("select_regions");
        const minPriceSelect = document.getElementById("select_min_price");
        const maxPriceSelect = document.getElementById("select_max_price");
        const propsCatsSelect = document.getElementById("select_props_cats");
        selectRegion.value = regions[0].id;
        minPriceSelect.value = selectPriceOptions[0].options[0].value
        maxPriceSelect.value = selectPriceOptions[0].options[0].value
        propsCatsSelect.value = propertyCategories[0].id

    }

    return (
        <form id="form_filters" className="flex flex-col p-4 border-2 rounded-md w-full gap-4 mt-5" onSubmit={(e) => filterProperties(e)}>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 items-center">
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
                            Minimum Price
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
                {isLoadingPropsCats ? (
                        <p>Loading</p>
                    ) : (
                        createPropsCatsSelect(propertyCategories)
                    )}
                {/* <div className="flex flex-col gap-2">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="">Testing</option>
                        <option value="">Testing</option>
                        <option value="">Testing</option>
                    </select>
                </div> */}
            </div>
            <div className="flex flex-col items-center gap-2 w-full sm:flex-row">
                <MainButton
                    text="Clear"
                    type="button"
                    customClass="p-3 h-fit w-full sm:w-auto"
                    variant="border"
                    onClick={(e) => clearFilter(e)}
                />
                <MainButton
                    text="More Filters"
                    type="button"
                    customClass="p-3 h-fit w-full sm:w-auto"
                    variant="border"
                />
                <MainButton
                    text="Search"
                    type="submit"
                    customClass="p-3 h-fit w-full sm:w-auto"
                    variant="fill"
                />
            </div>
        </form>
    );
}
