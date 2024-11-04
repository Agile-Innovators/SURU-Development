import { AdvancedCard } from './../../components/ui/cards/AdvancedCard';
import { MainButton } from './../../components/ui/buttons/MainButton';
import { useFetchUserFavorites } from '../../components/hooks/useFetchUserFavorites';
import { useState, useEffect, useContext } from 'react';
import { SkeletonLoader } from './../../components/ui/SkeletonLoader';
import { globalProvider } from '../../global/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import BackButton from '../../components/ui/buttons/BackButton';

export function Favorites() {
    const { userFavorites, isLoadingFavorites } = useFetchUserFavorites();
    const [favoritesProperties, setFavoritesProperties] = useState([]);
    const { setPropertyID } = useContext(globalProvider);
    const navigate = useNavigate();

    useEffect(() => {
        setFavoritesProperties(userFavorites);
        console.log('FAVORITES:', userFavorites);
    }, [isLoadingFavorites]);

    //refresca la vista de favoritos si se elimina un item de favoritos
    const refreshFavorites = (propertyId) => {
        setFavoritesProperties((prevFavorites) => {
            return prevFavorites.filter(
                (property) => property.id !== propertyId
            );
        });
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

    const showProperty = (id) => {
        setPropertyID(id);
        // console.log('ID HOME:', id);
        navigate(ROUTE_PATHS.PROPERTY_DETAILS);
    };

    const formatPrice = (price) => {
        if (price >= 1e9) return `${(price / 1e9).toFixed(1)}B`;
        if (price >= 1e6) return `${(price / 1e6).toFixed(1)}M`;
        if (price >= 1e3) return `${(price / 1e3).toFixed(1)}K`;
        return price.toString();
    };

    const createProperties = (properties) => {
        if (properties.length > 0) {
            return properties.map((property) => {
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
                            property.price
                                ? property.price
                                : property.rent_price
                        )}
                        frequency={
                            property.payment_frequency
                                ? property.payment_frequency
                                : ''
                        }
                        qtyBedrooms={property.bedrooms ? property.bedrooms : 0}
                        qtyBathrooms={
                            property.bathrooms ? property.bathrooms : 0
                        }
                        qtyGarages={property.garages ? property.garages : 0}
                        key={property.id}
                        customClass={'m-auto'}
                        isLiked={true}
                        propertyId={property.id}
                        refreshFavorites={refreshFavorites}
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
        } else {
            return <p className="text-center">No favorite properties found</p>;
        }
    };

    return (
        <section className="mx-auto max-w-7xl mb-10">
            
            <div className='w-full flex mt-10 flex-wrap'>
                <BackButton/>
                <h1 className='m-auto text-center'>Favorite Properties</h1>
            </div>
            <div className="mt-10 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
                {isLoadingFavorites
                    ? showLoaderCards()
                    : createProperties(favoritesProperties)}
            </div>
        </section>
    );
}
