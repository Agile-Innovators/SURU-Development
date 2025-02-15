import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'https://suru-backend.vercel.app/api/api', // for local development
    baseURL: 'https://suru-backend-v2.vercel.app/api/api', // for production
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
