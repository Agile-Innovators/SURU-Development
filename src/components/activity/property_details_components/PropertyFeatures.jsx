import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function ImageCarrusel({ propertyTemp }) {
    const property = propertyTemp;

    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={10}
            slidesPerView={1}
            className="rounded-md mt-4"
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