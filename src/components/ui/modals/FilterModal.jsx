import { Input } from '../forms/Input';
import { MainButton } from '../buttons/MainButton';
import { SecondaryFilterTag } from './../buttons/SecondaryFilterTag';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useFetchPropertyCategories } from '../../hooks/useFetchPropertyCategories';
import { useFetchRegions } from './../../hooks/useFetchRegions';
import { useFetchPropertyTransactionTypes } from '../../hooks/useFetchPropertyTransactionTypes';
import { SkeletonLoader } from '../SkeletonLoader';
import { useAxios } from '../../hooks/useAxios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function FilterModal({ handleModal, setProperties, isLoadingFilter }) {
    const [data, setData] = useState({ allow_pets: 0, green_area: 0 });
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
    const [currencyId, setCurrencyId] = useState(2);
    const [rentPrice, setRentPrice] = useState(0);
    const [depositPrice, setDepositPrice] = useState(0);

    const [utilities, setUtilities] = useState([]);
    const { regions, isLoadingRegions } = useFetchRegions();
    const { propertyCategories, isLoadingPropsCats } =
        useFetchPropertyCategories();
    const { transacTypes, isLoadingTransacTypes } =
        useFetchPropertyTransactionTypes();
    const axios = useAxios();

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

    const clearFilterModal = () => {
        handleOpenModal();
        setData({ allow_pets: 0, green_area: 0 });
        setIsActiveAllowPets(false);
        setIsActiveGreenArea(false);
        setIsActiveWifi(false);
        setIsActiveFurnished(false);
        setMinPrice(0);
        setMaxPrice(0);
        setBedrooms(0);
        setBathrooms(0);
        setFloors(0);
        setPools(0);
        setGarages(0);
        setSize(0);
        setPropertyCategory(0);
        setPropertyTransaction(1);
        setRegion(0);
        setUtilities([]);
        setCurrencyId(1);
        setRentPrice(0);
        setDepositPrice(0);
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        //data always present
        let payload = {
            ...data,
            regionId: region,
            propertyCategoryId: propertyCategory,
            propertyTransactionId: propertyTransaction,
            currencyId: currencyId,
            utilities: utilities,
            size_in_m2: size,
        };

        //sale and dual transaction
        if (propertyTransaction == 1 || propertyTransaction == 3) {
            payload = {
                ...payload,
                minPrice: minPrice,
                maxPrice: Number(maxPrice),
            };
        }
        //rent and dual transaction
        if (propertyTransaction == 2 || propertyTransaction == 3) {
            console.log("rent")
            payload = {
                ...payload,
                rentPrice: rentPrice,
                depositPrice: depositPrice,
            };
        }

        //property categories (House, apartment, studio)
        if (
            propertyCategory == 1 ||
            propertyCategory == 2 ||
            propertyCategory == 5
        ) {
            payload = {
                ...payload,
                qtyBedrooms: bedrooms,
                qtyBathrooms: bathrooms,
                qtyFloors: floors,
                qtyPools: pools,
                qtyGarages: garages,
            };
        }
        //property category retail space
        if(propertyCategory == 4){
            payload = {
                ...payload,
                qtyBathrooms: bathrooms,
            }
        }

        console.log(propertyTransaction)
        if (maxPrice !== 'max' && propertyTransaction != 2 ) {
            if (minPrice >= maxPrice) {
                toast.error('min price must not be higher than the max price', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
                return;
            }
        }
        console.log(payload);
        // return;
        isLoadingFilter(true);
        try {
            clearFilterModal();
            const response = await axios.get('/properties/filter', {
                params: payload,
            });
            const data = await response.data;
            console.log(data);
            setProperties(data);
            isLoadingFilter(false);
        } catch (error) {
            console.log(error);
            isLoadingFilter(false);
        }
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
                    className="block text-sm font-medium text-gray-700  mb-2"
                >
                    Property Transaction
                </label>
                <select
                    id="select_transaction_type"
                    name={`select_transaction_type`}
                    value={propertyTransaction}
                    onChange={(e) => setPropertyTransaction(e.target.value)}
                    className="p-3 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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

    const renderSaleTransaction = () => {
        return (
            <>
                <h4>Sale options</h4>
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] mt-4 items-end sm:gap-8">
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
            </>
        );
    };

    const renderRentTransaction = () => {
        return (
            <>
                <h4>Rent options</h4>
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] mt-4 items-center sm:gap-8">
                    <Input
                        labelText={'rentPrice'}
                        inputName={'rentPrice'}
                        inputId={'rent-price-input'}
                        type={'number'}
                        min={0}
                        value={rentPrice}
                        onChange={(e) => setRentPrice(e.target.value)}
                    />
                    <Input
                        labelText={'depositPrice'}
                        inputName={'depositPriceInput'}
                        inputId={'deposit-price-input'}
                        type={'number'}
                        min={0}
                        value={depositPrice}
                        onChange={(e) => setDepositPrice(e.target.value)}
                    />
                </div>
            </>
        );
    };

    return (
        <form
            onSubmit={(e) => handleFilter(e)}
            className="max-h-[90vh] overflow-hidden overflow-y-auto bg-white dark:bg-gray-800 p-4 mt-6 rounded-xl relative h-fit sm:p-8 sm:min-w-[40rem] md:min-w-[50rem]"
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
            <div className="w-full flex justify-between items-center border-b-2">
                <h3>Filters</h3>
                <button onClick={handleOpenModal} type="button">
                    <X className="hover:text-blue-500" />
                </button>
            </div>
            <div className="mt-4">
                <div>
                    <h4>Property details</h4>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] mt-4 mb-4 gap-4 sm:gap-6">
                        <div className="grid ">
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
                        <div className="grid gap-1">
                            <label htmlFor="currencySelect">Currency</label>
                            <select
                                id="currencySelect"
                                name={`currencySelect`}
                                value={currencyId}
                                onChange={(e) => setCurrencyId(e.target.value)}
                                className="currencySelect w-full h-12 mb-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            >
                                <option value="1">USD</option>
                                <option value="2">CRC</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    {(propertyTransaction == 1 || propertyTransaction == 3) &&
                        renderSaleTransaction()}
                    {(propertyTransaction == 2 || propertyTransaction == 3) &&
                        renderRentTransaction()}
                </div>
                <div>
                    <h4>Structure</h4>
                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] mt-4 sm:gap-6">
                        {(propertyCategory == 1 ||
                            propertyCategory == 2 ||
                            propertyCategory == 5 ||
                            propertyCategory == 0) && (
                            <>
                                <Input
                                    labelText={'Bedrooms'}
                                    type={'number'}
                                    min={0}
                                    value={bedrooms}
                                    onChange={(e) =>
                                        setBedrooms(e.target.value)
                                    }
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
                            </>
                        )}
                        {propertyCategory != 3 && (
                            <Input
                                labelText={'Bathrooms'}
                                type={'number'}
                                min={0}
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                            />
                        )}
                        <Input
                            labelText={'Size in m2'}
                            type={'number'}
                            min={0}
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            customClass="w-fit"
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
