import { useState } from 'react';
import { useAxios } from './useAxios';
import { useAuth } from '../../global/AuthProvider.jsx';

export function useFetchUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const axios = useAxios();
    const { updateUser } = useAuth();

    const updateUserProfile = async (userId, userData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `/user/update/${userId}`,
                userData
            );
            setData(response.data);
            setError(null);
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

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(
                    error.response.data.message ||
                        'An unexpected error occurred.'
                );
            } else {
                throw new Error('An unexpected error occurred.');
            }
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
            // console.log('Get user information:', response.data);

            updateUser(response.data);

            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const getPartnerInformation = async (userId) => {
        setLoading(true);
        try {
            const response = await axios.get(`/partner/${userId}`);
            // const responseAuth = await axios.get(`/user/${userId}`);
            setData(response.data);
            // updateUser(responseAuth.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data || "Error al obtener la información del usuario");
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
        getUserInformation,
        getPartnerInformation
    };
}
