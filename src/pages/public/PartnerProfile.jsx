import { MainButton } from '../../components/ui/buttons/MainButton';
import { LayoutModal } from '../../components/ui/modals/LayoutModal';
import { ContactModal } from '../../components/ui/modals/ContactModal';
import { useState, useEffect, useContext } from 'react';
import { useAxios } from '../../components/hooks/useAxios';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { globalProvider } from '../../global/GlobalProvider';
import { X, Instagram, Facebook, Phone, Mail } from 'lucide-react';
import { BackButton } from '../../components/ui/buttons/BackButton';
import { useParams } from 'react-router-dom';

export function PartnerProfile() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [partnerInfo, setPartnerInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // const { partnerID } = useContext(globalProvider);
    const { partnerId } = useParams();
    const [isLoadingTest, setIsLoadingTest] = useState(true);
    const axios = useAxios();

    const openModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    const getPartnerInfo = async () => {
        try {
            const response = await axios.get(`/partner/${partnerId }`);
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

    const renderOperationalHours = (operationalHours) => {
        return (
            <div className="flex flex-col gap-2 p-8 border border-light-grey rounded-md">
                <h4>Operational Hours</h4>
                <div className="grid gap-4">
                    {operationalHours.map((item) => {
                        return (
                            <div key={item.day_of_week}>
                                <h5>{item.day_of_week}</h5>
                                <p>{`${item.start_time} - ${item.end_time}`}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderServices = () => {
        return (
            <div className="grid gap-4 p-8 border border-light-grey rounded-md">
                <h4>Available Services</h4>
                <div className="grid gap-4">
                    {partnerInfo.services.length === 0 ? (
                        <p>No Services</p>
                    ) : (
                        partnerInfo.services.map((service) => {
                            return (
                                <div
                                    key={`service-${service.id}`}
                                    className="flex w-full justify-between"
                                >
                                    <p>{service.name}</p>
                                    <div className="flex gap-4">
                                        <p>${service.price}</p>
                                        {service.price_max !== null && (
                                            <>
                                                <p>-</p>
                                                <p>${service.price_max}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        );
    };

    const showSkeletonLoaderHours = () => {
        return <SkeletonLoader customClass="h-full w-full" />;
    };

    const showLoaderServices = () => {
        return <SkeletonLoader customClass="h-[10rem] w-full" />;
    };

    const renderAboutCompany = () => {
        return (
            <div className="grid gap-2 p-8 border border-light-grey rounded-md">
                <h4>About the company</h4>
                <p>{partnerInfo.description}</p>
                <div>
                    <h5>Contact information</h5>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 mt-5">
                        <div className="flex gap-4">
                            <Phone size={24}/>
                            <p>{partnerInfo.phone_number}</p>
                        </div>
                        <div className="flex gap-4">
                            <Mail size={24}/>
                            <p>{partnerInfo.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const showLoaderAboutCompany = () => {
        return <SkeletonLoader customClass="h-[19rem] w-full" />;
    };

    const showLoaderHeader = () => {
        return <SkeletonLoader customClass="h-[30rem] w-full" />;
    };

    const showLoaderGeneralInfo = () => {
        return <SkeletonLoader customClass="h-[5rem] w-full" />;
    };

    useEffect(() => {
        getPartnerInfo();
    }, []);

    return (
        <section className="max-w-7xl m-auto p-4">
            <BackButton customClass={'absolute top-1'}/>
            <header className="mb-4 mt-10 border border-light-grey rounded-md">
                
                {isLoading ? (
                    showLoaderHeader()
                ) : (
                    <>
                    
                        <div className='relative'>
                            <div className="bg-gray-300 h-40 rounded-md overflow-hidden aspect-video sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full">
                                <img
                                    src="https://via.placeholder.com/1200x400"
                                    className="w-full h-full object-cover"
                                    alt="Banner"
                                />
                            </div>
                            <div className="absolute h-40 w-40 bottom-[-40px] left-1/2 transform -translate-x-1/2 sm:left-10 sm:translate-x-0 sm:w-32 md:w-36 lg:w-40 rounded-full overflow-hidden border-4 border-white">
                                <img
                                    src={partnerInfo.image_url}
                                    alt="Foto de perfil"
                                    className="object-cover"
                                />
                            </div>
                            
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] mt-5 p-8">
                            {isLoading ? (
                                showLoaderGeneralInfo()
                            ) : (
                                <>
                                    <div className="flex flex-col items-center sm:items-start">
                                        <h2>{partnerInfo.name}</h2>

                                        <p>{partnerInfo.category_name} {partnerInfo.locations.length > 0 && ` | ${partnerInfo.locations[0].name}`}</p>
                                        

                                        {partnerInfo.website_url && (
                                            <a href={partnerInfo.website_url}>
                                                {partnerInfo.website_url}
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-end items-center mt-4 sm:items-end">
                                        {/* <MainButton
                                            type={'button'}
                                            text={'Contactar'}
                                            customClass="h-fit"
                                            onClick={openModal}
                                        /> */}
                                        <div className='flex gap-4'>
                                            {partnerInfo.facebook_url && <a href={partnerInfo.facebook_url} className='hover:text-blue-400'>Facebook</a>}
                                            {partnerInfo.instagram_url && <a href={partnerInfo.instagram_url} className='hover:text-blue-400'>Instagram</a>}
                                            {partnerInfo.tiktok_url && <a href={partnerInfo.tiktok_url} className='hover:text-blue-400'>Tiktok</a>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </header>

            <div className="grid gap-10 mb-10">
                <div className="grid gap-4 lg:grid-cols-3 ">
                    <div className="grid lg:col-span-2 gap-4">
                        {isLoading
                            ? showLoaderAboutCompany()
                            : renderAboutCompany()}

                        {isLoading
                            ? showLoaderServices()
                            : renderServices()}
                    </div>

                    {isLoading
                        ? showSkeletonLoaderHours()
                        : renderOperationalHours(partnerInfo.operational_hours)}
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
