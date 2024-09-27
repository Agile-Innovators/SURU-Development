// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export function PropertyDetails() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-2 my-4">
            <Swiper

                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <SwiperSlide className="">
                        <img
                            className="aspect-square w-[30rem] mx-auto md:w-full"
                            src="/images/Group 104.png"
                            alt="Landing Page Image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}