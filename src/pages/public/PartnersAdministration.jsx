import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAxios } from '../../components/hooks/useAxios';
import Swal from 'sweetalert2';


export function PartnersAdministration() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const loggedInUserId = user?.id;

    const [currentStatus, setCurrentStatus] = useState('Pending');
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();


    const fetchPartners = (currentStatus) => {
        if (!loggedInUserId) {
            console.error("User ID is not available.");
            return;
        }
    
        setLoading(true);
        axios
            .get(`/partner-requests/${currentStatus}/${loggedInUserId}`) 
            .then((response) => {
                console.log("Fetched Partners:", response.data);
                setPartners(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching partners:", error.response ? error.response.data : error.message);
                Swal.fire('Error!', 'Failed to load partners', 'error');
                setLoading(false);
            });
    };



    useEffect(() => {
        fetchPartners(currentStatus);
    }, [currentStatus]);

    const handleTabChange = (event, newValue) => {
        setCurrentStatus(newValue);
    };

    const approvePartner = (partnerId) => {
        axios.put(`/partners/approve/${partnerId}`)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Partner Approved',
                    showConfirmButton: false,
                    timer: 1500,
                });
                fetchPartners(currentStatus);
            })
            .catch(error => {
                console.error("Error approving partner:", error.response || error);
                Swal.fire('Error!', 'Failed to approve the partner', 'error');
            });
    };

    const rejectPartner = (partnerId) => {
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
                axios.put(`/partners/reject/${partnerId}`)
                    .then(() => {
                        Swal.fire('Rejected!', 'The partner has been rejected.', 'success');
                        fetchPartners(currentStatus);
                    })
                    .catch(error => {
                        console.error("Error rejecting partner:", error.response || error);
                        Swal.fire('Error!', 'Failed to reject the partner', 'error');
                    });
            }
        });
    };

    return (
        <div className="max-w-7xl m-auto p-4 min-h-[80vh]">
            <h1 className="mt-10">Partners Administration</h1>
            <p className="dark:text-white">Manage partner requests and status</p>

            <Box className="flex justify-between items-center mt-4 mb-4">
                <Tabs
                    value={currentStatus}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="status tabs"
                >
                    <Tab label="Pending" value="Pending" className="dark:text-white" />
                    <Tab label="Approved" value="Approved" className="dark:text-white" />
                    <Tab label="Rejected" value="Rejected" className="dark:text-white"/>
                </Tabs>
            </Box>

            <div className="grid grid-cols-1 gap-4 mt-4">
                {loading ? (
                    <p className="text-center text-gray-600 font-bold">Loading...</p>
                ) : partners.length === 0 ? (
                    <p className="text-center text-gray-600 font-bold">No partners found in this category.</p>
                ) : (
                    <AnimatePresence>
                        {partners.map((partner) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="w-full border border-gray-300 rounded-md p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                        {partner.image_url && <img src={partner.image_url} alt={`${partner.name} Logo`} />}
                                    </div>
                                    <div>
                                        <h2 className="font-bold">{partner.name}</h2>
                                        <p className="text-gray-600">{partner.category_name}</p>
                                    </div>
                                </div>

                                <div className="flex-1 text-gray-600 text-left sm:text-center">
                                    <p>{partner.description || "No description available"}</p>
                                </div>

                                <div className="relative gap-5 flex">
                                    {currentStatus === "Pending" && (
                                        <>
                                            <button
                                                className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white py-1 px-3 rounded"
                                                onClick={() => approvePartner(partner.id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white py-1 px-3 rounded"
                                                onClick={() => rejectPartner(partner.id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default PartnersAdministration;
