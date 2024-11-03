import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';

export function useFetchServices(idCategory) {
    const [services, setServices] = useState(null);
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
        setError(null); // Resetear el error antes de la nueva solicitud
        try {
            const response = await axios.get(`/partner-services/${userId}`);
            // Establecer los datos de los servicios
            setData(response.data);
            
        } catch (error) {
            const errorMsg = error.response?.data || 'An unexpected error occurred';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const updatePartnerServices = async (userId, services) => {
        setLoading(true);
        // Asegúrate de que services tenga la estructura correcta
        // const userData = { services }; // Envía solo los servicios como datos
        console.log('Datos enviados update:', services);
        try {
            const response = await axios.put(`/partner-update-services/${userId}`, services);
            const data = await response.data; // Asegúrate de corregir el nombre de la variable aquí
            setData(data);
            setError(null);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };


    // Ejecuta fetchServices cuando el hook se monta
    useEffect(() => {
        fetchServices();
    }, []);

    return { services, updatePartnerServices, getPartnerServices, loading, error };
}
