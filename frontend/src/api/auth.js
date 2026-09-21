import api from '../services/api';

export const login = (email, password) => api.post('/auth/login', { email, password });
export const getMe = () => api.get('/me');
// export const updateProfile = (data) => api.put('auth/me', data);
export const signup = (email, password, full_name) =>
    api.post('/auth/signup', {email, password, full_name});

export const uploadAvatar = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

//refresh token 
export const refreshToken = (refresh_token) => api.post('/auth/refresh', {refresh_token});