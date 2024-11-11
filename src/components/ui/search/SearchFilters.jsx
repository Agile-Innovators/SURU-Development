import { MainButton } from '../buttons/MainButton';
import { useFetchPropertyCategories } from '../../hooks/useFetchPropertyCategories';
import { useFetchRegions } from '../../hooks/useFetchRegions';
import { useAxios } from '../../hooks/useAxios';
import { ToastContainer } from 'react-toastify';
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
        const propertyCategoryId =
            document.getElementById('select_props_cats').value;

        isLoadingFilter(true);
        try {

            const response = await axios.get('/properties/filter', {
                params: {
                    regionId: regionId,
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


    const createRegionsSelect = (items) => {

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
        const propsCatsSelect = document.getElementById('select_props_cats');
        selectRegion.value = 0;
        propsCatsSelect.value = 0;
    };

    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    return (
        <form
            id="form_filters"
            className="flex flex-col p-4 border-2 rounded-md w-full gap-4 mt-8"
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
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(00px,_1fr))] gap-4 sm:gap-8 items-center">
                {isLoadingPropsCats
                    ? showLoaderSelect()
                    : createRegionsSelect(regions)}
                {isLoadingPropsCats
                    ? showLoaderSelect()
                    : createPropsCatsSelect(propertyCategories)}
            </div>
            <div className="flex flex-col items-center gap-4  w-full sm:flex-row">
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
