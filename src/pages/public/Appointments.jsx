import { MainButton } from '../../components/ui/buttons/MainButton';
import { ROUTE_PATHS } from '../../routes';
import { Clock, MapPin, MoreHorizontal, Check, X, Eye } from 'lucide-react'; // Añadimos el ícono Eye
import React, { useState } from 'react';
import { FiltersAppointmentsModal } from '../../components/ui/modals/FiltersAppointmentsModal';
import { RequestAppointmentModal } from '../../components/ui/modals/RequestAppointmentModal';
import { LayoutModal } from '../../components/ui/modals/LayoutModal';

export function Appointments() {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isRequestOpen, setIsRequestOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla el menú desplegable

    // Función para abrir el modal de filtros
    const handleFiltersClick = () => {
        console.log('Filters button clicked');
        setIsFiltersOpen(true);
    };

    const handleRequestModal = () => {
        setIsRequestOpen(true);
    };

    // Función para alternar el menú desplegable
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className="max-w-5xl m-auto p-4">
            <h1 className="mt-10">Appointments</h1>
            <p>Everything about your appointments</p>
            <div className="flex flex-row mt-10 justify-between mb-10">
                <div className="flex gap-2">
                    <MainButton
                        text="Upcoming"
                        variant="border"
                        type="link"
                        customClass="border-r border-gray-300"
                        to={ROUTE_PATHS.NOT_FOUND}
                    />
                    <MainButton
                        text="Pending"
                        variant="border"
                        type="link"
                        customClass="border-r border-gray-300"
                        to={ROUTE_PATHS.NOT_FOUND}
                    />
                    <MainButton
                        text="Completed"
                        variant="border"
                        type="link"
                        customClass="border-r border-gray-300"
                        to={ROUTE_PATHS.NOT_FOUND}
                    />
                    <MainButton
                        text="Cancelled"
                        variant="border"
                        type="link"
                        customClass="border-r border-gray-300"
                        to={ROUTE_PATHS.NOT_FOUND}
                    />
                </div>

                <div className="flex gap-5">
                    <button
                        className="text-secondary border-2 border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-md transition-colors duration-150 cursor-pointer"
                        onClick={handleFiltersClick}
                    >
                        Filters
                    </button>

                    <button
                        className="bg-secondary text-white hover:bg-light-blue hover:text-white px-4 py-2 rounded-md"
                        onClick={handleRequestModal}
                    >
                        Add New
                    </button>
                </div>
            </div>

            <div className="gap-4 grid">
                {/* Listado de citas */}
                <div className="gap-4 grid">
                    <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
                        {/* Fecha */}
                        <div className="flex flex-col items-center text-primary">
                            <span className="text-sm font-medium">Wed</span>
                            <span className="text-3xl font-bold">28</span>
                        </div>

                        {/* Divisor vertical */}
                        <div className="border-l h-12 border-gray-300 mx-4"></div>

                        {/* Información de hora y lugar */}
                        <div className="flex flex-col space-y-1 text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Clock size={16} className="text-gray-500" />
                                <span>9:00 am — 10:00 am</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} className="text-gray-500" />
                                <span>Ciudad Quesada, Costa Rica</span>
                            </div>
                        </div>

                        {/* Divisor vertical */}
                        <div className="border-l h-12 border-gray-300 mx-4"></div>

                        {/* Descripción */}
                        <div className="flex-1 text-gray-600">
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Sagittis id dictum morbi fusce. Donec elit lorem ….
                            </p>
                        </div>

                        {/* Divisor vertical */}
                        <div className="border-l h-12 border-gray-300 mx-4"></div>

                        {/* Menú desplegable tipo kebab */}
                        <div className="relative">
                            <button
                                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                                onClick={toggleDropdown}
                            >
                                <MoreHorizontal size={24} />
                            </button>

                            {/* Opciones del menú desplegable (los tres puntitos) */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                    <ul className="text-left">
                                        <li
                                            className="px-4 py-2 hover:bg-gray-400 hover:text-white flex items-center gap-2 cursor-pointer"
                                            onClick={() => {
                                                console.log('View Property clicked');
                                                setIsDropdownOpen(false); 
                                            }}
                                        >
                                            <Eye size={16} /> View Property
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-green-500 hover:text-white flex items-center gap-2 cursor-pointer"
                                            onClick={() => {
                                                console.log('Confirm clicked');
                                                setIsDropdownOpen(false); 
                                            }}
                                        >
                                            <Check size={16} /> Confirm Appointment
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-red-500 hover:text-white flex items-center gap-2 cursor-pointer"
                                            onClick={() => {
                                                console.log('Cancel clicked');
                                                setIsDropdownOpen(false); 
                                            }}
                                        >
                                            <X size={16} /> Cancel Appointment
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modales */}
            <LayoutModal status={isFiltersOpen}>
                <FiltersAppointmentsModal handleModal={setIsFiltersOpen} />
            </LayoutModal>

            <LayoutModal status={isRequestOpen}>
                <RequestAppointmentModal handleModal={setIsRequestOpen} />
            </LayoutModal>
        </div>
    );
}

export default Appointments;
