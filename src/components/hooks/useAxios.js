import { useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../../global/AuthProvider.jsx';

export function useAxios() {
    const { getAuthToken, logout, setIsSessionExpired } = useAuth(); 

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                const token = getAuthToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    setIsSessionExpired(true); // Show session expired modal
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [getAuthToken, setIsSessionExpired, logout]);

    return axiosInstance;
}
