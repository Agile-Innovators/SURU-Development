import { PropTypes } from 'prop-types';
import { HeartIcon } from '../../assets/icons/HeartIcon';
import { MapPin, BedDouble, Bath, Car, PawPrint } from 'lucide-react';

export function AdvancedCard({ srcImage, children, title, location, price, frequency }) {
    return (
        <div className='w-fit rounded-md overflow-hidden border border-light-grey'>
            <div className='relative'>
                <img src={srcImage} alt="image card" />
                <div className='absolute top-3 right-3 p-2 bg-white rounded-full cursor-pointer'>
                    <HeartIcon />
                </div>
            </div>
            <div className='p-4 '>
                <h4>{title}</h4>
                <div className='flex items-center'>
                    <MapPin size={22} strokeWidth={1} color="#C3C8D2"/>
                    <p>{location}</p>
                </div>
                <ul className='flex gap-2 py-1'> 
                    <li className='flex items-center pr-1 border-r-[1px] border-grey'><BedDouble size={22} strokeWidth={1} color="#0A1029"/>1</li>
                    <li className='flex items-center px-1 border-r-[1px] border-grey'><Bath size={22} strokeWidth={1} color="#0A1029"/>2</li>
                    <li className='flex items-center px-1 border-r-[1px] border-grey'><Car size={22} strokeWidth={1} color="#0A1029"/>3</li>
                    <li className='flex items-center'><PawPrint size={22} strokeWidth={1} color="#0A1029"/>Allowed</li>
                </ul>
                <div className='flex justify-between items-center'>
                    <h3>₡{price} <span className='text-light-grey'>{frequency}</span></h3>
                    {children}
                </div>
            </div>
        </div>
    )
}

AdvancedCard.propTypes = {
    srcImage: PropTypes.string,
    children: PropTypes.children,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    frequency: PropTypes.string.isRequired
}