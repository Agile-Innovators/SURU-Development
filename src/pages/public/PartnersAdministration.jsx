import React, { useState } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

export function PartnersAdministration() {
    const [currentStatus, setCurrentStatus] = useState('Pending');
    const partners = [
        { id: 1, companyName: "Servicios de Limpieza Juanilama", requestDate: "2024-10-23" },
        { id: 2, companyName: "Mundanzas Martínez", requestDate: "2024-10-22" },
        { id: 3, companyName: "Insecticidas Palenque", requestDate: "2024-10-21" }
    ]; // Placeholder array for demonstration

    const handleTabChange = (event, newValue) => {
        setCurrentStatus(newValue);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleAccept = (partnerId) => {
        Swal.fire({
            title: 'Do you want to accept this partner?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Accepted!',
                    'The partner has been accepted.',
                    'success'
                );
                
            }
        });
    };

    const handleCancel = (partnerId) => {
        Swal.fire({
            title: 'Do you want to cancel this partner?',
            text: "This action cannot be reverted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelled!',
                    'The partner has been cancelled.',
                    'success'
                );
                
            }
        });
    };

    return (
        <div className="max-w-7xl m-auto p-4 min-h-[80vh]">
            <div className={`mt-10 mb-10 gap-4 sm:block`}>
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
                            <Tab label="Pending " value="Pending" />
                            <Tab label="Accepted" value="Accepted" />
                            <Tab label="Declined" value="Declined" />
                        </Tabs>
                    </Box>

                    <div className="grid grid-cols-1 gap-4 mt-4">
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
                                    <div className="flex flex-col text-primary">
                                        <span className="text-lg font-bold">
                                            {partner.companyName}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {formatDate(partner.requestDate)}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            className="text-secondary text-white bg-secondary border-2 border-secondary hover:bg-blue- hover:text-white py-3 px-3"
                                            onClick={() => handleAccept(partner.id)}
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="text-secondary bg-secondary text-white border-2 border-secondary hover:bg-secondary hover:text-white py-3 px-3"
                                            onClick={() => handleCancel(partner.id)}
                                        >
                                            Decline
                                        </button>

                                        <button
                                            className="text-secondary border-2 border-secondary hover:bg-secondary hover:text-white py-3 px-3"
                                        >
                                            Download PDF
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnersAdministration;
