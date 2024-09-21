import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;