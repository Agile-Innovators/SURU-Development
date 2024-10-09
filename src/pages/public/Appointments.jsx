import { MainButton } from '../../components/ui/buttons/MainButton';
import { ROUTE_PATHS } from '../../routes';
import { Clock, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { AppointmentsModal } from '../../components/ui/modals/AppointmentsModal';

export function Appointments() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // NUEVO: Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);  
  
  const totalPages = 10;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // NUEVO: Función para abrir el modal
  const handleFiltersClick = () => {
    console.log('Filters button clicked');  // Agrega este log para verificar
    setIsModalOpen(true);  // Cambia el estado a "true"
  };
  

  // NUEVO: Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);  // Cambiar el estado a "false" para cerrar el modal
  };

  return (
    <div className="max-w-5xl m-auto p-4">
      <h1 className="mt-10">Appointments</h1>
      <p>Everything about your appointments</p>

      {/* Botones */}
      <div className="flex flex-row mt-10 justify-between mb-10 ">
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
          <MainButton
            text="Filters"
            variant="border"
            type="link"
            customClass="border-r border-gray-300"
            onClick={() => {
                handleFiltersClick();
              }}
          />
          <MainButton
            text="Add New"
            type="link"
            customClass="border-r border-gray-300"
            to={ROUTE_PATHS.NOT_FOUND}
          />
        </div>
      </div>

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
            {/* Hora */}
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-500" /> {/* Ícono de reloj */}
              <span>9:00 am — 10:00 am</span>
            </div>
            {/* Lugar */}
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gray-500" /> {/* Ícono de ubicación */}
              <span>Ciudad Quesada, Costa Rica</span>
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          {/* Descripción */}
          <div className="flex-1 text-gray-600">
            <p>Lorem ipsum dolor sit amet consectetur. Sagittis id dictum morbi fusce. Donec elit lorem ….</p>
          </div>

          {/* Divisor vertical */}
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          {/* Botón de "More Info" */}
          <div>
            <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md">
              More Info <span className="ml-2">▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* NUEVO: Renderización condicional del modal */}
      {isModalOpen && <AppointmentsModal closeModal={closeModal} />}  {/* Mostrar el modal solo si isModalOpen es true */}
    </div>
  );
}

export default Appointments;
