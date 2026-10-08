import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost/api', // الرابط الافتراضي ديال Laravel Sail
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// هاد الـ Interceptor كيزيد الـ Token تلقائياً في الـ Header ديال أي Request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token'); // غادي نخبيو الـ token هنا

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;