import { MainButton } from '../../components/ui/buttons/MainButton';
import { useFetchPartners } from '../../components/hooks/useFetchPartners';
import { useState, useEffect } from 'react';
import { useFetchPartnersCategories } from '../../components/hooks/useFetchPartnerCategories';
import { useAxios } from '../../components/hooks/useAxios';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { PartnerCard } from '../../components/ui/cards/PartnerCard';
import BackButton from '../../components/ui/buttons/BackButton';
import { useFetchLocations } from './../../components/hooks/useFetchLocations';

export function SearchPartners() {
    const { partners, isloadingPartners } = useFetchPartners();
    const { partnersCategories, isLoadingPartnersCats } =
        useFetchPartnersCategories();
    const [partnerCategory, setPartnerCategory] = useState(0);
    const [locationId, setLocationId] = useState(0);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [partnersData, setPartnersData] = useState([]);
    const [isLoadingPartnersData, setIsLoadingPartnersData] = useState(false);
    const { locations, isLoadingLocat } = useFetchLocations();
    const [searchText, setSearchText] = useState('');

    const axios = useAxios();

    useEffect(() => {
        setPartnersData(partners);
    }, [isLoadingPartnersCats]);

    const handleFilterPartners = async (e) => {
        e.preventDefault();
        setIsLoadingPartnersData(true);
        let payload = {
            category_id: partnerCategory,
            location_id: locationId,
            search_text: searchText,
        };
        try {
            const response = await axios.get(`/partners-filter`, {
                params: payload,
            });
            console.log(response);
            const data = await response.data;
            setPartnersData(data);
            setIsLoadingPartnersData(false);
        } catch (error) {
            console.log(error);
            setIsLoadingPartnersData(false);
        }
    };

    const showLoaderPartners = () => {
        return Array(8)
            .fill(0)
            .map((_, index) => {
                return (
                    <SkeletonLoader
                        key={`loader-partner-${index}`}
                        customClass="h-[25rem] w-full "
                    />
                );
            });
    };

    const showLoaderFilters = () => {
        return <SkeletonLoader customClass={'h-[5rem] w-full'} />;
    };

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

    const renderLocationsSelect = (locations) => {
        return (
            <div className="grid gap-2 w-full sm:w-auto">
                <label
                    htmlFor="select-partners-categories"
                    className="text-sm font-medium text-gray-700 mb-2"
                >
                    Locations
                </label>
                <select
                    name="partnersCategories"
                    id="select-partners-categories"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="p-3 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value={0}>all</option>
                    {locations.map((location) => (
                        <option
                            key={`location-${location.value}`}
                            value={location.value}
                        >
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const renderPartners = (partners) => {
        if (!partners || partners.length === 0) {
            return <p>No found</p>;
        }

        return partners.map((partner) => {
            return (
                <PartnerCard
                    key={partner.user_id}
                    partnerId={partner.user_id}
                    partnerImage={partner.image}
                    partnerName={partner.partner_name}
                    partnerDescription={partner.description}
                    partnerCategory={partner.category_name}
                />
            );
        });
    };

    return (
        <section className="max-w-7xl m-auto items-start justify-start p-4 w-full min-h-full">
            <BackButton />
            <form className="flex flex-col justify-between gap-4 mt-4 p-4 border border-light-grey rounded-md sm:flex-row sm:items-center">
                <div className="flex flex-col gap-4 w-full items-end sm:flex-row">
                    {isLoadingPartnersCats
                        ? showLoaderFilters()
                        : renderPartnersCat(partnersCategories)}
                    {isLoadingLocat
                        ? showLoaderFilters()
                        : renderLocationsSelect(locations)}
                    <div className='grid w-full sm:w-auto'>
                        <label htmlFor="searchTextInput" className='text-sm font-medium text-gray-700 mb-2'>Partner name</label>
                        <input
                            id='searchTextInput'
                            placeholder="Search Partner"
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 sm:w-auto"
                        />
                    </div>
                </div>
                <MainButton
                    text={'Search'}
                    customClass="h-fit mt-5 sm:mt-0"
                    type="button"
                    onClick={(e) => handleFilterPartners(e)}
                />
            </form>
            <div className="mt-5 gap-6 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] w-full">
                {isloadingPartners || isLoadingPartnersData
                    ? showLoaderPartners()
                    : renderPartners(partnersData)}
            </div>
        </section>
    );
}
