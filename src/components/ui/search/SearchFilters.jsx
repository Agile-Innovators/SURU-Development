import { MainButton } from '../buttons/MainButton';
import { useFetchPropertyCategories } from '../../hooks/useFetchPropertyCategories';
import { useFetchRegions } from '../../hooks/useFetchRegions';
import { useAxios } from '../../hooks/useAxios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonLoader } from '../SkeletonLoader';
import { useState } from 'react';

export function SearchFilter({ setData, isLoadingFilter, handleModal }) {
    const { regions, isLoadingRegions } = useFetchRegions();
    const { propertyCategories, isLoadingPropsCats } =
        useFetchPropertyCategories();
    const [ regionId, setRegionId ] = useState(0);
    const axios = useAxios();

    const filterProperties = async (e) => {
        e.preventDefault();
        // const regionId = document.getElementById('select_regions').value;
        // const minPrice = document.getElementById('select_min_price').value;
        // const maxPrice = document.getElementById('select_max_price').value;
        const propertyCategoryId =
            document.getElementById('select_props_cats').value;

        // if (maxPrice !== 'max') {
        //     if (minPrice > maxPrice) {
        //         toast.error('min price must not be higher than the max price', {
        //             position: 'top-center',
        //             autoClose: 3000,
        //             hideProgressBar: true,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: 'light',
        //             transition: Bounce,
        //         });

        //         return;
        //     }
        // }
        isLoadingFilter(true);
        try {
            // console.log(
            //     'datos a enviar: ',
            //     regionId,
            //     minPrice,
            //     maxPrice,
            //     propertyCategoryId
            // );
            const response = await axios.get('/properties/filter', {
                params: {
                    regionId: regionId,
                    // minPrice: minPrice,
                    // maxPrice: maxPrice,
                    propertyCategoryId: propertyCategoryId,
                },
            });
            const data = await response.data;
            setData(data);
            isLoadingFilter(false);
        } catch (error) {
            console.log(error);
            isLoadingFilter(false);
        }
    };

    // const selectPriceOptions = [
    //     {
    //         id: 'price',
    //         label: 'Price',
    //         options: [
    //             { value: '0', label: '₡0' },
    //             { value: '100000', label: '₡100,000' },
    //             { value: '200000', label: '₡200,000' },
    //             { value: '300000', label: '₡300,000' },
    //             { value: '400000', label: '₡400,000' },
    //             { value: '500000', label: '₡500,000' },
    //             { value: '600000', label: '₡600,000' },
    //         ],
    //     },
    // ];

    const createRegionsSelect = (items) => {
        console.log(items)
        return (
            <div className="w-full lg:w-auto flex flex-col">
                <label
                    htmlFor={'select_regions'}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Region
                </label>
                <select
                    id="select_regions"
                    name={`select_regions`}
                    value={regionId}
                    onChange={(e) => (setRegionId(e.target.value))}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value="0">all</option>
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
                    htmlFor={'select_props_cats'}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Property Type
                </label>
                <select
                    id="select_props_cats"
                    name={`select_props_cats`}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value="0">all</option>
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

    const showLoaderSelect = () => {
        return (
            <div className="w-full gap-1 lg:w-auto flex flex-col">
                <SkeletonLoader customClass="h-8 w-full sm:w-full" />
                <SkeletonLoader customClass="h-8 w-full sm:w-full" />
            </div>
        );
    };

    const clearFilter = (e) => {
        e.preventDefault();
        const selectRegion = document.getElementById('select_regions');
        // const minPriceSelect = document.getElementById('select_min_price');
        // const maxPriceSelect = document.getElementById('select_max_price');
        const propsCatsSelect = document.getElementById('select_props_cats');
        selectRegion.value = 0;
        // minPriceSelect.value = selectPriceOptions[0].options[0].value;
        // maxPriceSelect.value = 'max';
        propsCatsSelect.value = 0;
    };

    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    return (
        <form
            id="form_filters"
            className="flex flex-col p-4 border-2 rounded-md w-full gap-4 mt-5"
            onSubmit={(e) => filterProperties(e)}
        >
            <ToastContainer
                position="top-center"
                autoClose={200}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(00px,_1fr))] gap-4 items-center">
                {isLoadingPropsCats
                    ? showLoaderSelect()
                    : createRegionsSelect(regions)}
                {/* {isLoadingPropsCats ? (
                    showLoaderSelect()
                ) : (
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
                )} */}
                {/* {isLoadingPropsCats ? (
                    showLoaderSelect()
                ) : (
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
                            <option value="max">₡max price</option>
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
                )} */}
                {isLoadingPropsCats
                    ? showLoaderSelect()
                    : createPropsCatsSelect(propertyCategories)}
            </div>
            <div className="flex flex-col items-center gap-2 w-full sm:flex-row">
                <MainButton
                    text="Search"
                    type="submit"
                    customClass="p-3 h-fit w-full sm:w-auto"
                    variant="fill"
                />

                <MainButton
                    text="More Filters"
                    type="button"
                    customClass="p-3 h-fit w-full sm:w-auto"
                    variant="border"
                    onClick={handleOpenModal}
                />
                <MainButton
                    text="Clear"
                    type="button"
                    customClass="p-3 h-fit w-full sm:w-auto"
                    variant="border"
                    onClick={(e) => clearFilter(e)}
                />
            </div>
        </form>
    );
}
