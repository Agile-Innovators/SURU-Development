import { useState } from 'react';
import { useAxios } from './useAxios';
export function useFetchUserOperationalHours() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const axios = useAxios();
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // Actualizar el perfil de usuario
    const updateUserOperationalHours = async (userId, operationalHoursData) => {
        setLoading(true);
        // console.log("Estos son los datos que estan llegando a la API:", operationalHoursData);

        try {
            const response = await axios.post(
                `user/update/operational-hours/${userId}`,
                operationalHoursData,
                config
            );
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const getOperationalHours = async (userId) => {
        setLoading(true);
        try {
            const response = await axios.get(`/user/operational-hours/${userId}`);
            setData(response.data);
            console.log('Get operational hours:', response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return {
        updateUserOperationalHours,
        getOperationalHours,
        loading,
        error,
        data,
    };
}
