import { useState, useEffect, useContext } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { useAxios } from '../../components/hooks/useAxios';
import { ThemeContext } from '../../global/ThemeContext';

export function PartnersAdministration() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const loggedInUserId = user?.id;
    const { theme } = useContext(ThemeContext);

    const [currentStatus, setCurrentStatus] = useState('Pending');
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    const fetchPartners = (status) => {
        if (!loggedInUserId) {
            console.error('User ID is not available.');
            return;
        }

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
                customClass: theme === 'dark' ? 'swal-dark' : '', 
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to approve the partner. Please try again.',
                    customClass: theme === 'dark' ? 'swal-dark' : '', // Aplica tema oscuro
                });
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
            customClass: theme === 'dark' ? 'swal-dark' : '', // Aplica tema oscuro
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(
                        `/partner-request/${partnerRequestId}/${loggedInUserId}`,
                        { status: 'Rejected' }
                    )
                    .then(() => {
                        updatePartnerStatus(partnerRequestId, 'Rejected');
                    })
                    .catch((error) => {
                        console.error(
                            'Error rejecting partner:',
                            error.response || error
                        );
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to reject the partner. Please try again.',
                            customClass: theme === 'dark' ? 'swal-dark' : '', // Aplica tema oscuro
                        });
                    });
            }
        });
    };

    const showAdditionalInfo = (partner, theme) => {
        Swal.fire({
            html: `
                <div style="
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    text-align: center; 
                    color: ${theme === 'dark' ? '#f8f9fa' : '#2d465c'}; 
                    font-family: Arial, sans-serif;">
                    <img src="${partner.image}" 
                         alt="Company Logo" 
                         style="
                            border-radius: 50%; 
                            width: 120px; 
                            height: 120px; 
                            margin-bottom: 15px; 
                            object-fit: cover; 
                            border: 2px solid ${theme === 'dark' ? '#3691bd' : '#66bee1'};">
                    <h2 style="margin: 0; font-size: 18px;">${partner.name}</h2>
                    <p style="font-size: 13px; color: ${theme === 'dark' ? '#adb5bd' : '#666'}; margin-top: 5px;">${partner.position || ''}</p>
                </div>
                <div style="
                    padding: 15px; 
                    text-align: left; 
                    font-family: Arial, sans-serif; 
                    color: ${theme === 'dark' ? '#e9ecef' : '#333'};">
                    <div style="margin-bottom: 15px;">
                        <p><strong style="color: ${theme === 'dark' ? '#66d9e8' : '#236f97'};">Description:</strong> ${partner.description || 'N/A'}</p>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <p><strong style="color: ${theme === 'dark' ? '#66d9e8' : '#236f97'};">Website:</strong> 
                            <a href="${partner.website_url || '#'}" 
                               target="_blank" 
                               style="color: ${theme === 'dark' ? '#66d9e8' : '#3691bd'}; text-decoration: none;">
                               ${partner.website_url || 'N/A'}
                            </a>
                        </p>
                    </div>
                    <hr style="border: none; height: 1px; background-color: ${theme === 'dark' ? '#495057' : '#eee'}; margin: 15px 0;">
                    <div style="margin-bottom: 15px;">
                        <p><strong style="color: ${theme === 'dark' ? '#66d9e8' : '#236f97'};">Instagram:</strong> 
                            <a href="${partner.instagram_url || '#'}" 
                               target="_blank" 
                               style="color: ${theme === 'dark' ? '#66d9e8' : '#3691bd'}; text-decoration: none;">
                               ${partner.instagram_url || 'N/A'}
                            </a>
                        </p>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <p><strong style="color: ${theme === 'dark' ? '#66d9e8' : '#236f97'};">Facebook:</strong> 
                            <a href="${partner.facebook_url || '#'}" 
                               target="_blank" 
                               style="color: ${theme === 'dark' ? '#66d9e8' : '#3691bd'}; text-decoration: none;">
                               ${partner.facebook_url || 'N/A'}
                            </a>
                        </p>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <p><strong style="color: ${theme === 'dark' ? '#66d9e8' : '#236f97'};">TikTok:</strong> 
                            <a href="${partner.tiktok_url || '#'}" 
                               target="_blank" 
                               style="color: ${theme === 'dark' ? '#66d9e8' : '#3691bd'}; text-decoration: none;">
                               ${partner.tiktok_url || 'N/A'}
                            </a>
                        </p>
                    </div>
                    <hr style="border: none; height: 1px; background-color: ${theme === 'dark' ? '#495057' : '#eee'}; margin: 15px 0;">
                    <div style="margin-bottom: 15px;">
                        <p><strong style="color: ${theme === 'dark' ? '#66d9e8' : '#236f97'};">Currency:</strong> ${partner.currency_name || 'N/A'}</p>
                    </div>
                    <div>
                        <p><strong style="color: ${theme === 'dark' ? '#66d9e8' : '#236f97'};">Partner Comments:</strong> ${partner.admin_comments || 'N/A'}</p>
                    </div>
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            width: '600px',
            customClass: theme === 'dark' ? 'swal-dark' : '',
        });
    };
    
    
     
    const comments = (partner) => {
        Swal.fire({
            title: 'Add Comment About This Partner',
            html: `
                <textarea id="commentInput" style="padding: 8px; margin-top: 10px; width: 100%; background-color: transparent; border: 1px solid #ccc;" placeholder="Write your comment here..."></textarea>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            width: '700px',
            customClass: {
                popup: 'custom-swal-popup dark:bg-[#0d273e]',
            },
            footer: `
                <button class="save-comment" style="padding: 10px 20px; margin-top: 15px; background-color: #0d8387; color: white; border: none; cursor: pointer;">Save Changes</button>
            `,
            didOpen: () => {
                const saveButton = Swal.getPopup().querySelector('button.save-comment');
                saveButton.addEventListener('click', () => {
                    const comment = document.getElementById('commentInput').value;
                    if (comment) {
                        partner.admin_comments = comment; // Guardar el comentario en el objeto partner
                        Swal.fire('Saved!', 'Your comment has been saved successfully.', 'success').then(() => {
                            showAdditionalInfo(partner); // Mostrar el segundo pop-up
                        });
                    } else {
                        Swal.fire('Error', 'Please enter a comment.', 'error');
                    }
                });
            },
        });
    };
    


    return (
        <div className="max-w-7xl p-4 min-h-[80vh] sm:p-6 lg:p-8 sm:ml-10">
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
                            <Tab label="Pending" value="Pending" className='dark:text-white' />
                            <Tab label="Approved" value="Approved" className='dark:text-white'/>
                            <Tab label="Rejected" value="Rejected" className='dark:text-white'/>
                        </Tabs>
                    </Box>

                    {/* Tabla para pantallas grandes */}
                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                        <table className="w-full">
                            <thead className="bg-gray-300 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-600 text-black dark:text-white text-left">
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
                            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                                {partners.length > 0 ? (
                                    partners.map((partner) => (
                                        <tr className="bg-white dark:bg-gray-900" key={partner.id}>
                                            <td className="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap flex items-center gap-2">
                                                <img
                                                    src={partner.image}
                                                    alt="Company Logo"
                                                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
                                                />
                                                {partner.name}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                {partner.category_name || 'N/A'}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                {partner.phone_number || 'N/A'}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                {partner.email || 'N/A'}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                <span
                                                   className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg ${
                                                    currentStatus === 'Approved'
                                                        ? 'text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-200'
                                                        : currentStatus === 'Rejected'
                                                        ? 'text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200'
                                                        : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200'
                                                    }`}
                                                >
                                                    {currentStatus}
                                                </span>
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
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


                                                    <button className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                        onClick={() =>
                                                            comments(
                                                                partner
                                                            )
                                                        }>
                                                                                                 
                                                        Comment
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="p-3 text-center text-sm text-gray-500 dark:text-gray-400"
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
                                    className="bg-white dark:bg-[#0d273e] p-4 rounded-lg shadow"
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
                                            className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg opacity-50 ${currentStatus === 'Approved'
                                                    ? 'text-green-800 bg-green-200'
                                                    : currentStatus ===
                                                        'Rejected'
                                                        ? 'text-red-800 bg-red-200'
                                                        : 'text-yellow-800 bg-yellow-200'
                                                }`}
                                        >
                                            {currentStatus}
                                        </span>
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-2">
                                        {currentStatus === 'Pending' ? (
                                            <>
                                                <button
                                                    className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue dark:hover:border-green-800 dark:hover:bg-green-800/20 dark:hover:text-green-700 hover:text-white py-3 px-3"
                                                    onClick={() =>
                                                        approvePartner(
                                                            partner.id
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue dark:hover:border-red-800 dark:hover:bg-red-800/20 dark:hover:text-red-700 hover:text-white py-3 px-3"
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
                                                showAdditionalInfo(partner)
                                            }
                                        >
                                            See additional info
                                        </button>

                                        <button className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                        onClick={() =>
                                                            comments(
                                                                partner
                                                            )
                                                        }>
                                                                                                 
                                                        Comment
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
