import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

export function PartnersAdministration() {
    const [currentStatus, setCurrentStatus] = useState('Pending');
    const partners = [
        {
            id: 1,
            companyName: 'Servicios de Limpieza Juanilama',
            requestDate: '2024-10-23',
        },
        { id: 2, companyName: 'Mundanzas Martínez', requestDate: '2024-10-22' },
        {
            id: 3,
            companyName: 'Insecticidas Palenque',
            requestDate: '2024-10-21',
        },
    ]; // Placeholder array for demonstration

    const handleTabChange = (event, newValue) => {
        setCurrentStatus(newValue);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleConfirm = (partnerId) => {
        Swal.fire({
            title: 'Do you want to confirm this partner?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Confirmed!', 'The partner has been confirmed.', 'success');
                // Aquí puedes agregar lógica adicional para manejar la confirmación del socio.
            }
        });
    };

    const handleDecline = (partnerId) => {
        Swal.fire({
            title: 'Do you want to decline this partner?',
            text: 'This action cannot be reverted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, decline it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Declined!', 'The partner has been declined.', 'success');
                // Aquí puedes agregar lógica adicional para manejar el rechazo del socio.
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
                            <Tab label="Accepted" value="Accepted" />
                            <Tab label="Declined" value="Declined" />
                        </Tabs>
                    </Box>

                    {/* Tabla para pantallas grandes */}
                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                        <table className="w-full">
                            <thead className="bg-secondary border-b-2 border-gray-200 text-white">
                                <tr>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">Company Name</th>
                                    <th className="w-32 p-3 text-sm font-semibold tracking-wide">Service</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide">Phone Number</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">Email Address</th>
                                    <th className="w-20 p-3 text-sm font-semibold tracking-wide">Status</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {partners.map((partner) => (
                                    <tr className="bg-white" key={partner.id}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{partner.companyName}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Cleaning</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">+50661102677</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">servicioslimpiezajuanilama2020@gmail.com</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg opacity-50">Pending</span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={() => handleConfirm(partner.id)}>Confirm</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => handleDecline(partner.id)}>Decline</button>
                                                <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded" onClick={() => handleDownloadPDF(partner.id)}>Download PDF</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Diseño responsive para pantallas pequeñas */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {partners.map((partner) => (
                            <div className="bg-white p-4 rounded-lg shadow" key={partner.id}>
                                <div className="flex items-center space-x-2 text-sm">
                                    <div className="font-bold">{partner.companyName}</div>
                                    <div className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg opacity-50">Pending</div>
                                </div>
                                <div className="flex gap-2 text-sm mt-2">
                                    <label className="font-bold">Service:</label>
                                    <p>Cleaning</p>
                                </div>
                                <div className="flex gap-2 text-sm mt-2">
                                    <label className="font-bold">Phone Number:</label>
                                    <p>+50661102677</p>
                                </div>
                                <div className="flex gap-2 text-sm mt-2">
                                    <label className="font-bold">Email:</label>
                                    <p>servicioslimpiezajuanilama2020@gmail.com</p>
                                </div>
                                <div className="flex gap-2 mt-2 text-sm">
                                    <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py px-2 rounded" onClick={() => handleConfirm(partner.id)}>Confirm</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py px-2 rounded" onClick={() => handleDecline(partner.id)}>Decline</button>
                                    <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py px-2 rounded">Download PDF</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnersAdministration;
