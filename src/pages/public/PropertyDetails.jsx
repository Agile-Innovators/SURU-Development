// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { AdvancedCard } from '../../components/ui/cards/AdvancedCard';
import { Bath } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { BedDouble } from 'lucide-react';
import { CarFront } from 'lucide-react';
import { Trees } from 'lucide-react';
import { PawPrint } from 'lucide-react';
import { LandPlot, Droplet, Wifi, Zap, Tv } from 'lucide-react';
import { ROUTE_PATHS } from '../../routes';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { BackButton } from '../../components/ui/buttons/BackButton';
export function PropertyDetails() {
    return (

        <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-4 my-4">
            <BackButton />
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className='rounded-md mt-4'
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <SwiperSlide>
                        <img className="h-[45vh] w-full object-cover rounded-md"
                            src="/images/house-image.png"
                            alt="Landing Page Image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="grid grid-cols-[1fr] sm:grid-cols-[2fr_1fr] gap-4 mt-6">
                <div className="flex flex-col gap-2">
                    <h2>Sunnyview House</h2>
                    <div className="flex">
                        <MapPin />
                        <h4 className='font-medium text-md'>Costa Rica, Alajuela, La Fortuna.</h4>
                    </div>
                    <p>
                        This charming home is nestled in a peaceful neighborhood in La Fortuna,
                        surrounded by lush greenery and scenic mountain views. Just a short drive
                        from local schools, supermarkets, and dining options, it offers the perfect
                        balance of nature and convenience. The welcoming community makes it an ideal
                        spot for those seeking tranquility while staying connected.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                        <div className=" w-full h-full flex flex-col justify-between">
                            <BedDouble size={40} strokeWidth={1.5} />
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">3</b>
                                <p>bedrooms</p>
                            </div>
                        </div>
                        <div className=" w-full h-full flex flex-col justify-between">
                            <Bath size={40} strokeWidth={1.5} />
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">3</b>
                                <p>bathrooms</p>
                            </div>
                        </div>
                        <div className=" w-full h-full flex flex-col justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7c2727" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stairs"><rect width="10" height="4" x="2" y="16" /><rect width="10" height="4" x="4" y="12" /><rect width="10" height="4" x="6" y="8" /><rect width="10" height="4" x="8" y="4" /><path d="M12 20h10V4h-4" /></svg>
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">2</b>
                                <p>floors</p>
                            </div>
                        </div>
                        <div className=" w-full h-full flex flex-col justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves">
                                <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                            </svg>
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">1</b>
                                <p>pool</p>
                            </div>
                        </div>
                        <div className=" w-full h-full flex flex-col justify-between">
                            <CarFront size={40} strokeWidth={1.5} />
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">1</b>
                                <p>garage</p>
                            </div>
                        </div>
                        <div className=" w-full h-full flex flex-col justify-between">
                            <Trees size={40} strokeWidth={1.5} />
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">2</b>
                                <p>backyards</p>
                            </div>
                        </div>
                        <div className=" w-full h-full flex flex-col justify-between">
                            <PawPrint size={40} strokeWidth={1.5} />
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">Allows</b>
                                <p>pets</p>
                            </div>
                        </div>
                        <div className=" w-full h-full flex flex-col justify-between">
                            <LandPlot size={40} strokeWidth={1.5} />
                            <div className="flex items-baseline space-x-1">
                                <b className="font-bold">245</b>
                                <p>m²</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 mt-5'>
                        <h3>Property Details</h3>
                        <p><b>Availability Date:</b> June 13, 2024.</p>
                        <p><b>Specific Direction:</b> 175 meters north of Tierra Mia Restaurant, near Arenal Volcano National Park.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className="flex flex-col border-2 gap-2 rounded-md p-4">
                        <h3>Pricing details</h3>
                        <div className='flex justify-between'>
                            <p>Rental Payment</p>
                            <p className="font-medium">$ 200,000</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Security Deposit:</p>
                            <p className="font-medium">$ 200,000</p>
                        </div>
                        <MainButton text='Scheduled a visit' variant="border" customClass='mt-4' />
                        <MainButton text='Get Property' />
                    </div>
                    <div className="flex flex-col border-2 rounded-md p-4 gap-2">
                        <h3>Included Utilities</h3>
                        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                            <div className='flex flex-col items-center gap-2'>
                                <Droplet />
                                <p>Water</p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <Wifi />
                                <p>Wi-Fi</p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <Zap />
                                <p>Electricity</p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <Tv />
                                <p>Cable</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex gap-4 justify-between w-fit border-2 rounded-lg p-4 mt-10'>
                <div className='w-[10rem] overflow-hidden rounded-lg'>
                    <img src="https://picsum.photos/id/77/450/300" alt="" className='w-full object-cover h-full' />
                </div>
                <section>
                    <h6 className='text-lg font-semibold'>Owner Information</h6>
                    <p className='text-gray-600'>Karla Marín Arias</p>
                    <MainButton text='Contact' variant="border" customClass='px-2 py-1 text-sm mt-3' />
                </section>
            </div>
            <div className='mt-10'>
                <h2>Propeties availables in the same area</h2>

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 justify-center items-center mt-10">

                    {Array.from({ length: 3 }).map((_, index) => (
                        <AdvancedCard
                            srcImage="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                            title="Woodie Comfy Property"
                            location="Santa Teresa, Puntarenas. CR."
                            price={100000}
                            frequency="monthly"
                            key={index}
                            customClass={"m-auto"}
                        >
                            <MainButton
                                text="View"
                                variant="border"
                                type="link"
                                to={ROUTE_PATHS.NOT_FOUND}
                            />
                        </AdvancedCard>
                    ))}
                </div>
            </div>
        </div>
    );
}