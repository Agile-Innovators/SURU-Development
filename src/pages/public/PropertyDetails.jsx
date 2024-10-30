import { AdvancedCard } from '../../components/ui/cards/AdvancedCard';
import { MapPin } from 'lucide-react';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { BackButton } from '../../components/ui/buttons/BackButton';
import { useFetchPropertyDetails } from '../../components/hooks/useFetchPropertyDetails.js';
import { ImageCarrusel } from '../../components/activity/property_details_components/PropertyFeatures.jsx';
import { PropertyFeatures } from '../../components/activity/property_details_components/Utilities.jsx';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader.jsx';
import { PropertyPricingDetails } from '../../components/activity/property_details_components/PropertyPricingDetails.jsx';
import { useFetchRelatedProperties } from '../../components/hooks/useFetchRelatedProperties.js';
import { formatPrice, useShowProperty } from '../../components/hooks/utils.js';

export function PropertyDetails() {
    const { propertyDetails, isLoadingPropsDetails } = useFetchPropertyDetails();
    const { property = {} } = propertyDetails || {};
    const { relatedProperties, isLoading: isLoading } = useFetchRelatedProperties(property.id || null);

    const showProperty = useShowProperty();

    const showLoaderCards = () => {
        return Array(1)
            .fill(0)
            .map((_, index) => (
                <SkeletonLoader
                    key={`card-${index}`}
                    customClass="h-[27rem] w-full"
                />
            ));
    };

    const showGeneralInformaction = (property) => {
        return (
            <div className="flex flex-col gap-2">
                {/* Inicio Detalles Generales */}
                <h2>{property.title}</h2>
                <div className="flex">
                    <MapPin />
                    <h4 className="font-medium text-md">
                        {property.city}, {property.region}
                    </h4>
                </div>
                <p>{property.description}</p>
                {/* Fin Detalles Generales */}
                {/* Inicio Features*/}
                <PropertyFeatures property={property} />
                {/* Fin Features*/}
                <div className="flex flex-col gap-1 mt-5">
                    <h3>Property Details</h3>
                    <p>
                        <b>Availability Date:</b> {property.availability_date}.
                    </p>
                    <p>
                        <b>Property Category:</b> {property.property_category}
                    </p>
                    {/* <p><b>Specific Direction:</b> 175 meters north of Tierra Mia Restaurant, near Arenal Volcano National Park.</p> */}
                </div>
            </div>
        );
    };

    const createProperties = (properties) => (
        properties.map((property) => (
            <AdvancedCard
                srcImage={property.image || 'imagen/predeterminada'}
                title={property.title}
                location={`${property.city}, ${property.region}`}
                price={formatPrice(property.price || property.rent_price)}
                frequency={property.payment_frequency || ''}
                qtyBedrooms={property.bedrooms || 0}
                qtyBathrooms={property.bathrooms || 0}
                qtyGarages={property.garages || 0}
                key={property.id}
                propertyId={property.id}
                customClass="m-auto"
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
        ))
    );

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-4 my-4">
            <BackButton />
            {/* Carrusel */}
            <ImageCarrusel
                propertyTemp={property}
                isLoading={isLoadingPropsDetails}
            />
            {/* Fin Carrusel */}

            <div className="grid grid-cols-[1fr] sm:grid-cols-[2fr_1fr] gap-4 mt-6">
                {/* Detalles Generales */}
                {isLoadingPropsDetails
                    ? showLoaderCards()
                    : showGeneralInformaction(property)}
                {/* Fin Detalles Generales */}

                {/* Detalles de Precios */}
                <PropertyPricingDetails
                    propertyTemp={property}
                    isLoading={isLoadingPropsDetails}
                />
            </div>

            <div className="mt-10">
                <h2>You may also like</h2>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 justify-center items-center mt-4">
                    {isLoading ? showLoaderCards() : createProperties(relatedProperties)}
                </div>
            </div>
        </div>
    );
}
