import { useState } from 'react';
import { MainButton } from '../buttons/MainButton';
import { Clock, X } from 'lucide-react';

export function FiltersAppointmentsModal({ handleModal, onApplyFilters }) {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    
    const hours = [
        '08:00 am', '08:30 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm',
        '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm'
    ];

    const handleApplyFilters = () => {
        onApplyFilters({
            location,
            date,
            startTime,
            endTime
        });
    };

    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    return (
        <div className="bg-white p-4 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-96">
            <div className="w-full flex justify-between items-center mb-8">
                <h1>Filters</h1>
                <button onClick={handleOpenModal}>
                    <X className="hover:text-blue-500" />
                </button>
            </div>

            <div className="space-y-6 text-primary">
                <div>
                    <label className="block text-gray-700">Location</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="">Select location</option>
                        <option value="Test 1">Test 1</option>
                        <option value="Test 2">Test 2</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Hour</label>
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative w-full">
                            <Clock
                                size={16}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            />
                            <select
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full pl-10 p-2 border border-gray-300 rounded-md"
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
                        <div className="relative w-full">
                            <Clock
                                size={16}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            />
                            <select
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                                >
                                <option value="">Select end time</option>
                                {hours.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <MainButton
                        text="Apply Filters"
                        onClick={handleApplyFilters}
                        customClass="border-r border-gray-300"
                    />
                </div>
            </div>
        </div>
    );
}
