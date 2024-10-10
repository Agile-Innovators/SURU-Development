import { MainButton } from '../buttons/MainButton';  
import { ROUTE_PATHS } from '../../../routes';
import { Clock, Calendar } from 'lucide-react';

export function RequestAppointmentModal({ closeModal }) {
  const hours = [
    '09:00 am', '10:00 am', '11:00 am', '12:00 pm',
    '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm'
  ];

  return (
    <div className="flex w-screen min-h-screen justify-center z-50 left-0 top-0 bg-black/70 p-4 fixed">
      <div className="bg-white p-6 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-96">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500">
          X
        </button>
        <h1 className="mb-6" >Request an appointment!</h1>



        <div className="mb-6">
          <label className="block text-gray-700">Date</label>
          <div className="flex items-center border p-2 rounded-md border-gray-300">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <input
              type="date"
              className="w-full focus:outline-none"
              placeholder="DD / MM / YY"
            />
          </div>
        </div>




        <div className="mb-6">
          <label className="block text-gray-700">Hour</label>
          <div className="flex justify-between items-center gap-4">
            {/* Hora inicial */}
            <div className="flex items-center w-full border p-2 rounded-md border-gray-300">
              <Clock size={16} className="text-gray-500 mr-2" />
              <select className="w-full focus:outline-none">
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
            <div className="flex items-center w-full border p-2 rounded-md border-gray-300">
              <Clock size={16} className="text-gray-500 mr-2" />
              <select className="w-full focus:outline-none">
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



        
        <div className="mb-6">
          <label className="block text-gray-700">Extra Information (optional)</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            rows="4"
            placeholder="Enter any additional information here..."
          />
        </div>





        {/* Botón de enviar */}
        <MainButton
            text="Send Request"
            type="link"
            customClass="border-r border-gray-300"
            to={ROUTE_PATHS.NOT_FOUND}
          />
      </div>
    </div>
  );
}
