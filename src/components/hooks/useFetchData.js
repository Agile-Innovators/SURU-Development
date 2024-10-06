import { useState } from 'react';
import { useAxios } from './useAxios';

export function useFetchData() {
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendData = async (url, data) => {
        setLoading(true);
        console.log('Sending data:', data);
        try {
            const response = await axiosInstance.post(url, data);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { sendData, loading, error };
}
