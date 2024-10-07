import { PropTypes } from 'prop-types';
import { HeartIcon } from '../../../assets/icons/HeartIcon';
import { MapPin, BedDouble, Bath, Car, PawPrint } from 'lucide-react';

export function AdvancedCard({
    srcImage,
    children,
    title,
    location,
    price,
    frequency,
    qtyBedrooms,
    qtyBathrooms,
    qtyGarages,
    currency_code = 'CRC',
}) {
    return (
        <div className="rounded-md overflow-hidden border border-light-grey">
            <div className="overflow-hidden relative">
                <div className="absolute top-3 right-3 p-2 size-12 bg-white border-2 border-white bg-opacity-75 rounded-full cursor-pointer">
                    <HeartIcon />
                </div>
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
                            className="mr-2 text-secondary"
                        />
                        {qtyBedrooms}
                    </li>
                    <li className="flex items-center px-1 border-r-[1px] pr-2 border-grey">
                        <Bath
                            size={22}
                            strokeWidth={1}
                            className="mr-2 text-secondary"
                        />
                        {qtyBathrooms}
                    </li>
                    <li className="flex items-center px-1 border-r-[1px] pr-2 border-grey">
                        <Car
                            size={22}
                            strokeWidth={1}
                            className="mr-2 text-secondary"
                        />
                        {qtyGarages}
                    </li>
                    <li className="flex items-center px-1 pr-2 border-grey">
                        <PawPrint
                            size={22}
                            strokeWidth={1}
                            className="mr-2 text-secondary"
                        />
                        Allowed
                    </li>
                </ul>
                <div className="flex flex-col justify-between mt-3 mb-2 sm:flex-row items-center">
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
};
