import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { Clock, MapPin, MoreHorizontal, Check, X, Eye } from 'lucide-react';
import { FiltersAppointmentsModal } from '../../components/ui/modals/FiltersAppointmentsModal';
import { RequestAppointmentModal } from '../../components/ui/modals/RequestAppointmentModal';
import { LayoutModal } from '../../components/ui/modals/LayoutModal';
import { useAxios } from '../../components/hooks/useAxios';
import Swal from 'sweetalert2';

export function Appointments() {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isRequestOpen, setIsRequestOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('Cancelled');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const axios = useAxios();

    useEffect(() => {
        fetchAppointments(currentStatus);
    }, [currentStatus]);

    const fetchAppointments = (status) => {
        setLoading(true);
        axios
            .get(`/appointments/user/2/status/${status}`)
            .then((response) => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error: I can reach it');
                setLoading(false);
            });
    };

    const handleTabChange = (event, newValue) => {
        setCurrentStatus(newValue);
    };

    const handleFiltersClick = () => setIsFiltersOpen(true);
    const handleRequestModal = () => setIsRequestOpen(true);

    const toggleDropdown = (appointmentId) => {
        setOpenDropdownId(openDropdownId === appointmentId ? null : appointmentId);
    };

    const handleDeleteConfirmation = () => {
        console.log('appointment deleted');
        setIsDeleteModalOpen(false);
    };

    //if (loading) return <p>Cargando citas...</p>;
    if (error) return <p>There are no appointments</p>;

    return (
        <div className="max-w-7xl m-auto p-4">
            <div className="sm:hidden flex justify-start mt-10 mb-10">
                <Button
                    variant="outlined"
                    className="text-secondary border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? 'Close' : 'Options'}
                </Button>
            </div>

            <div className={`mt-10 mb-10 gap-4 ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
                <div className="m-auto p-4">
                    <h1 className="mt-10">Appointments</h1>
                    <p>Everything about your appointments</p>

                    {/* Contenedor flex para Tabs y botones */}
                    <Box className="flex justify-between items-center mt-4 mb-4">
                        {/* Tabs alineadas al inicio */}
                        <Tabs
                            value={currentStatus}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="status tabs"
                            className="flex-1"
                        >
                            <Tab label="Upcoming" value="Upcoming" />
                            <Tab label="Pending" value="Pending" />
                            <Tab label="Completed" value="Completed" />
                            <Tab label="Cancelled" value="Cancelled" />
                        </Tabs>

                        {/* Botones alineados al final */}
                        <Box className="flex gap-4">
                            <Button
                                variant="outlined"
                                className="text-secondary border-secondary hover:bg-secondary hover:text-white px-4 py-2"
                                onClick={handleFiltersClick}
                            >
                                Filters
                            </Button>
                            <Button
                                variant="contained"
                                className="bg-secondary text-white hover:bg-light-blue px-4 py-2"
                                onClick={handleRequestModal}
                            >
                                Add New
                            </Button>
                        </Box>
                    </Box>

                    {/* Mostrar citas */}
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="w-full border border-gray-300 rounded-md p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4"
                            >
                                {/* Fecha */}
                                <div className="flex flex-col items-center text-primary">
                                    <span className="text-sm font-medium">
                                        {new Date(appointment.start_datetime).toLocaleDateString('en-US', { weekday: 'short' })}
                                    </span>
                                    <span className="text-3xl font-bold">
                                        {new Date(appointment.start_datetime).getDate()}
                                    </span>
                                </div>

                                <div className="hidden sm:block border-l h-12 border-gray-300 mx-4"></div>

                                <div className="flex flex-col space-y-1 text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Clock size={16} className="text-gray-500" />
                                        <span>
                                            {new Date(appointment.start_datetime).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}{' '}
                                            —{' '}
                                            {new Date(appointment.end_datetime).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin size={16} className="text-gray-500" />
                                        <span>Property ID: {appointment.property_id}</span>
                                    </div>
                                </div>

                                <div className="flex-1 text-gray-600 text-left sm:text-center">
                                    <p>{appointment.user_message}</p>
                                </div>

                                <div className="relative">
                                    <button
                                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                                        onClick={() => toggleDropdown(appointment.id)}
                                    >
                                        <MoreHorizontal size={24} />
                                    </button>
                                    {openDropdownId === appointment.id && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                            <ul className="text-left">
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-400 hover:text-white flex items-center gap-2 cursor-pointer"
                                                    onClick={() => setOpenDropdownId(null)}
                                                >
                                                    <Eye size={16} /> View Property
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-green-500 hover:text-white flex items-center gap-2 cursor-pointer"
                                                    onClick={() => {
                                                        setOpenDropdownId(null);
                                                        Swal.fire({
                                                            position: 'center',
                                                            icon: 'success',
                                                            title: 'Appointment Confirmed',
                                                            showConfirmButton: false,
                                                            timer: 1500,
                                                        });
                                                    }}
                                                >
                                                    <Check size={16} /> Confirm Appointment
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-red-500 hover:text-white flex items-center gap-2 cursor-pointer"
                                                    onClick={() => {
                                                        setOpenDropdownId(null);
                                                        Swal.fire({
                                                            title: 'Are you sure?',
                                                            text: "You won't be able to revert this!",
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Yes, cancel the appointment!',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <X size={16} /> Cancel Appointment
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modales */}
                    <LayoutModal status={isFiltersOpen}>
                        <FiltersAppointmentsModal handleModal={setIsFiltersOpen} />
                    </LayoutModal>

                    <LayoutModal status={isRequestOpen}>
                        <RequestAppointmentModal handleModal={setIsRequestOpen} />
                    </LayoutModal>
                </div>
            </div>
        </div>
    );
}

export default Appointments;
