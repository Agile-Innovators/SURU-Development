import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { useAxios } from '../../components/hooks/useAxios';

export function PartnersAdministration() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const loggedInUserId = user?.id;

    const [currentStatus, setCurrentStatus] = useState('Pending');
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    const fetchPartners = (status) => {
        if (!loggedInUserId) {
            console.error("User ID is not available.");
            return;
        }

        setLoading(true);
        // Vaciar el estado de partners antes de la solicitud para evitar datos persistentes de una pestaña anterior
        setPartners([]);
        
        axios
            .get(`/partner-requests/${status}/${loggedInUserId}`)
            .then((response) => {
                setPartners(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching partners:", error.response ? error.response.data : error.message);
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
        axios.put(`/partner-request/${partnerRequestId}/${loggedInUserId}`, {
            status: "Approved",
        })
        .then(() => {
            updatePartnerStatus(partnerRequestId, 'Approved');
        })
        .catch(error => {
            console.error("Error approving partner:", error.response || error);
            Swal.fire('Error!', 'Failed to approve the partner. Please try again.', 'error');
        });
    };

    const rejectPartner = (partnerRequestId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`/partner-request/${partnerRequestId}/${loggedInUserId}`, {
                    status: "Rejected",
                })
                .then(() => {
                    updatePartnerStatus(partnerRequestId, 'Rejected');
                })
                .catch(error => {
                    console.error("Error rejecting partner:", error.response || error);
                    Swal.fire('Error!', 'Failed to reject the partner. Please try again.', 'error');
                });
            }
        });
    };

    return (
        <div className="max-w-7xl m-auto p-4 min-h-[80vh]">
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
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">Company Name</th>
                                    <th className="w-32 p-3 text-sm font-semibold tracking-wide">Category</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide">Phone</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">Email Address</th>
                                    <th className="w-20 p-3 text-sm font-semibold tracking-wide">Status</th>
                                    {/* Mostrar columna Actions solo si el estado es 'Pending' */}
                                    {currentStatus === 'Pending' && (
                                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Actions</th>
                                    )}
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
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{partner.category_name || 'N/A'}</td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{partner.phone_number || 'N/A'}</td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{partner.email || 'N/A'}</td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
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
                                            </td>
                                            {/* Mostrar botones de acciones solo si el estado es 'Pending' */}
                                            {currentStatus === 'Pending' && (
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                            onClick={() => approvePartner(partner.id)}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                            onClick={() => rejectPartner(partner.id)}
                                                        >
                                                            Reject
                                                        </button>
                                                        <button className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3">
                                                            Download PDF
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={currentStatus === 'Pending' ? 6 : 5} className="p-3 text-center text-sm text-gray-500">
                                            {currentStatus === 'Pending'
                                                ? "There is no pending partners"
                                                : `No partners in ${currentStatus}`}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnersAdministration;
