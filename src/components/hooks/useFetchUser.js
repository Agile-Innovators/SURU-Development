import { useState } from 'react';
import { useAxios } from './useAxios';


export function useFetchUser () {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const axios = useAxios();

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Actualizar el perfil de usuario
    const updateUserProfile = async (userId, userData) => {
        setLoading(true);
        console.log(userData);

        try {
            const response = await axios.put(`/user/update/${userId}`, userData, config);
            console.log(response.data);
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
            console.log("Error", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar la contraseña de usuario
    const updateUserPassword = async (userId, passwordData) => {
        setLoading(true);
        try {
            const response = await axios.put(`/api/users/${userId}/password`, passwordData, config);
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar horas operativas de usuario
    const updateUserOperationalHours = async (userId, operationalHours) => {
        setLoading(true);
        try {
            const response = await axios.put(`/api/users/${userId}/operational-hours`, { operational_hours: operationalHours }, config);
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        data,
        updateUserProfile,
        updateUserPassword,
        updateUserOperationalHours,
    };
};


