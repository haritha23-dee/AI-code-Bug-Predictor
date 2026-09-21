import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('scrs_token');  //wherever jwt lives - localstorage
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error)
);

//clean logout + redirect when any authenticated request comes back
let unauthorizedHandler = null;
export const registerUnauthorizedHandler = (fn) => {
    unauthorizedHandler = fn;
}

const AUTH_ENDPOINTS = ['/auth/login', '/auth/signup', '/auth/admin-login'];

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url || '';
        const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => url.includes(path));

        if (error.response?.status === 401 && !isAuthEndpoint && unauthorizedHandler){
            unauthorizedHandler();
        }
        return Promise.reject(error);
    }
)

export default api;