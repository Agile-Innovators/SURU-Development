import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';
import { useAuth } from '../../global/AuthProvider.jsx';

export function useFetchPartner() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const axios = useAxios();
    const { updateUser } = useAuth();

    const updatePartnerProfile = async (userId, userData) => {
        setLoading(true);
        try {
            const response = await axios.post(`/user/update/${userId}`, userData);
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data || "Error al actualizar el perfil");
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
        updatePartnerProfile,
        getPartnerInformation,
    };
}
