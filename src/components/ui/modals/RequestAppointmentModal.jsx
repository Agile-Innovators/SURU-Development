import { useState } from 'react';
import { MainButton } from '../buttons/MainButton';
import { Clock, Calendar, X } from 'lucide-react';
import { useAxios } from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { useAuth } from '../../../global/AuthProvider';


export function RequestAppointmentModal({ handleModal, userId, propertyId}) {
    const axios = useAxios();

    const hours = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
    ];


    const { getUser } = useAuth();
    const { user } = getUser();

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        if (hours && minutes) {
            return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        }
        return time;
    };

    const handleSubmit = () => {
        if (!date || !startTime || !endTime) {
            setErrorMessage('All fields must be completed.');
            return;
        }

        if (startTime === endTime) {
            setErrorMessage('Start time and end time cannot be the same.');
            return;
        }

        setErrorMessage('');

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        const newAppointment = {
            date, 
            start_time: formattedStartTime, 
            end_time: formattedEndTime, 
            //owner_id:userId,
            user_message: extraInfo || "No extra comments were given",
            user_id: user.id,    
            property_id: propertyId, 
        };

        console.log("Datos enviados:", newAppointment); // Confirmar la estructura de los datos

        axios.post('/appointment', newAppointment)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Appointment Created Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });

                handleModal(false);
                setDate('');
                setStartTime('');
                setEndTime('');
                setExtraInfo('');
            })
            .catch((error) => {
                console.error("Error creating appointment:", error.response?.data || error);
                const errorMessage = error.response?.data?.message || 'Failed to create appointment';
                if (error.response?.data?.errors) {
                    console.log("Detalles de errores:", error.response.data.errors);
                }
                Swal.fire('Error!', errorMessage, 'error');
            });
    };

    return (
        <div className="bg-white p-6 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-96">
            <button onClick={handleOpenModal}>
                <X className="hover:text-blue-500" />
            </button>
            <h1 className="mb-6">Request an appointment!</h1>

            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

            <div className="mb-6">
                <label className="block text-gray-700">Date</label>
                <div className="flex items-center border p-2 rounded-md border-gray-300">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <input
                        type="date"
                        className="w-full focus:outline-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700">Hour</label>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center w-full border p-2 rounded-md border-gray-300">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <select
                            className="w-full focus:outline-none"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        >
                            <option value="">Select start time</option>
                            {hours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="text-gray-500">—</span>

                    <div className="flex items-center w-full border p-2 rounded-md border-gray-300">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <select
                            className="w-full focus:outline-none"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        >
                            <option value="">Select end time</option>
                            {hours.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
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
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    placeholder="Enter any additional information here..."
                />
            </div>

            <MainButton
                text="Send Request"
                type="button"
                customClass="border-r border-gray-300"
                onClick={handleSubmit}
            />
        </div>
    );
}
