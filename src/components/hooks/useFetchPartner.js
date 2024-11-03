import { useState } from 'react';
import { useAxios } from './useAxios';
import { useAuth } from '../../global/AuthProvider.jsx';

export function useFetchPartner() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const axios = useAxios();
    const { updateUser } = useAuth();

    // Actualizar el perfil de usuario
    const updatePartnerProfile = async (userId, userData) => {
        setLoading(true);
        // console.log("Datos enviados update: ". userData);
        try {
            const response = await axios.post(`/user/update/${userId}`, userData);
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };
    

    // Obtener la información del usuario
    const getPartnerInformation = async (userId) => {
        setLoading(true);
        try {
            const response = await axios.get(`/partner/${userId}`);
            const responseAuth = await axios.get(`/user/${userId}`);
            setData(response.data);
            // console.log('Get user information:', response.data);
            // Actualizar la información del usuario en el contexto de autenticación
            updateUser(responseAuth.data);

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
        updatePartnerProfile,
        getPartnerInformation,
    };
}
