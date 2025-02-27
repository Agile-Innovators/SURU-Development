import { useEffect, useState, useContext } from 'react';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { useFetchUserOperationalHours } from '../../components/hooks/useFetchOperationalHours';
import { useAuth } from '../../global/AuthProvider';
import { ThemeContext } from '../../global/ThemeContext';
import { ToggleSwitch } from '../../components/ui/buttons/ToggleSwitch';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function OperationalHours() {

    const { getUser } = useAuth();
    const { user } = getUser();
    const [errorMessages, setErrorMessages] = useState({}); // Estado para controlar la validez de las horas
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando o no
    const { theme } = useContext(ThemeContext);

    // console.log(user);
    const {
        updateUserOperationalHours,
        getOperationalHours,
        loading,
        error,
        data,
    } = useFetchUserOperationalHours();
    const [operationalHours, setOperationalHours] = useState([]); // Se inicia las horas con un array vacío
    // Función para asegurar que el tiempo esté en formato ##:##
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        // Aseguramos que siempre tenga dos dígitos
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    };

    // Se obtienen las horas operativas del usuario desde el API
    useEffect(() => {
        if (user?.id) {
            getOperationalHours(user.id);
        }
    }, [user?.id]);

    // Actualiza el estado local cuando llegan los datos de la API
    useEffect(() => {
        if (data) {
            // Verifica que data esté definido
            // console.log("Estos son los datos de la API", data);
            setOperationalHours(data);
        }
    }, [data]);

    // Manejar el cambio en el tiempo
    //
    const handleTimeChange = (day_of_week, type, value) => {
        const updatedHours = operationalHours.map((hour) => {
            if (hour.day_of_week === day_of_week) {
                const newHour = { ...hour, [type]: value };

                // Validar si start_time es mayor o igual que end_time
                if (
                    type === 'start_time' &&
                    newHour.end_time &&
                    value >= newHour.end_time
                ) {
                    setErrorMessages((prev) => ({
                        ...prev,
                        [day_of_week]:
                            'Start time must be earlier than end time',
                    }));
                    return hour; // No actualizamos si la validación falla
                }

                // Validar si end_time es menor o igual que start_time
                if (
                    type === 'end_time' &&
                    newHour.start_time &&
                    value <= newHour.start_time
                ) {
                    setErrorMessages((prev) => ({
                        ...prev,
                        [day_of_week]: 'End time must be later than start time',
                    }));
                    return hour; // No actualizamos si la validación falla
                }

                // Limpiar mensajes de error si la validación es correcta
                setErrorMessages((prev) => ({
                    ...prev,
                    [day_of_week]: '',
                }));
                return newHour;
            }
            return hour;
        });

        // Actualizamos el estado local
        setOperationalHours(updatedHours);
    };

    // Manejar el cambio en el toggle
    const handleToggleChange = (day_of_week) => {
        const updatedHours = operationalHours.map((hour) => {
            if (hour.day_of_week === day_of_week) {
                return {
                    ...hour,
                    is_closed: !hour.is_closed, // Cambia el estado de is_closed
                };
            }
            return hour;
        });
        // Actualizamos el estado local sin hacer la llamada a la API
        setOperationalHours(updatedHours);
    };

    // Enviar los datos actualizados solo cuando se hace submit
    const handleSubmit = async (e) => {
        // Evita que la página se recargue
        e.preventDefault();
        try {
            const operationalHoursPayload = operationalHours.map((hour) => ({
                day_of_week: hour.day_of_week,
                start_time: formatTime(hour.start_time),
                end_time: formatTime(hour.end_time),
                is_closed: hour.is_closed || false,
            }));

            // console.log("Datos del payload", operationalHoursPayload);
            // Envía los datos y espera a la respuesta
            const userId = user.id;

            await updateUserOperationalHours(userId, {
                operational_hours: operationalHoursPayload,
            });
            // Llama a la función de obtener las horas operativas de nuevo para actualizar el estado
            await getOperationalHours(user.id);

            //muestra un mensaje de éxito
            toast.success('Operational hours updated successfully');
            isEditing && setIsEditing(false);

            // console.log("Datos actualizados y recargados correctamente");
        } catch (error) {
            // console.error("Error al actualizar los datos operacionales", error);
            toast.error(
                'An unexpected error occurred. Please try again later.');
        }
    };

    // Función para alternar entre Edit y Save
    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    };
    return (
        <div className="p-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="flex flex-col gap-2">
                        <h2>Operational Hours</h2>
                        <p>
                            Choose your preferred hours to receive appointments
                        </p>
                    </div>
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
                            theme={theme}
                        />
                        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
                            {operationalHours.length > 0 ? (
                                operationalHours.map(
                                    ({
                                        day_of_week,
                                        start_time,
                                        end_time,
                                        is_closed,
                                    }) => (
                                        <div
                                            key={day_of_week}
                                            className={`flex flex-col gap-4 px-3 py-2 border text-left border-gray-300 dark:border-gray-600 rounded-md sm:flex w-full ${errorMessages[day_of_week] ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600`}
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <p className="text-black dark:text-white">
                                                    {day_of_week}
                                                </p>
                                                <ToggleSwitch
                                                    checked={is_closed} // Pasa el estado de is_closed al ToggleSwitch
                                                    onChange={() =>
                                                        handleToggleChange(
                                                            day_of_week
                                                        )
                                                    }
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    From
                                                </span>
                                                <input
                                                    type="time"
                                                    value={start_time}
                                                    onChange={(e) =>
                                                        handleTimeChange(
                                                            day_of_week,
                                                            'start_time',
                                                            e.target.value
                                                        )
                                                    }
                                                    min="06:00"
                                                    max="22:00"
                                                    className="time-input p-1 border w-full text-black dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    To
                                                </span>
                                                <input
                                                    type="time"
                                                    value={end_time}
                                                    onChange={(e) =>
                                                        handleTimeChange(
                                                            day_of_week,
                                                            'end_time',
                                                            e.target.value
                                                        )
                                                    }
                                                    min="06:00"
                                                    max="22:00"
                                                    className="time-input p-1 border w-full text-black dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            {errorMessages[day_of_week] && (
                                                <p className="text-red-600 text-sm">
                                                    {errorMessages[day_of_week]}
                                                </p>
                                            )}
                                        </div>
                                    )
                                )
                            ) : (
                                <p>No operational hours available.</p>
                            )}
                        </div>
                        <div className="flex justify-end items-center mt-4">
                            {/* Botón para alternar entre Edit y Save */}

                            {isEditing && (
                                <MainButton
                                    type="submit"
                                    variant="fill"
                                    text="Save Changes"
                                    customClass="h-12 items-center"
                                />
                            )}
                        </div>
                    </form>
                    <div className="flex justify-end items-center mt-4">
                        {!isEditing && (
                            <MainButton
                                type="button"
                                variant="fill"
                                text="Edit"
                                customClass="h-12 items-center"
                                onClick={handleEditClick}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
