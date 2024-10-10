import { Input } from '../forms/Input';
import { MainButton } from '../buttons/MainButton';  
import { ROUTE_PATHS } from '../../../routes';
import { Clock, MapPin } from 'lucide-react';

export function FiltersAppointmentsModal({ closeModal }) {
  // Lista de horas de 9:00 AM a 5:00 PM
  const hours = [
    '09:00 am', '10:00 am', '11:00 am', '12:00 pm',
    '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm'
  ];

  return (
    <div className="flex w-screen min-h-screen justify-center z-50 left-0 top-0 bg-black/70 p-4 fixed">
      <div className="bg-white p-4 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-96">
        <div className="w-full flex justify-between items-center mb-8">
          <h1>Filters</h1>
          <button onClick={closeModal} className="text-gray-500">
            <strong>X</strong>
          </button>
        </div>

        <div className="space-y-6 text-primary">
          {/* Location */}
          <div>
            <label className="block text-gray-700">Location</label>
            <select className="w-full p-2 border border-gray-300 rounded-md mt-2">
              <option>Select location</option>
              <option>Test 1</option>
              <option>Test 2</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700">Date</label>
            <Input type="date" customClass="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          {/* Hour */}
          <div>
            <label className="block text-gray-700">Hour</label>
            <div className="flex justify-between items-center gap-4">
              {/* Hora inicial */}
              <div className="relative w-full">
                <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select className="w-full pl-10 p-2 border border-gray-300 rounded-md appearance-none">
                  <option>Select start time</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-gray-500">—</span>
              {/* Hora final */}
              <div className="relative w-full">
                <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select className="w-full pl-10 p-2 border border-gray-300 rounded-md appearance-none">
                  <option>Select end time</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Send Request Button */}
          <div className="mt-8">
            <MainButton
              text="Send Request"
              type="link"
              customClass="border-r border-gray-300"
              to={ROUTE_PATHS.NOT_FOUND}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
