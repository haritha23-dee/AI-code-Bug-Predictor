import api from '../services/api';

export const adminLogin = (email, password) => api.post('/auth/admin-login', {email, password});
export const getPlatformOverview = () => api.get('/admin/overview');
export const getUserBreakdown = () => api.get('/admin/users');