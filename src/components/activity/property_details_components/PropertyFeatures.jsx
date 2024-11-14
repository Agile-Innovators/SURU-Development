import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SkeletonLoader } from '../../ui/SkeletonLoader.jsx';

export function ImageCarrusel({ propertyTemp, isLoading }) {
    const property = propertyTemp;
    
    const showLoaderCards = () => {
        return (
            <SwiperSlide>
                <SkeletonLoader customClass="h-[45vh] w-full object-cover rounded-md my-4" />
            </SwiperSlide>
        )
    }

    const createCards = (property) => {
        return (
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                spaceBetween={10}
                slidesPerView={1}
                className="rounded-md mt-4 w-full max-w-[20rem] sm:w-[38rem] sm:max-w-[40rem] md:w-[45rem] md:max-w-[50rem] lg:w-full lg:max-w-full"
            >
                {property.images && property.images.length > 0 ? (
                    property.images.map((image) => {
                        return (
                            <SwiperSlide key={image.id}>
                                <img className='h-[45vh] w-full object-cover rounded-md'
                                    src={image.url}
                                    alt="Property Image" />
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <p>No images available</p>
                )}
            </Swiper>
        );
    };
    
    return (
        <div>
            {isLoading
                ? showLoaderCards()
                : createCards(property)}
        </div>

    );
};