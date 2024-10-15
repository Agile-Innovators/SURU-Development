import { useContext, useEffect, useState } from 'react';
import { AdvancedCard } from '../../components/ui/cards/AdvancedCard';
import { SearchFilter } from '../../components/ui/search/SearchFilters';
import { globalProvider } from '../../global/GlobalProvider';
import { useFetchFilter } from '../../components/hooks/useFetchFilter';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { FilterModal } from '../../components/ui/modals/FilterModal';
import { LayoutModal } from '../../components/ui/modals/LayoutModal';

export function Search() {
    const {
        regionId,
        minPrice,
        maxPrice,
        propertyTypeId,
        isFilterUsed,
        setPropertyID,
    } = useContext(globalProvider);
    const { data, isLoading } = useFetchFilter();
    const navigate = useNavigate();
    const [isLoadingFilter, setIsLoadingFilter] = useState(false);
    const [properties, setProperties] = useState(data);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const setFilterProperties = (data) => {
        setProperties(data);
    };

    useEffect(() => {
        setProperties(data);
    }, [isLoading]);

    const showProperty = (id) => {
        setPropertyID(id);
        console.log('ID HOME:', id);
        navigate(ROUTE_PATHS.PROPERTY_DETAILS);
    };

    const showLoaderCards = () => {
        return Array(6)
            .fill(0)
            .map((_, index) => (
                <SkeletonLoader
                    key={`card-${index}`}
                    customClass="h-[25rem] w-full"
                />
            ));
    };

    const formatPrice = (price) => {
        if (price >= 1e9) return `${(price / 1e9).toFixed(1)}B`;
        if (price >= 1e6) return `${(price / 1e6).toFixed(1)}M`;
        if (price >= 1e3) return `${(price / 1e3).toFixed(1)}K`;
        return price.toString();
    };

    function showFilteredProperties(properties) {
        if (!properties || properties.length === 0) {
            return <span>No properties found</span>;
        }

        return properties.map((property) => (
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
                    property.payment_frequency ? property.payment_frequency : ''
                }
                currency_code={property.currency_code}
                qtyBedrooms={property.bedrooms ? property.bedrooms : 0}
                qtyBathrooms={property.bathrooms ? property.bathrooms : 0}
                qtyGarages={property.garages ? property.garages : 0}
                key={property.id}
                customClass={'m-auto'}
            >
                <MainButton
                    text="View"
                    variant="border"
                    customClass="h-fit"
                    type="button"
                    id={property.id}
                    onClick={() => showProperty(property.id)}
                />
            </AdvancedCard>
        ));
    }

    console.log(regionId, minPrice, maxPrice, propertyTypeId, isFilterUsed);
    return (
        <section className="max-w-7xl m-auto mt-5 p-4 xl:p-0">
            <LayoutModal customClass="pb-20" status={isOpenModal}>
                <FilterModal
                    handleModal={setIsOpenModal}
                    setProperties={setFilterProperties}
                    isLoadingFilter={setIsLoadingFilter}
                />
            </LayoutModal>

            <h2>Search properties</h2>
            <SearchFilter
                setData={setFilterProperties}
                isLoadingFilter={setIsLoadingFilter}
                handleModal={setIsOpenModal}
            />
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 mt-8 mb-5">
                {isLoading || isLoadingFilter
                    ? showLoaderCards()
                    : showFilteredProperties(properties)}
            </div>
        </section>
    );
}
