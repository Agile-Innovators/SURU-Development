import { useEffect, useState } from 'react';
import { AdvancedCard } from '../../components/ui/cards/AdvancedCard';
import { SearchFilter } from '../../components/ui/search/SearchFilters';
import { useFetchFilter } from '../../components/hooks/useFetchFilter';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { FilterModal } from '../../components/ui/modals/FilterModal';
import { LayoutModal } from '../../components/ui/modals/LayoutModal';
import { useFetchUserFavoritesIDs } from '../../components/hooks/useFetchUserFavoritesIDs';

export function Search() {
    const { data, isLoading, filterUsed, regionId, propertyTypeId } =
        useFetchFilter();
    const { userFavoritesIDs } = useFetchUserFavoritesIDs();
    const navigate = useNavigate();
    const [isLoadingFilter, setIsLoadingFilter] = useState(false);
    const [properties, setProperties] = useState(data);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [regionID, setRegionID] = useState(0);
    const [categoryID, setCategoryID] = useState(0);


    const setFilterProperties = (data) => {
        setProperties(data);
    };

    useEffect(() => {
        if(filterUsed){
            setRegionID(regionId);
            setCategoryID(propertyTypeId);
        }
        // console.log(regionId);
        // console.log(propertyTypeId);
        
        setProperties(data);
    }, [isLoading]);

    const showProperty = (id) => {
        navigate(`${ROUTE_PATHS.PROPERTY_DETAILS.replace(':propertyId', id)}`);
    };

    const showLoaderCards = () => {
        return Array(6)
            .fill(0)
            .map((_, index) => (
                <SkeletonLoader key={index} customClass="h-[25rem] w-full" />
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
            return <span className='dark:text-white'>No properties found</span>;
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
                isLiked={userFavoritesIDs.includes(property.id)}
                propertyId={property.id}
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

    return (
        <section className="max-w-7xl w-full m-auto mt-5 p-4 xl:p-0">
            <LayoutModal customClass="pb-20" status={isOpenModal}>
                <FilterModal
                    handleModal={setIsOpenModal}
                    setProperties={setFilterProperties}
                    isLoadingFilter={setIsLoadingFilter}
                    showCategory={setCategoryID}
                    showRegion={setRegionID}
                />
            </LayoutModal>

            <h2>Search properties</h2>
            <SearchFilter
                setData={setFilterProperties}
                isLoadingFilter={setIsLoadingFilter}
                handleModal={setIsOpenModal}
                categoryID={categoryID}
                regionID={regionID}
                filterUsed={filterUsed}

            />
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-6 mt-10 mb-14">
                {isLoading || isLoadingFilter
                    ? showLoaderCards()
                    : showFilteredProperties(properties)}
            </div>
        </section>
    );
}
