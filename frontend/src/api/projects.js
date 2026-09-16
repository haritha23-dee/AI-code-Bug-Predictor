import api from '../services/api';

export const listProjects = () => api.get('/projects');
export const getProject = (projectId) => api.get(`/projects/${projectId}`);
export const createProject = (name, description) =>
    api.post('/projects', { name, description});
export const deleteProject = (projectId) => api.delete(`/projects/${projectId}`);