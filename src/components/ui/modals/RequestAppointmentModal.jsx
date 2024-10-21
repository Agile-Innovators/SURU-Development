import { useState } from 'react';
import { MainButton } from '../buttons/MainButton';
import { Clock, Calendar, X } from 'lucide-react';
import { useAxios } from '../../hooks/useAxios';
import Swal from 'sweetalert2';

export function RequestAppointmentModal({ handleModal }) {
    const axios = useAxios();

    const hours = [
        '09:00 am', '09:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm',
        '01:00 pm', '01:30 pm', '02:00 pm', '02:30 pm', '03:00 pm', '03:30 pm', '04:00 pm', '04:30 pm', '05:00 pm', '05:30 pm', '06:00 pm',
    ];

    // Estado local para manejar los valores de los campos
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    const handleSubmit = () => {
        // Validaciones
        if (!date || !startTime || !endTime) {
            setErrorMessage('All fields must be completed.');
            return;
        }

        if (startTime === endTime) {
            setErrorMessage('Start time and end time cannot be the same.');
            return;
        }

        setErrorMessage(''); // Limpiar mensaje de error si no hay problemas

        // Crear la cita enviando los datos al backend
        const newAppointment = {
            date,
            start_time: startTime,
            end_time: endTime,
            user_message: extraInfo,
        };

        axios.post('/appointment', newAppointment)
            .then(() => {
                // Mostrar mensaje de éxito
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Appointment Created Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Cerrar el modal y limpiar el formulario
                handleModal(false);
                setDate('');
                setStartTime('');
                setEndTime('');
                setExtraInfo('');
            })
            .catch((error) => {
                console.error("Error creating appointment:", error.response || error);
                const errorMessage = error.response?.data?.message || 'Failed to create appointment';
                Swal.fire('Error!', errorMessage, 'error');
            });
    };

    return (
        <div className="bg-white p-6 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-96">
            <button onClick={handleOpenModal}>
                <X className="hover:text-blue-500" />
            </button>
            <h1 className="mb-6">Request an appointment!</h1>

            {/* Mostrar mensaje de error si existe */}
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
                    {/* Hora inicial */}
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

                    {/* Hora final */}
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

            {/* Botón de enviar */}
            <MainButton
                text="Send Request"
                type="button"
                customClass="border-r border-gray-300"
                onClick={handleSubmit}
            />
        </div>
    );
}
