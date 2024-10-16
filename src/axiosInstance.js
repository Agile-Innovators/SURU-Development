import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
