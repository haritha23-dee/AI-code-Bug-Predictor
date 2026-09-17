import api from '../services/api';

export const listFilesForProject = (projectId) => api.get(`/files/project/${projectId}`);
export const getFile = (fileId) => api.get(`/files/${fileId}`);
export const uploadFile = (projectId, file) => {
    const formData = new FormData();
    formData.append('project_id', projectId);
    formData.append('file', file);
    return api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const createPastedFile = (projectId, fileName, language, originalCode) =>
    api.post('/files', {
        project_id: projectId,
        file_name: fileName,
        language,
        original_code: originalCode,
    });
    
export const deleteFile = (fileId) => api.delete(`/files/${fileId}`);