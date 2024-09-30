import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MainButton } from '../../components/ui/buttons/MainButton.jsx';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react'; 
import { ROUTE_PATHS } from '../../routes/index.js';

export function RequestAppointment() {
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(null);
    const [extraDetails, setExtraDetails] = useState('');
    const navigate = useNavigate();

    return (
        <div className="bg-appointment-bg grid">
            <div className="max-w-10xl mx-auto p-5 grid content-center">
                <h1>Request an Appointment!</h1>

                <form className='m-auto text-left mt-10'>

                    <div className="relative mb-4 ">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <div className="relative">

                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-secondary" /> 
                           
                            </span>
                            <DatePicker
                                selected={date}
                                onChange={(selectedDate) => setDate(selectedDate)}
                                dateFormat="MMMM d, yyyy"
                                className="border rounded w-full p-2 pl-10" 
                                placeholderText="Select a date"
                            />
                        </div>
                    </div>

                   
                    <div className="relative mb-4">
                        <label htmlFor="hour" className="block text-sm font-medium text-gray-700 mb-1">Hour</label>
                        <div className="relative">
                    

                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Clock className="h-5 w-5" color="#000000" fill="yellow" /> 
                            </span>
                            <DatePicker
                                selected={hour}
                                onChange={(selectedHour) => setHour(selectedHour)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                className="border rounded w-full p-2 pl-10" 
                            />
                        </div>
                    </div>
                    

                    <div className="mb-4">
                        <label htmlFor="extraDetails" className="block text-sm font-medium text-gray-700 mb-1">Extra Details</label>
                        <textarea
                            id="extraDetails"
                            name="extraDetails"
                            rows="4"
                            className="border rounded w-full p-2"
                            placeholder="Provide additional details"
                            value={extraDetails}
                            onChange={(e) => setExtraDetails(e.target.value)}
                        />
                    </div>

                    <MainButton text="Send Request" type="link" to={ROUTE_PATHS.APPOINTMENTS} variant="fill" customClass="w-full mb-2"/>
                </form>


                <button 
                    type="button" 
                    className="text-blue-500 hover:underline mt-4 mb-10" 
                    
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default RequestAppointment;






