import api from '../services/api';

export const login = (email, password) => api.post('/auth/login', { email, password });
export const getMe = () => api.get('/auth/me');
// export const updateProfile = (data) => api.put('auth/me', data);
export const signup = (email, password, full_name) =>
    api.post('/auth/signup', {email, password, full_name});
