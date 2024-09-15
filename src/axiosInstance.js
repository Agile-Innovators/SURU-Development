import axios from 'axios';
import { useGetToken } from './utils/authUtils'; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // If the request needs authentication, add the token
    if (config.auth) {
      const token = useGetToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
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