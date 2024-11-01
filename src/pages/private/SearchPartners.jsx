import { SecondaryFilterTag } from './../../components/ui/buttons/SecondaryFilterTag';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useFetchPartners } from '../../components/hooks/useFetchPartners';
import { useContext } from 'react';
import { globalProvider } from '../../global/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';

export function SearchPartners() {
    const { partners, isLoadingPartners } = useFetchPartners();
    const { setPartnerID } = useContext(globalProvider);
    const navigate = useNavigate();


    const openPartnerProfile = (partnerId) => {
        setPartnerID(partnerId);
        const profilePath = ROUTE_PATHS.PARTNER_PROFILE.startsWith('/suru')
            ? ROUTE_PATHS.PARTNER_PROFILE
            : `/suru${ROUTE_PATHS.PARTNER_PROFILE}`;
            
        navigate(profilePath);
    };

    const renderPartners = (partners) => {
        return partners.map((partner) => {
            return (
                <div
                    key={partner.user_id}
                    className="flex flex-wrap p-4 gap-4 min-h-40 border border-light-grey rounded-md"
                >
                    <div className="w-40">
                        <img
                            src={partner.image}
                            alt=""
                            className="w-full object-cover"
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
                        <div className="flex gap-2">
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service1
                            </span>
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service2
                            </span>
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service3
                            </span>
                        </div>
                        <div className="w-full flex flex-grow justify-end items-end">
                            <MainButton onClick={() => openPartnerProfile(partner.user_id)} text={'Ver'} />
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <section className="max-w-7xl m-auto p-4 ">
            <div className="flex gap-4 p-4 border border-light-grey rounded-md">
                <SecondaryFilterTag text={'filter'} />
                <SecondaryFilterTag text={'filter'} />
                <SecondaryFilterTag text={'filter'} />
            </div>
            <div className="mt-5 gap-4 grid grid-cols-[repeat(auto-fit,_minmax(700px,_1fr))]">
                {isLoadingPartners ? (
                    <p>IsLoading</p>
                ) : (
                    renderPartners(partners)
                )}
            </div>
        </section>
    );
}
