import { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { useAxios } from '../../components/hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes';
import { globalProvider } from '../../global/GlobalProvider';

export function PartnersAdministration() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const loggedInUserId = user?.id;

    const navigate = useNavigate();

    const [currentStatus, setCurrentStatus] = useState('Pending');
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

  

    const fetchPartners = (status) => {
        if (!loggedInUserId) {
            console.error('User ID is not available.');
            return;
        }

       // setLoading(true);
        setPartners([]);

        axios
            .get(`/partner-requests/${status}/${loggedInUserId}`)
            .then((response) => {
                setPartners(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error(
                    'Error fetching partners:',
                    error.response ? error.response.data : error.message
                );
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPartners(currentStatus);
    }, [currentStatus]);

    const handleTabChange = (event, newValue) => {
        setCurrentStatus(newValue);
    };

    const updatePartnerStatus = (partnerId, newStatus) => {
        setPartners((prevPartners) =>
            prevPartners.filter((partner) => partner.id !== partnerId)
        );
        if (currentStatus === 'Pending') {
            Swal.fire({
                position: 'center',
                icon: newStatus === 'Approved' ? 'success' : 'error',
                title: `Partner ${newStatus}`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const approvePartner = (partnerRequestId) => {
        axios
            .put(`/partner-request/${partnerRequestId}/${loggedInUserId}`, {
                status: 'Approved',
            })
            .then(() => {
                updatePartnerStatus(partnerRequestId, 'Approved');
            })
            .catch((error) => {
                console.error(
                    'Error approving partner:',
                    error.response || error
                );
                Swal.fire(
                    'Error!',
                    'Failed to approve the partner. Please try again.',
                    'error'
                );
            });
    };

    const rejectPartner = (partnerRequestId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(
                        `/partner-request/${partnerRequestId}/${loggedInUserId}`,
                        {
                            status: 'Rejected',
                        }
                    )
                    .then(() => {
                        updatePartnerStatus(partnerRequestId, 'Rejected');
                    })
                    .catch((error) => {
                        console.error(
                            'Error rejecting partner:',
                            error.response || error
                        );
                        Swal.fire(
                            'Error!',
                            'Failed to reject the partner. Please try again.',
                            'error'
                        );
                    });
            }
        });
    };
    const showAdditionalInfo = (partner) => {
        Swal.fire({
            title: `
                <div style="display: flex; align-items: center; flex-direction: column;">
                    <img src="${partner.image}" alt="Company Logo" style="border-radius: 50%; width: 150px; height: 150px; margin-bottom: 15px;">
                    <h2 style="margin: 0; color: #333;">${partner.name}</h2>
                    <p style="font-size: 14px; color: #777; margin-top: 5px;">${partner.position || ''}</p>
                </div>
            `,
            html: `
                <div style="padding: 15px; text-align: left; color: #555;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <Globe size={18} />
                        <p><strong style="color: #333;">Description:</strong> ${partner.description || 'N/A'}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <Globe size={18} />
                        <p><strong>Website:</strong> <a href="${partner.website_url || '#'}" target="_blank" style="color: #007bff;">${partner.website_url || 'N/A'}</a></p>
                    </div>
                    <hr style="border-top: 1px solid #eee; margin: 15px 0;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <Instagram size={18} />
                        <p><strong>Instagram:</strong> <a href="${partner.instagram_url || '#'}" target="_blank" style="color: #007bff;">${partner.instagram_url || 'N/A'}</a></p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <Facebook size={18} />
                        <p><strong>Facebook:</strong> <a href="${partner.facebook_url || '#'}" target="_blank" style="color: #007bff;">${partner.facebook_url || 'N/A'}</a></p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <TikTok size={18} />
                        <p><strong>Tiktok:</strong> <a href="${partner.tiktok_url || '#'}" target="_blank" style="color: #007bff;">${partner.tiktok_url || 'N/A'}</a></p>
                    </div>
                    <hr style="border-top: 1px solid #eee; margin: 15px 0;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <DollarSign size={18} />
                        <p><strong>Currency:</strong> ${partner.currency_id || 'N/A'}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <MessageCircle size={18} />
                        <p><strong>Partner Comments:</strong> ${partner.partner_comments || 'N/A'}</p>
                    </div>
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            width: '700px',
            customClass: {
                popup: 'custom-swal-popup'
            }
        });
    };
    


    
        return (
            <div className="w-full m-auto p-4 min-h-[80vh]">
                <div className="mt-10 mb-10 gap-4 sm:block">
                    <div className="m-auto p-4">
                        <h1 className="mt-10">Partners Administration</h1>
        
                        <Box className="flex justify-between items-center mt-4 mb-4">
                            <Tabs
                                value={currentStatus}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="status tabs"
                                className="flex-1"
                            >
                                <Tab label="Pending" value="Pending" />
                                <Tab label="Approved" value="Approved" />
                                <Tab label="Rejected" value="Rejected" />
                            </Tabs>
                        </Box>
        
                        {/* Tabla para pantallas grandes */}
                        <div className="overflow-auto rounded-lg shadow hidden md:block">
                            <table className="w-full">
                                <thead className="bg-gray-300 border-b-2 border-gray-200 text-black text-left">
                                    <tr>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                            Company Name
                                        </th>
                                        <th className="w-32 p-3 text-sm font-semibold tracking-wide">
                                            Category
                                        </th>
                                        <th className="p-3 text-sm font-semibold tracking-wide">
                                            Phone
                                        </th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                            Email Address
                                        </th>
                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide">
                                            Status
                                        </th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    {partners.length > 0 ? (
                                        partners.map((partner) => (
                                            <tr className="bg-white" key={partner.id}>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex items-center gap-2">
                                                    <img
                                                        src={partner.image}
                                                        alt="Company Logo"
                                                        className="w-10 h-10 rounded-full bg-gray-200"
                                                    />
                                                    {partner.name}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {partner.category_name || 'N/A'}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {partner.phone_number || 'N/A'}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {partner.email || 'N/A'}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    <span
                                                        className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg opacity-50 ${
                                                            currentStatus === 'Approved'
                                                                ? 'text-green-800 bg-green-200'
                                                                : currentStatus ===
                                                                  'Rejected'
                                                                ? 'text-red-800 bg-red-200'
                                                                : 'text-yellow-800 bg-yellow-200'
                                                        }`}
                                                    >
                                                        {currentStatus}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    <div className="flex gap-2 items-center justify-center">
                                                        {currentStatus === 'Pending' ? (
                                                            <>
                                                                <button
                                                                    className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                                    onClick={() =>
                                                                        approvePartner(
                                                                            partner.id
                                                                        )
                                                                    }
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                                    onClick={() =>
                                                                        rejectPartner(
                                                                            partner.id
                                                                        )
                                                                    }
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        ) : null}
                                                        <button
                                                            className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                            onClick={() =>
                                                                showAdditionalInfo(
                                                                    partner
                                                                )
                                                            }
                                                        >
                                                            See additional info
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="p-3 text-center text-sm text-gray-500"
                                            >
                                                {currentStatus === 'Pending'
                                                    ? 'There is no pending partners'
                                                    : `No partners in ${currentStatus}`}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
        
                        {/* Vista de tarjeta para pantallas pequeñas */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {partners.length > 0 ? (
                                partners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className="bg-white p-4 rounded-lg shadow"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={partner.image}
                                                alt="Company Logo"
                                                className="w-16 h-16 rounded-full bg-gray-200"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {partner.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {partner.category_name || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Phone:</strong>{' '}
                                            {partner.phone_number || 'N/A'}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Email:</strong>{' '}
                                            {partner.email || 'N/A'}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-4">
                                            <strong>Status:</strong>{' '}
                                            <span
                                                className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg opacity-50 ${
                                                    currentStatus === 'Approved'
                                                        ? 'text-green-800 bg-green-200'
                                                        : currentStatus === 'Rejected'
                                                        ? 'text-red-800 bg-red-200'
                                                        : 'text-yellow-800 bg-yellow-200'
                                                }`}
                                            >
                                                {currentStatus}
                                            </span>
                                        </p>
                                        <div className="flex gap-2">
                                            {currentStatus === 'Pending' ? (
                                                <>
                                                    <button
                                                        className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                        onClick={() =>
                                                            approvePartner(partner.id)
                                                        }
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                        onClick={() =>
                                                            rejectPartner(partner.id)
                                                        }
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : null}
                                            <button
                                                className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                onClick={() =>
                                                    showAdditionalInfo(partner)
                                                }
                                            >
                                                See additional info
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500">
                                    {currentStatus === 'Pending'
                                        ? 'There is no pending partners'
                                        : `No partners in ${currentStatus}`}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
        
}

export default PartnersAdministration;
