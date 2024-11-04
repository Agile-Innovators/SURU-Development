import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiltersAppointmentsModal } from '../../components/ui/modals/FiltersAppointmentsModal';
import { RequestAppointmentModal } from '../../components/ui/modals/RequestAppointmentModal';
import { LayoutModal } from '../../components/ui/modals/LayoutModal';
import { useAxios } from '../../components/hooks/useAxios';
import Swal from 'sweetalert2';
import { globalProvider } from '../../global/GlobalProvider';
import { ROUTE_PATHS } from '../../routes';

export function Appointments() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const loggedInUserId = user?.id;

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isRequestOpen, setIsRequestOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStatus, setCurrentStatus] = useState('Scheduled');
    const axios = useAxios();
    const navigate = useNavigate();

    const { setPropertyID } = useContext(globalProvider);

    useEffect(() => {
        fetchAppointments(currentStatus);
    }, [currentStatus]);

    const fetchAppointments = (status) => {
        setLoading(true);
        setAppointments([]);
        axios
            .get(`/appointments/user/${loggedInUserId}/status/${status}`)
            .then((response) => {
                setAppointments(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error.response || error);
                setLoading(false);
            });
    };

    const handleTabChange = (event, newValue) => {
        setCurrentStatus(newValue);
    };

    const confirmAppointment = (appointmentId, userId) => {
        axios.put(`/appointment/accept/${appointmentId}/${userId}`)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Appointment Confirmed',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setAppointments((prevAppointments) => prevAppointments.filter((appt) => appt.id !== appointmentId));
                setCurrentStatus('Confirmed');
                fetchAppointments('Confirmed');
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || 'Failed to confirm the appointment';
                Swal.fire('Error!', errorMessage, 'error');
            });
    };

    const cancelAppointment = (appointmentId, userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`/appointment/cancel/${appointmentId}/${userId}`)
                    .then(() => {
                        Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
                        setAppointments((prevAppointments) => prevAppointments.filter((appt) => appt.id !== appointmentId));
                        setCurrentStatus('Cancelled');
                        fetchAppointments('Cancelled');
                    })
                    .catch((error) => {
                        const errorMessage = error.response?.data?.message || 'Failed to cancel the appointment';
                        Swal.fire('Error!', errorMessage, 'error');
                    });
            }
        });
    };

    const handleSelectChange = (appointment, event) => {
        const action = event.target.value;
        switch (action) {
            case 'view':
                showProperty(appointment.property_id);
                break;
            case 'confirm':
                if (Number(appointment.owner_id) === Number(loggedInUserId) && currentStatus === 'Pending') {
                    confirmAppointment(appointment.id, loggedInUserId);
                }
                break;
            case 'cancel':
                cancelAppointment(appointment.id, loggedInUserId);
                break;
            default:
                break;
        }
    };

    const showProperty = (id) => {
        navigate(`${ROUTE_PATHS.PROPERTY_DETAILS.replace(':propertyId', id)}`);
    };

    const formatMonthYear = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            const options = { month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
        return 'Invalid Date';
    };

    const formatDay = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.getDate() : 'NaN';
    };

    const formatTimeRange = (startTime, endTime) => {
        if (!startTime || !endTime) return 'Invalid Time';
        return `${startTime} — ${endTime}`;
    };

    return (
        <div className="max-w-7xl m-auto p-4 min-h-[80vh] w-full">
            <div className="mt-10 mb-10 gap-4">
                <div className="m-auto p-4">
                    <h1 className="mt-10">Appointments</h1>
                    <p className="dark:text-white">Everything about your appointments</p>

                    <Box className="overflow-x-auto scrollbar-hide" sx={{ maxWidth: { xs: 310, sm: 680 }}}>
                        <Tabs
                            value={currentStatus}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            aria-label="status tabs"
                            className="min-w-[300px] max-w-full"
                        >
                            <Tab label="Scheduled" value="Scheduled" className="dark:text-white" />
                            <Tab label="Pending" value="Pending" className="dark:text-white" />
                            <Tab label="Rejected" value="Rejected" className="dark:text-white" />
                            <Tab label="Cancelled" value="Cancelled" className="dark:text-white" />
                            <Tab label="Completed" value="Completed" className="dark:text-white" />
                        </Tabs>
                    </Box>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {appointments.length === 0 ? (
                            <p className="text-center text-gray-600 font-bold">
                                No appointments found in this category.
                            </p>
                        ) : (
                            <AnimatePresence>
                                {appointments.map((appointment) => (
                                    <motion.div
                                        key={appointment.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full border border-gray-300 rounded-md p-4 flex flex-col md:flex-col lg:flex-row items-center lg:justify-between gap-4"
                                    >
                                        <div className="flex flex-col items-center text-primary">
                                            <span className="text-sm font-medium dark:text-white">
                                                {formatMonthYear(appointment.date)}
                                            </span>
                                            <span className="text-3xl font-bold dark:text-white">
                                                {formatDay(appointment.date)}
                                            </span>
                                        </div>

                                        <div className="hidden lg:block border-l h-12 border-gray-300 mx-4"></div>

                                        <div className="flex flex-col space-y-1 text-gray-600 text-center md:text-left">
                                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                                <Clock size={16} className="text-gray-500 dark:text-white" />
                                                <span className="dark:text-white">
                                                    {formatTimeRange(appointment.start_time, appointment.end_time)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                                <MapPin size={16} className="text-gray-500 dark:text-white" />
                                                <span className="dark:text-white">
                                                    Property ID: {appointment.property_id}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1 text-gray-600 text-center md:text-left">
                                            <p className="dark:text-light-grey text-sm">
                                                {appointment.user_message || 'No extra comments were given'}
                                            </p>
                                        </div>

                                        <div className="relative gap-2 md:gap-4 flex flex-col md:flex-row items-center">
                                            <select
                                                className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
                                                onChange={(event) => handleSelectChange(appointment, event)}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select Action
                                                </option>
                                                {currentStatus === 'Pending' && Number(appointment.owner_id) === Number(loggedInUserId) && (
                                                    <option className="hover:bg-green-300" value="confirm">
                                                        Confirm Appointment
                                                    </option>
                                                )}
                                                <option value="cancel" className="hover:bg-red-300">
                                                    Cancel Appointment
                                                </option>
                                            </select>

                                            <button
                                                className="text-secondary border-2 border-secondary hover:bg-secondary dark:border-light-blue dark:text-light-blue hover:text-white py-3 px-3"
                                                onClick={() => showProperty(appointment.property_id)}
                                            >
                                                View Property
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

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
