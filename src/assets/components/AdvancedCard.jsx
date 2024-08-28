import { PropTypes } from 'prop-types';
import { HeartIcon } from './icons/HeartIcon';

export function AdvancedCard({srcImage, children}){
    return(
        <div className='w-fit rounded-md overflow-hidden border border-light-grey'>
            <div className='relative'>
                <img src={srcImage} alt="image card" />
                <div className='absolute top-3 right-3 p-2 bg-white rounded-full cursor-pointer'>
                    <HeartIcon/>
                </div>
            </div>
            <div className='p-4'>
                <h4>Titulo de la card</h4>
                <p>Localizacion de la propiedad</p>
                <ul className='flex'>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>1</li>
                </ul>
                <div className='flex justify-between items-center'>
                    <h3>₡170 000 <span className='text-light-grey'>monthly</span></h3>
                    {children}
                </div>
            </div>
        </div>
    )
}

AdvancedCard.propTypes = {
    srcImage: PropTypes.string,
    children: PropTypes.children
}