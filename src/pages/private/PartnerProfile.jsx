import { MainButton } from '../../components/ui/buttons/MainButton';
import { ServiceCard } from '../../components/ui/cards/ServiceCard';
import { MapPin } from 'lucide-react';
import { LayoutModal } from './../../components/ui/modals/LayoutModal';
import { ContactModal } from '../../components/ui/modals/ContactModal';
import { useState, useEffect, useContext } from 'react';
import { useAxios } from '../../components/hooks/useAxios';
import { OperationalHoursCard } from '../../components/ui/cards/OperationalHoursCard';
import { SkeletonLoader } from './../../components/ui/SkeletonLoader';
import { globalProvider } from '../../global/GlobalProvider';

export function PartnerProfile({ partnerId }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [partnerInfo, setPartnerInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { partnerID } = useContext(globalProvider);
    const axios = useAxios();

    const openModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    const getPartnerInfo = async () => {
        try {
            const response = await axios.get(`/partner/${partnerID}`);
            // const response = await axios.get(`/partner/28`);
            const data = await response.data;
            console.log(data);
            setPartnerInfo(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const renderOperationalHoursCard = (operationalHours) => {
        return operationalHours.map((item) => {
            return (
                <OperationalHoursCard
                    key={item.day_of_week}
                    day={item.day_of_week}
                    startTime={item.start_time}
                    endTime={item.end_time}
                />
            );
        });
    };

    const renderServices = () => {
        if (partnerInfo.services.length === 0) {
            return <p>No Services</p>;
        }
        return partnerInfo.services.map((service) => {
            return (
                <ServiceCard
                    key={service.id}
                    title={service.name}
                    description={service.description}
                    price={service.price}
                    maxPrice={service.price_max}
                />
            );
        });
    };

    const showSkeletonLoaderHours = () => {
        return Array(7)
            .fill(0)
            .map((_, index) => (
                <SkeletonLoader
                    key={`hours-${index}`}
                    customClass="h-10 w-full"
                />
            ));
    };

    const showLoaderServices = () => {
        return Array(3)
            .fill(0)
            .map((_, index) => (
                <SkeletonLoader
                    key={`services-${index}`}
                    customClass="h-[7rem] w-full"
                />
            ));
    };

    const showLoaderHeader = () => {
        return <SkeletonLoader customClass="h-[19rem] w-full" />;
    };

    const showLoaderGeneralInfo = () => {
        return <SkeletonLoader customClass="h-[5rem] w-full" />;
    };

    const showLoaderDescription = () => {
        return <SkeletonLoader customClass="h-[5rem] w-full" />;
    };

    useEffect(() => {
        getPartnerInfo();
    }, []);

    return (
        <section className="max-w-7xl m-auto p-4">
            <header className="relative mb-12 mt-10">
                {isLoading ? (
                    showLoaderHeader()
                ) : (
                    <>
                        <div className="bg-gray-300 h-40 rounded-md overflow-hidden aspect-video sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full">
                            <img
                                src="https://via.placeholder.com/1200x400"
                                className="w-full h-full object-cover"
                                alt="Banner"
                            />
                        </div>
                        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-28 sm:left-10 sm:translate-x-0 sm:w-32 md:w-36 lg:w-40 rounded-full overflow-hidden border-4 border-white">
                            <img
                                src="https://unavatar.io/github/Microsoft"
                                alt="Foto de perfil"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </>
                )}
            </header>
            <div className="grid gap-10 mb-10">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
                    {isLoading ? (
                        showLoaderGeneralInfo()
                    ) : (
                        <>
                            <div className="flex flex-col items-center sm:items-start">
                                <h2>{partnerInfo.name}</h2>

                                <p>{partnerInfo.category_name}</p>

                                {partnerInfo.website_url && (
                                    <a href={partnerInfo.website_url} >
                                        {partnerInfo.website_url}
                                    </a>
                                )}
                            </div>
                            <div className="flex flex-col justify-end items-center mt-4 sm:items-end">
                                <MainButton
                                    type={'button'}
                                    text={'Contactar'}
                                    customClass="h-fit"
                                    onClick={openModal}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="grid gap-4">
                    <h2>Services</h2>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4">
                        {isLoading ? showLoaderServices() : renderServices()}
                    </div>
                </div>
                <div className="grid gap-4">
                    <h2>Operational Hours</h2>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 ">
                        {isLoading
                            ? showSkeletonLoaderHours()
                            : renderOperationalHoursCard(
                                  partnerInfo.operational_hours
                              )}
                    </div>
                </div>
                <div className="grid gap-4">
                    <h2>Description</h2>
                    {isLoading ? (
                        showLoaderDescription()
                    ) : (
                        <p>{partnerInfo.description}</p>
                    )}
                </div>
            </div>
            {isLoading ? (
                ''
            ) : (
                <LayoutModal
                    status={isOpenModal}
                    customClass={'items-center p-2'}
                >
                    <ContactModal
                        handleModal={setIsOpenModal}
                        email={partnerInfo.email}
                        phone={partnerInfo.phone_number}
                        instagram={partnerInfo.instagram_url}
                        facebook={partnerInfo.facebook_url}
                        tiktok={partnerInfo.tiktok_url}
                    />
                </LayoutModal>
            )}
        </section>
    );
}
