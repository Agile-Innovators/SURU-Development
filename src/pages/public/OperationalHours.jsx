import { useEffect, useState, useContext } from 'react';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useFetchUserOperationalHours } from '../../components/hooks/useFetchOperationalHours';
import { useAuth } from '../../global/AuthProvider';
import { ToggleSwitch } from '../../components/ui/buttons/ToggleSwitch';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../global/ThemeContext';

export function OperationalHours() {
    const { getUser } = useAuth();
    const { user } = getUser();
    const [errorMessages, setErrorMessages] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const { theme } = useContext(ThemeContext); // Accede al tema actual
    const {
        updateUserOperationalHours,
        getOperationalHours,
        loading,
        error,
        data
    } = useFetchUserOperationalHours();
    const [operationalHours, setOperationalHours] = useState([]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    };

    useEffect(() => {
        if (user?.id) {
            getOperationalHours(user.id);
        }
    }, [user?.id]);

    useEffect(() => {
        if (data && data.operational_hours) {
            setOperationalHours(data.operational_hours);
        } else {
            setOperationalHours([]);
        }
    }, [data]);

    const handleTimeChange = (day_of_week, type, value) => {
        const updatedHours = operationalHours.map(hour => {
            if (hour.day_of_week === day_of_week) {
                const newHour = { ...hour, [type]: value };
                if (type === 'start_time' && newHour.end_time && value >= newHour.end_time) {
                    setErrorMessages(prev => ({
                        ...prev,
                        [day_of_week]: 'Start time must be earlier than end time'
                    }));
                    return hour;
                }
                if (type === 'end_time' && newHour.start_time && value <= newHour.start_time) {
                    setErrorMessages(prev => ({
                        ...prev,
                        [day_of_week]: 'End time must be later than start time'
                    }));
                    return hour;
                }
                setErrorMessages(prev => ({
                    ...prev,
                    [day_of_week]: ''
                }));
                return newHour;
            }
            return hour;
        });
        setOperationalHours(updatedHours);
    };

    const handleToggleChange = (day_of_week) => {
        const updatedHours = operationalHours.map(hour => {
            if (hour.day_of_week === day_of_week) {
                return {
                    ...hour,
                    is_closed: !hour.is_closed
                };
            }
            return hour;
        });
        setOperationalHours(updatedHours);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const operationalHoursPayload = operationalHours.map(hour => ({
                day_of_week: hour.day_of_week,
                start_time: formatTime(hour.start_time),
                end_time: formatTime(hour.end_time),
                is_closed: hour.is_closed || false
            }));
            Swal.fire({
                icon: 'success',
                title: 'Operational Hours Updated Successfully',
                text: 'The operational hours have been updated.',
                customClass: theme === 'dark' ? 'swal-dark' : '', // Aplica tema oscuro
            });
            const userId = user.id;
            await updateUserOperationalHours(userId, { operational_hours: operationalHoursPayload });
            await getOperationalHours(user.id);

            isEditing && setIsEditing(false);
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again later.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <div className='p-4'>
            {loading ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-4">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-semibold">Loading...</p>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <ToastContainer
                            position="top-center"
                            autoClose={200}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <div className='flex justify-between gap-2 flex-col sm:flex-row'>
                            <div className='flex flex-col text-center sm:text-left'>
                                <h2>Operational Hours</h2>
                                <p>Choose your preferred hours to receive appointments</p>
                            </div>
                            <div className="flex justify-end items-center mt-4 ">
                                {!isEditing && (
                                    <MainButton
                                        type="button"
                                        variant="fill"
                                        text="Edit"
                                        customClass="h-12 items-center"
                                        onClick={handleEditClick}
                                    />
                                )}
                                {isEditing && (
                                    <MainButton
                                        type="submit"
                                        variant="fill"
                                        text="Save Changes"
                                        customClass="h-12 items-center "
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
                            {operationalHours.length > 0 ? (
                                operationalHours.map(({ day_of_week, start_time, end_time, is_closed }) => (
                                    <div key={day_of_week} className={`flex flex-col gap-4 px-3 py-2 border text-left border-gray-300 dark:border-gray-600 rounded-md sm:flex w-full ${errorMessages[day_of_week] ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600`}>
                                        <div className="flex justify-between items-center gap-4">
                                            <p className="text-black dark:text-white">{day_of_week}</p>
                                            <ToggleSwitch
                                                checked={is_closed}
                                                onChange={() => handleToggleChange(day_of_week)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                                            <span className="text-gray-600 dark:text-gray-400">From</span>
                                            <input
                                                type="time"
                                                value={start_time}
                                                onChange={(e) => handleTimeChange(day_of_week, 'start_time', e.target.value)}
                                                min="06:00"
                                                max="22:00"
                                                className="time-input p-1 border w-full text-black dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                                            <span className="text-gray-600 dark:text-gray-400">To</span>
                                            <input
                                                type="time"
                                                value={end_time}
                                                onChange={(e) => handleTimeChange(day_of_week, 'end_time', e.target.value)}
                                                min="06:00"
                                                max="22:00"
                                                className="time-input p-1 border w-full text-black dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        {errorMessages[day_of_week] && (
                                            <p className="text-red-600 text-sm">{errorMessages[day_of_week]}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No operational hours available.</p>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
