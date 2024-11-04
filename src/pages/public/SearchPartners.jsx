import { MainButton } from '../../components/ui/buttons/MainButton';
import { useFetchPartners } from '../../components/hooks/useFetchPartners';
import { useContext, useState, useEffect } from 'react';
import { globalProvider } from '../../global/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import { useFetchPartnersCategories } from '../../components/hooks/useFetchPartnerCategories';
import { useAxios } from '../../components/hooks/useAxios';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';

export function SearchPartners() {
    const { partners, isLoadingPartners } = useFetchPartners();
    const { partnersCategories, isLoadingPartnersCats } =
        useFetchPartnersCategories();
    const { setPartnerID } = useContext(globalProvider);
    const [partnerCategory, setPartnerCategory] = useState(0);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [partnersData, setPartnersData] = useState([]);
    const [isLoadingPartnersData, setIsLoadingPartnersData] = useState(false);

    const navigate = useNavigate();
    const axios = useAxios();


    useEffect(()=>{
        setPartnersData(partners);
    }, [isLoadingPartnersCats]);

    const openPartnerProfile = (partnerId) => {
        setPartnerID(partnerId);

        navigate(`${ROUTE_PATHS.PARTNER_PROFILE.replace(':partnerId', partnerId)}`);
    };

    const handleFilterPartners = async (e) => {
        e.preventDefault();
        setIsLoadingPartnersData(true)
        try {
            const response = await axios.get(`/partners/${partnerCategory}`);
            console.log(response)
            const data = await response.data;
            setPartnersData(data)
            setIsLoadingPartnersData(false)
        } catch (error) {
            console.log(error);
            setIsLoadingPartnersData(false)
        }
    };

    const showLoaderPartners = () =>{
        return Array(2).fill(0).map((_,index) => {
            return(
                <SkeletonLoader key={`loader-partner-${index}`} customClass="h-[12rem] w-full"/>
            )
        });
    }

    const renderPartnersCat = (partnersCategories) => {
        return (
            <div className="grid gap-2 w-full sm:w-auto">
                <label
                    htmlFor="select-partners-categories"
                    className="text-sm font-medium text-gray-700 mb-2"
                >
                    Categories
                </label>
                <select
                    name="partnersCategories"
                    id="select-partners-categories"
                    value={partnerCategory}
                    onChange={(e) => setPartnerCategory(e.target.value)}
                    className="p-3 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value={0}>all</option>
                    {partnersCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const renderPartners = (partners) => {
        if(partners.length == 0){
            return <p>No found</p>
        }

        return partners.map((partner) => {
            return (
                <div
                    key={partner.user_id}
                    className="flex flex-col p-4 gap-4  border border-light-grey rounded-md sm:flex-row sm:min-h-40"
                >
                    <div className="w-full sm:w-40 flex">
                        <img
                            src={partner.image}
                            alt=""
                            className="w-full object-cover aspect-square m-auto"
                        />
                    </div>
                    <div className="flex flex-col gap-4 flex-grow">
                        <div className="grid gap-2">
                            <h2>{partner.partner_name}</h2>
                            <p className="flex flex-wrap">
                                {partner.description}
                            </p>
                            <p className="flex flex-wrap">
                                {partner.category_name}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            {partner.services.length > 0 &&
                                partner.services.map((service) => {
                                    return (
                                        <span
                                            key={`service-${service.id}`}
                                            className="px-4 py-1 rounded-lg text-sm bg-sky-300 w-fit sm:w-auto"
                                        >
                                            {service.name}
                                        </span>
                                    );
                                })}
                        </div>
                        <div className="w-full flex sm:flex-grow sm:justify-end items-end">
                            <MainButton
                                onClick={() =>
                                    openPartnerProfile(partner.user_id)
                                }
                                text={'Ver'}
                                customClass='w-full sm:w-fit'
                            />
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <section className="max-w-7xl m-auto p-4 ">
            <form className="flex flex-col justify-between  p-4 border border-light-grey rounded-md sm:flex-row sm:items-center">
                <div className="flex gap-4">
                    {(isLoadingPartnersCats || isLoadingCategories)? (
                        <p>Loading</p>
                    ) : (
                        renderPartnersCat(partnersCategories)
                    )}
                </div>
                <MainButton
                    text={'Search'}
                    customClass="h-fit mt-5 sm:mt-0"
                    type="button"
                    onClick={(e) => handleFilterPartners(e)}
                />
            </form>
            <div className="mt-5 gap-4 grid">
                {(isLoadingPartners || isLoadingPartnersData)? (  
                    showLoaderPartners()
                ) : (
                    renderPartners(partnersData)
                )}
            </div>
        </section>
    );
}
