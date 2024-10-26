import { PropTypes } from 'prop-types';
import { MapPin, BedDouble, Bath, Car, PawPrint } from 'lucide-react';
import { LikeButton } from '../buttons/LIkeButton';
import { useAuth } from '../../../global/AuthProvider';

export function AdvancedCard({
    srcImage = "https://via.placeholder.com/300",
    children = null,
    title = 'Title',
    location = 'Location',
    price = 0,
    frequency = 'Frequency',
    qtyBedrooms = 0,
    qtyBathrooms = 0,
    qtyGarages = 0,
    currency_code = 'CRC',
    isLiked = false,
    propertyId = 0,
    refreshFavorites = null,
}) {
    const { getUser } = useAuth();
    const { user } = getUser();
    return (
        <div className="rounded-md overflow-hidden border border-light-grey">
            <div className="overflow-hidden relative">
                {/* Se muestra el botón de me gusta solo si el usuario está loggeado */}
                {user && (
                    <LikeButton
                        isLiked={isLiked}
                        propertyId={propertyId}
                        refreshFavorites={refreshFavorites}
                    />
                )}

                <img
                    className="w-full object-cover aspect-video"
                    src={srcImage}
                    alt={title}
                />
            </div>
            <section className="p-4">
                <h5 className="mb-2">{title}</h5>
                <div className="flex gap-3">
                    <MapPin size={22} strokeWidth={1} className="text-grey" />
                    <p>{location}</p>
                </div>
                <ul className="flex gap-2 py-1 my-2">
                    <li className="flex items-center px-1 border-r-[1px] pr-2 border-grey">
                        <BedDouble
                            size={22}
                            strokeWidth={1}
                            className="mr-2 text-secondary dark:stroke-light-blue"
                        />
                        {qtyBedrooms}
                    </li>
                    <li className="flex items-center px-1 border-r-[1px] pr-2 border-grey">
                        <Bath
                            size={22}
                            strokeWidth={1}
                            className="mr-2 text-secondary dark:stroke-light-blue"
                        />
                        {qtyBathrooms}
                    </li>
                    <li className="flex items-center px-1 border-r-[1px] pr-2 border-grey dark:text-light-blue">
                        <Car
                            size={22}
                            strokeWidth={1}
                            className="mr-2 text-secondary dark:stroke-light-blue"
                        />
                        {qtyGarages}
                    </li>
                    <li className="flex items-center px-1 pr-2 border-grey ">
                        <PawPrint
                            size={22}
                            strokeWidth={1}
                            className="mr-2 text-secondary dark:stroke-light-blue"
                        />
                        Allowed
                    </li>
                </ul>
                <div className="flex justify-between mt-3 mb-1 sm:flex-row items-center">
                    <h3 className="text-xl font-medium">
                        {currency_code === 'USD' ? '$' : '₡'}
                        {price} <span className="text-grey">{frequency}</span>
                    </h3>
                    {children}
                </div>
            </section>
        </div>
    );
}


AdvancedCard.propTypes = {
    srcImage: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    frequency: PropTypes.string.isRequired,
    qtyBedrooms: PropTypes.number.isRequired,
    qtyBathrooms: PropTypes.number.isRequired,
    qtyGarages: PropTypes.number.isRequired,
    currency_code: PropTypes.string,
    isLiked: PropTypes.bool,
    propertyId: PropTypes.number,
    refreshFavorites: PropTypes.func
};

