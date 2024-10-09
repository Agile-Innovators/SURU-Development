import { MainButton } from '../../components/ui/buttons/MainButton';
import { ROUTE_PATHS } from '../../routes';
import { Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

export function Appointments() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
            to={ROUTE_PATHS.NOT_FOUND}
          />
          <MainButton
            text="Add New"
            type="link"
            customClass="border-r border-gray-300"
            to={ROUTE_PATHS.NOT_FOUND}
          />
        </div>
      </div>

     

      <div className="gap-4 grid"> {/* Listado de citas */}

      <div >
        <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
          
          <div className="flex flex-col items-center text-primary">
            <span className="text-sm font-medium">Wed</span>
            <span className="text-3xl font-bold">28</span>
          </div>

         
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          
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

          
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          
          <div className="flex-1 text-gray-600">
            <p>Lorem ipsum dolor sit amet consectetur. Sagittis id dictum morbi fusce. Donec elit lorem ….</p>
          </div>

          
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          
          <div>
          <MainButton
            text="More Info"
            type="link"
            customClass="border-r border-gray-300"
             variant="border"
            to={ROUTE_PATHS.NOT_FOUND}
          />
          </div>
        </div>
      </div>

      <div className="gap-4 grid">
        <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
          
          <div className="flex flex-col items-center text-primary">
            <span className="text-sm font-medium">Wed</span>
            <span className="text-3xl font-bold">28</span>
          </div>

         
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          
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

          
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          
          <div className="flex-1 text-gray-600">
            <p>Lorem ipsum dolor sit amet consectetur. Sagittis id dictum morbi fusce. Donec elit lorem ….</p>
          </div>

          
          <div className="border-l h-12 border-gray-300 mx-4"></div>

          
          <div>
          <MainButton
            text="More Info"
            type="link"
            customClass="border-r border-gray-300"
             variant="border"
            to={ROUTE_PATHS.NOT_FOUND}
          />
          </div>
        </div>
      </div>

      </div>{/* Listado de citas */}
      
      

      <div className="flex items-center justify-center space-x-4 mt-8 text-gray-500">
        
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="disabled:text-gray-300"
        >
          <ChevronLeft size={20} />
        </button>

       
        <span>{`${currentPage} de ${totalPages}`}</span>

        
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="disabled:text-gray-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Appointments;
