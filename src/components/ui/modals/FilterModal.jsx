import { Input } from '../forms/Input';
import { MainButton } from '../buttons/MainButton';
import { SecondaryFilterTag } from './../buttons/SecondaryFilterTag';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useFetchPropertyCategories } from '../../hooks/useFetchPropertyCategories';
import { useFetchRegions } from './../../hooks/useFetchRegions';
import { useFetchPropertyTransactionTypes } from '../../hooks/useFetchPropertyTransactionTypes';
import { SkeletonLoader } from '../SkeletonLoader';

export function FilterModal({ handleModal }) {
    const [data, setData] = useState({});
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [floors, setFloors] = useState(0);
    const [pools, setPools] = useState(0);
    const [garages, setGarages] = useState(0);
    const [size, setSize] = useState(0);
    const [propertyCategory, setPropertyCategory] = useState(0);
    const [propertyTransaction, setPropertyTransaction] = useState(1);
    const [region, setRegion] = useState(0);
    const [isActiveAllowPets, setIsActiveAllowPets] = useState(false);
    const [isActiveGreenArea, setIsActiveGreenArea] = useState(false);
    const [isActiveWifi, setIsActiveWifi] = useState(false);
    const [isActiveFurnished, setIsActiveFurnished] = useState(false);

    const [utilities, setUtilities] = useState([]);
    const { regions, isLoadingRegions } = useFetchRegions();
    const { propertyCategories, isLoadingPropsCats } =
        useFetchPropertyCategories();
    const { transacTypes, isLoadingTransacTypes } =
        useFetchPropertyTransactionTypes();

    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    const handleData = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleUtilitiesData = (value, method) => {
        if (method === 'remove') {
            setUtilities((prevUtilities) =>
                prevUtilities.filter((utility) => utility !== value)
            );
        } else {
            setUtilities((prevUtilities) => [...prevUtilities, value]);
        }
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        console.log('Min price: ', minPrice);
        console.log('Max price: ', maxPrice);
        console.log('bedrooms: ', bedrooms);
        console.log('bathrooms: ', bathrooms);
        console.log('floors: ', floors);
        console.log('pools: ', pools);
        console.log('garages: ', garages);
        console.log('size: ', size);
        console.log('region: ', region);
        console.log('transaction: ', propertyTransaction);
        console.log('Category: ', propertyCategory);
        console.log(data);
        console.log(utilities)
    };

    const renderRegionSelect = (items) => {
        return (
            <>
                <label
                    htmlFor={'select_regions'}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Region
                </label>
                <select
                    id="select_regions"
                    name={`select_regions`}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                >
                    <option value="0">all</option>
                    {items.map((region) => (
                        <option key={`region_${region.id}`} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </select>
            </>
        );
    };

    const renderPropsCatsSelect = (items) => {
        return (
            <>
                <label
                    htmlFor={'select_categories'}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Property Category
                </label>
                <select
                    id="select_categories"
                    name={`select_categories`}
                    value={propertyCategory}
                    onChange={(e) => setPropertyCategory(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value="0">all</option>
                    {items.map((category) => (
                        <option
                            key={`region_${category.id}`}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </>
        );
    };

    const renderTransacTypesSelect = (items) => {
        return (
            <>
                <label
                    htmlFor={'select_categories'}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Property Transaction
                </label>
                <select
                    id="select_transaction_type"
                    name={`select_transaction_type`}
                    value={propertyTransaction}
                    onChange={(e) => setPropertyTransaction(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    {items.map((transaction) => (
                        <option
                            key={`transaction_${transaction.id}`}
                            value={transaction.id}
                        >
                            {transaction.name}
                        </option>
                    ))}
                </select>
            </>
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

    return (
        <form
            onSubmit={(e) => handleFilter(e)}
            className="max-h-[90vh] overflow-hidden overflow-y-auto bg-white p-4 mt-6 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-[40rem] md:min-w-[50rem]"
        >
            <div className="w-full flex justify-between items-center border-b-2">
                <h3>Filters</h3>
                <button onClick={handleOpenModal}>
                    <X className="hover:text-blue-500" />
                </button>
            </div>
            <div className="mt-4">
                <div>
                    <h4>Price range</h4>
                    <div className="grid mt-4 sm:grid-cols-2 sm:gap-8">
                        <Input
                            labelText={'minPrice'}
                            inputName={'minPriceInput'}
                            inputId={'min-price-input'}
                            type={'number'}
                            min={0}
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <Input
                            labelText={'maxPrice'}
                            inputName={'maxPriceInput'}
                            inputId={'max-price-input'}
                            type={'number'}
                            min={0}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h4>Property details</h4>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] mt-4 mb-4 gap-4 sm:gap-8">
                        <div className="grid">
                            {isLoadingPropsCats
                                ? showLoaderSelect()
                                : renderPropsCatsSelect(propertyCategories)}
                        </div>
                        <div className="grid">
                            {isLoadingTransacTypes
                                ? showLoaderSelect()
                                : renderTransacTypesSelect(transacTypes)}
                        </div>
                        <div className="grid">
                            {isLoadingRegions
                                ? showLoaderSelect()
                                : renderRegionSelect(regions)}
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Structure</h4>
                    <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] mt-4 sm:gap-6">
                        <Input
                            labelText={'Bedrooms'}
                            type={'number'}
                            min={0}
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                        />
                        <Input
                            labelText={'Bathrooms'}
                            type={'number'}
                            min={0}
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                        <Input
                            labelText={'Floors'}
                            type={'number'}
                            min={0}
                            value={floors}
                            onChange={(e) => setFloors(e.target.value)}
                        />
                        <Input
                            labelText={'Pools'}
                            type={'number'}
                            min={0}
                            value={pools}
                            onChange={(e) => setPools(e.target.value)}
                        />
                        <Input
                            labelText={'Garages'}
                            type={'number'}
                            min={0}
                            value={garages}
                            onChange={(e) => setGarages(e.target.value)}
                        />
                        <Input
                            labelText={'Size in m2'}
                            type={'number'}
                            min={0}
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h4>Included Utilities</h4>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <SecondaryFilterTag
                            text={'Allows Pets'}
                            fillData={(value) =>
                                handleData('allow_pets', value)
                            }
                            isActivate={isActiveAllowPets}
                            manageExternalState={setIsActiveAllowPets}
                        />
                        <SecondaryFilterTag
                            text={'Green Area'}
                            fillData={(value) =>
                                handleData('green_area', value)
                            }
                            isActivate={isActiveGreenArea}
                            manageExternalState={setIsActiveGreenArea}
                        />
                        <SecondaryFilterTag
                            text={'Wifi'}
                            idValue={4}
                            handleSelectedValue={handleUtilitiesData}
                            isActivate={isActiveWifi}
                            manageExternalState={setIsActiveWifi}
                        />
                        <SecondaryFilterTag
                            text={'Furnished'}
                            idValue={3}
                            handleSelectedValue={handleUtilitiesData}
                            isActivate={isActiveFurnished}
                            manageExternalState={setIsActiveFurnished}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-end mt-4">
                    <MainButton text="search" type={'submit'} />
                </div>
            </div>
        </form>
    );
}