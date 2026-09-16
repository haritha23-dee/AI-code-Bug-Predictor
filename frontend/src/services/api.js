import axios from 'axios';

const api = axios.create({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('scrs_token');  //wherever jwt lives - localstorage
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;