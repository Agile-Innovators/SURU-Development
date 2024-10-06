import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://suru-backend.vercel.app/api/api',
  timeout: 10000
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
