import { MainButton } from '../buttons/MainButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes';
import PropTypes from 'prop-types';

export function PartnerCard({
    partnerId,
    partnerImage,
    partnerName,
    partnerDescription,
    partnerCategory,
}) {
    const navigate = useNavigate();

    const openPartnerProfile = (partnerId) => {
        navigate(
            `${ROUTE_PATHS.PARTNER_PROFILE.replace(':partnerId', partnerId)}`
        );
    };

    return (
        <div className="flex flex-col gap-4 border border-light-grey rounded-md ">
            <div className="w-28 mt-5 m-auto">
                <img
                    src={partnerImage}
                    alt=""
                    className="object-cover w-full aspect-square object-center rounded-full"
                />
            </div>
            <div className="flex flex-col p-4  gap-4 grow h-full">
                <div className="grid gap-2 text-center justify-center">
                    <h4>{partnerName}</h4>
                    {/* <p>
                        {partnerDescription.slice(0, 100)}
                        {partnerDescription.length > 100 ? '...' : ''}
                    </p> */}
                    <p>
                        <strong>{partnerCategory}</strong>
                    </p>
                </div>
                <div className="w-full flex flex-col justify-end grow">
                    <MainButton
                        onClick={() => openPartnerProfile(partnerId)}
                        text={'Ver'}
                        customClass="w-full"
                        variant="border"
                    />
                </div>
            </div>
        </div> //fin card
    );
}

PartnerCard.propTypes = {
    partnerId: PropTypes.string.isRequired,
    partnerImage: PropTypes.string.isRequired,
    partnerName: PropTypes.string.isRequired,
    partnerDescription: PropTypes.string.isRequired,
    partnerCategory: PropTypes.string.isRequired,
};