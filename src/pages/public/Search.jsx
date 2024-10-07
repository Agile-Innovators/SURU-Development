import { useContext, useEffect, useState } from 'react';
import { AdvancedCard } from '../../components/ui/cards/AdvancedCard';
import { SearchFilter } from '../../components/ui/search/SearchFilters';
import { globalProvider } from '../../global/GlobalProvider';
import { useFetchFilter } from '../../components/hooks/useFetchFilter';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';

export function Search() {
    //llamar una funcion global que vacie los estados, propuesta
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
    const [ isLoadingFilter, setIsLoadingFilter ] = useState(false);

    //testing
    const [properties, setProperties] = useState(data);

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

    function showFilteredProperties(properties) {
        if (!properties || properties.length === 0) {
            return <h2>Not found</h2>;
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
                price={property.price ? property.price : property.rent_price}
                frequency={
                    property.payment_frequency ? property.payment_frequency : ''
                }
                qtyBedrooms={property.bedrooms ? property.bedrooms : 0}
                qtyBathrooms={property.bathrooms ? property.bathrooms : 0}
                qtyGarages={property.garages ? property.garages : 0}
                key={property.id}
                customClass={'m-auto'}
            >
                <MainButton
                    text="View"
                    variant="border"
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
            <h2>Search properties</h2>
            <SearchFilter setData={setFilterProperties} isLoadingFilter={setIsLoadingFilter}/>

            <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 mt-8 mb-5">
                {isLoading || isLoadingFilter
                    ? showLoaderCards()
                    : showFilteredProperties(properties)}
            </div>
        </section>
    );
}
