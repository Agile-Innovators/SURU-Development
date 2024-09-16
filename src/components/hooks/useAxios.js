import { useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../../global/AuthProvider.jsx';

export function useAxios() {
  const { getAuthToken } = useAuth();

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

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [getAuthToken]);

  return axiosInstance;
}
