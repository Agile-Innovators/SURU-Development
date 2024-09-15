import axios from 'axios';
//import { getAuthToken } from './AuthProvider.jsx';
import { secureRoutes } from './secureRoutes';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337', // Cambia a la URL de tu API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Require and add the token to the request only for secure routes
    // if (secureRoutes.some(route => config.url.startsWith(route))) {
    //   const token = getAuthToken();
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;