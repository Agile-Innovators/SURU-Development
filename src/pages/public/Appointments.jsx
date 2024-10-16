import React, { useState, useEffect } from 'react'; 
import { MainButton } from '../../components/ui/buttons/MainButton';
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
    const [openDropdownId, setOpenDropdownId] = useState(null); // Estado para controlar el menú desplegable de cada cita
    const axios = useAxios(); 

    // Llamada inicial a la API para obtener citas
    useEffect(() => {
        console.log(`Fetching appointments with status: ${currentStatus}`);
        fetchAppointments(currentStatus);
    }, [currentStatus]);

    const fetchAppointments = (status) => {
        setLoading(true); 
        axios.get(`/appointments/user/2/status/${status}`)
            .then(response => {
                console.log("API response:", response.data); 
                setAppointments(response.data); 
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error al obtener las citas:', error); 
                setError('Error al obtener las citas');
                setLoading(false); 
            });
    };

    const handleButtonClick = (status) => {
        console.log(`Button clicked: ${status}`);
        setCurrentStatus(status); 
    };

    const handleFiltersClick = () => setIsFiltersOpen(true);
    const handleRequestModal = () => setIsRequestOpen(true);

    // Función para alternar el menú desplegable específico de una cita
    const toggleDropdown = (appointmentId) => {
        if (openDropdownId === appointmentId) {
            setOpenDropdownId(null); // Cierra si está abierto
        } else {
            setOpenDropdownId(appointmentId); // Abre el menú del appointment con este id
        }
    };

    const handleDeleteConfirmation = () => {
        console.log('Cita eliminada');
        setIsDeleteModalOpen(false);
    };

    if (loading) return <p>Cargando citas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Menú Hamburguesa para móviles */}
            <div className="sm:hidden flex justify-start mt-10 mb-10">
                <button
                    className="text-secondary border-2 border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-md transition-colors duration-150"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? 'Close' : 'Options'}
                </button>
            </div>

            <div
                className={`sm:flex flex-col sm:flex-row mt-10  mb-10 gap-4 ${isMenuOpen ? 'block' : 'hidden'} sm:block`}
            >
                <div className="flex flex-wrap gap-2">
                    <div className="max-w-full m-auto p-4 min-h-[70vh]">
                        <h1 className="mt-10">Appointments</h1>
                        <p>Everything about your appointments</p>
                        <div className="flex flex-row mt-10 justify-between mb-10 w-full">
                            <div className="flex gap-2">
                                <MainButton
                                    text="Upcoming"
                                    variant="border"
                                    customClass={`border-r border-gray-300 ${currentStatus === 'Upcoming' ? 'bg-secondary text-white' : ''}`}
                                    onClick={() => handleButtonClick('Upcoming')}
                                />
                                <MainButton
                                    text="Pending"
                                    variant="border"
                                    customClass={`border-r border-gray-300 ${currentStatus === 'Pending' ? 'bg-secondary text-white' : ''}`}
                                    onClick={() => handleButtonClick('Pending')}
                                />
                                <MainButton
                                    text="Completed"
                                    variant="border"
                                    customClass={`border-r border-gray-300 ${currentStatus === 'Completed' ? 'bg-secondary text-white' : ''}`}
                                    onClick={() => handleButtonClick('Completed')}
                                />
                                <MainButton
                                    text="Cancelled"
                                    variant="border"
                                    customClass={`border-r border-gray-300 ${currentStatus === 'Cancelled' ? 'bg-secondary text-white' : ''}`}
                                    onClick={() => handleButtonClick('Cancelled')}
                                />
                            </div>

                            <div className="flex gap-5">
                                <button
                                    className="w-full sm:w-auto text-secondary border-2 border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-md transition-colors duration-150 "
                                    onClick={handleFiltersClick}
                                >
                                    Filters
                                </button>

                                <button
                                    className="w-full sm:w-auto bg-secondary text-white hover:bg-light-blue hover:text-white px-4 py-2 rounded-md"
                                    onClick={handleRequestModal}
                                >
                                    Add New
                                </button>
                            </div>
                        </div>

                        {/* Mostramos las citas obtenidas */}
                        <div className="grid grid-cols-1 gap-4">
                            {appointments.map((appointment) => (
                                <div key={appointment.id} className="w-full border border-gray-300 rounded-md p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
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
                                                {new Date(appointment.start_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — {new Date(appointment.end_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin size={16} className="text-gray-500" />
                                            <span>Property ID: {appointment.property_id}</span>
                                        </div>
                                    </div>

                                    <div className="hidden sm:block border-l h-12 border-gray-300 mx-4"></div>

                                    <div className="flex-1 text-gray-600 text-left sm:text-center">
                                        <p>{appointment.user_message}</p>
                                    </div>

                                    {/* Menú desplegable tipo kebab */}
                                    <div className="relative">
                                        <button
                                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                                            onClick={() => toggleDropdown(appointment.id)} // Llama toggleDropdown con el id de la cita
                                        >
                                            <MoreHorizontal size={24} />
                                        </button>

                                        {/* Opciones del menú desplegable */}
                                        {openDropdownId === appointment.id && ( // Solo muestra el menú si este appointment.id está activo
                                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                <ul className="text-left">
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-400 hover:text-white flex items-center gap-2 cursor-pointer"
                                                        onClick={() => {
                                                            console.log('View Property clicked');
                                                            setOpenDropdownId(null);
                                                        }}
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
                                                            setIsDeleteModalOpen(true);
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
                                                                    Swal.fire({
                                                                        title: 'Deleted!',
                                                                        text: 'Your file has been deleted.',
                                                                        icon: 'success',
                                                                    });
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
                            <FiltersAppointmentsModal
                                handleModal={setIsFiltersOpen}
                            />
                        </LayoutModal>

                        <LayoutModal status={isRequestOpen}>
                            <RequestAppointmentModal
                                handleModal={setIsRequestOpen}
                            />
                        </LayoutModal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointments;
