import api from '../services/api';

export const triggerAnalysis = (fileId) => api.post(`/files/${fileId}/analyze`);
export const getLatestAnalysis = (fileId) => api.get(`/files/${fileId}/analysis/latest`);
export const getAnalysisHistory = (fileId) => api.get(`/files/${fileId}/analysis/history`);

export const getAggregatedUserHistory = async () => {
    const { listProjects } = await import('./projects');
    const { listFilesForProject } = await import('./files');

    const projectsRes = await listProjects();
    const projects = projectsRes.data;

    const perProject = await Promise.all(
        projects.map(async (project) => {
            const filesRes = await listFilesForProject(project.id);
            const files = filesRes.data;

            const perFile = await Promise.all(
                files.map(async (file) => {
                    try {
                        const historyRes = await getAnalysisHistory(file.id);
                        return historyRes.data.map((entry) => ({
                            ...entry,
                            file_name: file.file_name,
                            project_name: project.name,
                        }));
                    } catch {
                        return [];
                    }
                })
            );
            return perFile.flat();
        })
    );

    return perProject.flat().sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
};