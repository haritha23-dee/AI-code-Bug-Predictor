import api from '../services/api';

export const triggerAnalysis = (fileId) => api.post(`/files/${fileId}/analyze`);
export const getLatestAnalysis = (fileId) => api.get(`/files/${fileId}/analysis/latest`);
export const getAnalysisHistory = (fileId) => api.get(`/files/${fileId}/analysis/history`);

export const getAggregatedUserHistory = () => api.get('/files/all/history');