import { useState } from 'react';
import { useAxios } from './useAxios';

export function useFetchCurrency() {
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePartnerCurrency = async (userId, userData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/partners/${userId}/change-currency`, userData);
            console.log("Actualizado: ",response.data);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };
    return { updatePartnerCurrency, loading, error };
}
