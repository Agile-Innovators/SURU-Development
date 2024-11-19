import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';

export function useFetchServices(idCategory) {
    const [services, setServices] = useState(null);
    const [partnerServices, setPartnerServices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axios = useAxios();

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/services/category/${idCategory}`);
            setServices(response.data);
        } catch (error) {
            const errorMsg = error.response?.data || 'An unexpected error occurred';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const getPartnerServices = async (userId) => {
        setLoading(true);
        setError(null); 
        try {
            const response = await axios.get(`/partner-services/${userId}`);
            setPartnerServices(response.data);
            console.log('Datos obtenidos:', response.data);
        } catch (error) {
            const errorMsg = error.response?.data || 'An unexpected error occurred';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const updatePartnerServices = async (userId, services) => {
        setLoading(true);

        console.log('Datos enviados update:', services);
        try {
            const response = await axios.put(`/partner-update-services/${userId}`, services);
            const data = await response.data;
            setData(data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchServices();
    }, []);

    return { services, updatePartnerServices,partnerServices, getPartnerServices, loading, error };
}
