import { useState } from 'react';
import { useAxios } from './useAxios';
import { useAuth } from '../../global/AuthProvider.jsx';

export function useFetchUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const axios = useAxios();
    const { updateUser } = useAuth();

    // Actualizar el perfil de usuario
    const updateUserProfile = async (userId, userData) => {
        setLoading(true);
        console.log("Datos enviados update: ". userData);
        try {
            const response = await axios.post(`/user/update/${userId}`, userData);
            setData(response.data);
            setError(null);
            // Retornar la respuesta completa en consola
            console.log('Data respondida', response.data);

        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar la contraseña de usuario
    const updateUserPassword = async (userId, passwordData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `/user/${userId}/update-password`,
                passwordData
            );
            
            // Retornar la respuesta completa
            return response.data; // Esto permite acceder a `response.message` en el manejador
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };
    

    // Actualizar horas operativas de usuario
    const updateUserOperationalHours = async (userId, operationalHours) => {
        setLoading(true);
        try {
            const response = await axios.put(
                `/api/users/${userId}/operational-hours`,
                { operational_hours: operationalHours }
            );
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    // Obtener la información del usuario
    const getUserInformation = async (userId) => {
        setLoading(true);
        try {
            const response = await axios.get(`/user/${userId}`);
            setData(response.data);
            console.log('Get user information:', response.data);
            // Actualizar la información del usuario en el contexto de autenticación
            updateUser(response.data);
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
        getUserInformation,
    };
}
