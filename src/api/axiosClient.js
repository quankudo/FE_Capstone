import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3005/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // nếu dùng cookie / session
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data.data,  // giữ nguyên
  (error) => Promise.reject(error)
);

export default axiosClient;