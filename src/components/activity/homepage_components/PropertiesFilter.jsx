import { useContext } from 'react';
import { AdvancedCard } from '../../ui/cards/AdvancedCard.jsx';
import { Divider } from '@mui/joy';
import { MainButton } from '../../ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { useNavigate } from 'react-router-dom';
import { useFetchRegions } from '../../hooks/useFetchRegions.js';
import { useFetchPropertyCategories } from '../../hooks/useFetchPropertyCategories.js';
import { globalProvider } from '../../../global/GlobalProvider.jsx';
import { useFetchProperties } from '../../hooks/useFetchProperties.js';
import { SkeletonLoader } from '../../ui/SkeletonLoader.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchUserFavoritesIDs } from './../../hooks/useFetchUserFavoritesIDs';
import { useAuth } from '../../../global/AuthProvider.jsx';
// import { getUser } from '../../../global/AuthProvider.jsx';

export function PropertiesFilter() {
    const {
        setRegionId,
        // setMinPrice,
        // setMaxPrice,
        setPropertyTypeId,
        setIsFilterUsed,
        setPropertyID,
    } = useContext(globalProvider);
    const navigate = useNavigate();
    const { regions, isLoadingRegions } = useFetchRegions();
    const { propertyCategories, isLoadingPropsCats } =
        useFetchPropertyCategories();
    const { properties, isLoadingProps } = useFetchProperties();
    const { userFavoritesIDs, isLoadingFavoritesIDs } = useFetchUserFavoritesIDs();
    
    const { getUser } = useAuth();
    const user = getUser().user;

    const formatPrice = (price) => {
        if (price >= 1e9) return `${(price / 1e9).toFixed(1)}B`;
        if (price >= 1e6) return `${(price / 1e6).toFixed(1)}M`;
        if (price >= 1e3) return `${(price / 1e3).toFixed(1)}K`;
        return price.toString();
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

    const createProperties = (properties) => {
        return properties.slice(0, 6).map((property) => {
            return (
                <AdvancedCard
                    srcImage={
                        property.images && property.images.length > 0
                            ? property.images[0].url
                            : 'imagen/predeterminada'
                    }
                    title={property.title}
                    location={`${property.city}, ${property.region}`}
                    price={formatPrice(
                        property.price ? property.price : property.rent_price
                    )}
                    frequency={
                        property.payment_frequency
                            ? property.payment_frequency
                            : ''
                    }
                    qtyBedrooms={property.bedrooms ? property.bedrooms : 0}
                    qtyBathrooms={property.bathrooms ? property.bathrooms : 0}
                    qtyGarages={property.garages ? property.garages : 0}
                    key={property.id}
                    //isLiked={user && userFavoritesIDs.includes(property.id)}
                    propertyId={property.id}
                    customClass={'m-auto'}
                >
                    <MainButton
                        text="View"
                        variant="border"
                        type="button"
                        id={property.id}
                        customClass="h-fit"
                        onClick={() => showProperty(property.id)}
                    />
                </AdvancedCard>
            );
        });
    };

    const showLoaderCards = () => {
        return Array(6)
            .fill(0)
            .map((_, index) => (
                <SkeletonLoader
                    key={`card-${index}`}
                    customClass="h-[27rem] w-full"
                />
            ));
    };

    const showLoaderSelect = () => {
        return (
            <div className="w-full gap-1 lg:w-auto flex flex-col">
                <SkeletonLoader customClass="h-8 w-full sm:w-32" />
                <SkeletonLoader customClass="h-8 w-full sm:w-32" />
            </div>
        );
    };

    const selectPriceOptions = [
        {
            id: 'price',
            label: 'Price',
            options: [
                { value: '0', label: '₡0' },
                { value: '100000', label: '₡100,000' },
                { value: '200000', label: '₡200,000' },
                { value: '300000', label: '₡300,000' },
                { value: '400000', label: '₡400,000' },
                { value: '500000', label: '₡500,000' },
                { value: '600000', label: '₡600,000' },
            ],
        },
    ];

    function filter(event) {
        event.preventDefault();
        //obtener valor de los select
        const selectRegion = document.getElementById('select_regions').value;
        // const minPrice = document.getElementById('select_min_price').value;
        // const maxPrice = document.getElementById('select_max_price').value;
        const propertyCategory =
            document.getElementById('select_props_cats').value;

        

        //validar si no se selecciono el precio maximo
        // if (maxPrice !== 'max') {
        //     //verificar que el minPrice no sea mayor
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

        //cargar datos para el globalProvider
        setRegionId(selectRegion);
        // setMinPrice(minPrice);
        // setMaxPrice(maxPrice);
        setPropertyTypeId(propertyCategory);
        setIsFilterUsed(true);

        navigate(ROUTE_PATHS.SEARCH);
    }

    // Por esto
    const showProperty = (id) => {
        setPropertyID(id);
        // console.log('ID HOME:', id);
        navigate(ROUTE_PATHS.PROPERTY_DETAILS);
    };

    const clearFilter = (e) => {
        e.preventDefault();
        const selectRegion = document.getElementById('select_regions');
        const minPriceSelect = document.getElementById('select_min_price');
        const maxPriceSelect = document.getElementById('select_max_price');
        const propsCatsSelect = document.getElementById('select_props_cats');
        selectRegion.value = 0;
        minPriceSelect.value = selectPriceOptions[0].options[0].value;
        maxPriceSelect.value = 'max';
        propsCatsSelect.value = 0;
    };

    return (
        <section className="mt-20">
            <div className="text-center flex flex-col items-center gap-6 px-4 py-8">
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
                                Min Price
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
                                Max Price
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

                    <Divider orientation="vertical" flexItem />
                    <div className="flex flex-col gap-2 w-full sm:flex-row lg:w-auto">
                        <MainButton
                            text="Search"
                            type="submit"
                            customClass="p-3 w-full lg:w-fit"
                            to={ROUTE_PATHS.PROPERTY_DETAILS}
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
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 justify-center items-center mt-10">
                {isLoadingProps
                    ? showLoaderCards()
                    : createProperties(properties)}
            </div>
        </section>
    );
}
