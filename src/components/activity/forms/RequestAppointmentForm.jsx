import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "../../ui/forms/Input.jsx";
import { MainButton } from "../../ui/buttons/MainButton.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function RequestAppointmentForm() {
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(null);
    const [extraDetails, setExtraDetails] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', { date, hour, extraDetails });
      
    };

    return (
        <form onSubmit={handleSubmit} className="m-auto max-w-md p-4 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Request an Appointment</h1>
            <div className="grid gap-4 my-4">
                
                
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <DatePicker 
                        selected={date} 
                        onChange={(selectedDate) => setDate(selectedDate)} 
                        dateFormat="MMMM d, yyyy"
                        className="border rounded w-full p-2" 
                        placeholderText="Select a date"
                    />
                </div>
                
            
                <div>
                    <label htmlFor="hour" className="block text-sm font-medium text-gray-700 mb-1">Hour</label>
                    <DatePicker
                        selected={hour}
                        onChange={(selectedHour) => setHour(selectedHour)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="border rounded w-full p-2"
                        placeholderText="Select an hour"
                    />
                </div>
                
                
                <Input 
                    type="text" 
                    label="Extra Details" 
                    inputName="extraDetails" 
                    inputId="extraDetails" 
                    labelText="Extra Details"
                    value={extraDetails}  
                    onChange={(e) => setExtraDetails(e.target.value)} 
                />
            </div>

            
            <MainButton text="Send Request" type="submit" variant="fill" customClass="w-full mb-2"/>
            
           
            <button 
                type="button" 
                className="text-blue-500 hover:underline" 
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
        </form>
    );
}

export default RequestAppointmentForm;
