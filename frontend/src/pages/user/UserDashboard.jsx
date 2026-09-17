import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, FileText, Plus } from 'lucide-react';
import { listProjects, createProject, deleteProject } from '../../api/projects';
import Spinner from '../../components/ui/Spinner';

export default function UserDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const navigate = useNavigate();

    const loadProjects = async () => {
        setLoading(true);
        try {
            const res = await listProjects();
            setProjects(res.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        try {
            await createProject(newName.trim(), newDesc.trim());
            setNewName('');
            setNewDesc('');
            setCreating(false);
            loadProjects();
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create project');
        }
    };

    const handleDelete = async (projectId) => {
        if (!window.confirm('Delete this project and all its files?')) return;
        try {
            await deleteProject(projectId);
            setProjects((prev) => prev.filter((p) => p.id !== projectId));
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to delete project');
        }
    };

    if (loading) return <Spinner full />;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-text">Your Projects</h1>
                    <p className="text-sm text-text-muted">{projects.length} total</p>
                </div>
                <button
                    onClick={() => setCreating((c) => !c)}
                    className="flex items-center gap-2 h-9 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm transition"
                >
                    <Plus size={16} />
                    New Project
                </button>
            </div>

            {error && (
                <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {error}
                </div>
            )}

            {creating && (
                <form
                    onSubmit={handleCreate}
                    className="glass-card rounded-xl p-4 space-y-3"
                >
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Project name"
                        className="w-full h-9 px-3 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />
                    <textarea
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent"
                        rows={2}
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="h-9 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm transition"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={() => setCreating(false)}
                            className="h-9 px-4 rounded-xl border border-border text-sm text-text-muted hover:bg-border/30 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {projects.length === 0 ? (
                <div className="glass-card rounded-xl p-10 text-center text-text-muted">
                    <FolderKanban className="mx-auto mb-3" size={28} />
                    No projects yet. Create one to get started.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => navigate(`/projects/${project.id}`)}
                            className="glass-card rounded-xl p-4 cursor-pointer hover:border-accent/50 transition space-y-2"
                        >
                            <div className="flex items-center gap-2 text-text font-medium">
                                <FileText size={16} className="text-accent" />
                                {project.name}
                            </div>
                            <p className="text-sm text-text-muted line-clamp-2">
                                {project.description || 'No description'}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-xs text-text-muted">
                                    {new Date(project.created_at).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(project.id);
                                    }}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}