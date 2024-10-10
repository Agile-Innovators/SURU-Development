import { MainButton } from '../../components/ui/buttons/MainButton';
import { ROUTE_PATHS } from '../../routes';
import { Clock, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { FiltersAppointmentsModal } from '../../components/ui/modals/FiltersAppointmentsModal';
import { RequestAppointmentModal } from '../../components/ui/modals/RequestAppointmentModal'; 

export function Appointments() {
  const [currentPage, setCurrentPage] = useState(1);
  
 //Estado para controlar si el modal de filtros está abierto o cerrado
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  
  //Estado para controlar si el modal de "Add New" está abierto o cerrado
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

  const totalPages = 10;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Función para abrir el modal de filtros
  const handleFiltersClick = () => {
    console.log('Filters button clicked');
    setIsFiltersModalOpen(true);
  };

  // Función para cerrar el modal de filtros
  const closeFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  //Función para abrir el modal de "Add New"
  const handleAddNewClick = () => {
    console.log('Add New button clicked');
    setIsAddNewModalOpen(true);
  };

  //Función para cerrar el modal de "Add New"
  const closeAddNewModal = () => {
    setIsAddNewModalOpen(false);
  };

  return (
    <div className="max-w-5xl m-auto p-4">
      <h1 className="mt-10">Appointments</h1>
      <p>Everything about your appointments</p>

      
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
          <button
            className="text-secondary border-2 border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-md transition-colors duration-150 cursor-pointer"
            onClick={handleFiltersClick}
          >
            Filters
          </button>

          <button
            className="bg-secondary text-white hover:bg-light-blue hover:text-white px-4 py-2 rounded-md"
            onClick={handleAddNewClick} 
          >
            Add New
          </button>
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
              <Clock size={16} className="text-gray-500" /> 
              <span>9:00 am — 10:00 am</span>
            </div>
            {/* Lugar */}
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gray-500" /> 
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
            <MainButton
              text="More Info"
              variant="border"
              type="link"
              customClass="border-r border-gray-300"
              onClick={() => {
                console.log('MainButton clicked');
                handleFiltersClick();
              }}
            />
          </div>
        </div>
      </div>

      
      {console.log('TEST_MODAL_ISAAC', isFiltersModalOpen)}
      {console.log('TEST2_MODAL_ISAAC', isAddNewModalOpen)}
      
      {/* Modal de Filtros */}
      {isFiltersModalOpen && <FiltersAppointmentsModal closeModal={closeFiltersModal} />}
      
      {/* NUEVO: Modal de "Add New" */}
      {isAddNewModalOpen && <RequestAppointmentModal closeModal={closeAddNewModal} />} 
    </div>
  );
}

export default Appointments;
