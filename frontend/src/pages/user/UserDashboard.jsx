import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, FileText, Plus, Sparkles } from 'lucide-react';
import { listProjects, createProject, deleteProject } from '../../api/projects';
import Spinner from '../../components/ui/Spinner';
import { useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function UserDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [showUnauthorized, setShowUnauthorized] = useState(!!location.state?.unauthorized);

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
            {showUnauthorized && (
                <div className="flex items-center justify-between gap-3 text-sm text-orange-500 border border-orange-500/30 bg-orange-500/10 rounded-xl px-4 py-2.5">
                    <span className="flex items-center gap-2">
                        <ShieldAlert size={16} />
                        You don't have permission to access that page.
                    </span>
                    <button
                        onClick={() => setShowUnauthorized(false)}
                        className="text-xs underline hover:no-underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-3"></div>

            {error && (
                <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {error}
                </div>
            )}

            {creating && (
                <form onSubmit={handleCreate} className="glass-card rounded-2xl p-5 space-y-3">
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Project name"
                        className="w-full h-10 px-3.5 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                        required
                    />
                    <textarea
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                        rows={2}
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="h-10 px-5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={() => setCreating(false)}
                            className="h-10 px-5 rounded-xl border border-border text-sm text-text-muted hover:bg-border/30 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {projects.length === 0 ? (
                <div className="glass-card rounded-2xl p-14 text-center text-text-muted">
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                        <FolderKanban size={22} className="text-accent" />
                    </div>
                    No projects yet. Create one to get started.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => navigate(`/projects/${project.id}`)}
                            className="group relative overflow-hidden glass-card rounded-2xl p-5 cursor-pointer hover:border-accent/40 transition hover:-translate-y-1 space-y-2.5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent-2/0 group-hover:from-accent/10 group-hover:to-accent-2/5 transition pointer-events-none" />
                            <div className="relative flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                                    <FileText size={16} className="text-accent" />
                                </div>
                                <span className="font-medium text-text truncate">{project.name}</span>
                            </div>
                            <p className="relative text-sm text-text-muted line-clamp-2 min-h-[2.5em]">
                                {project.description || 'No description'}
                            </p>
                            <div className="relative flex items-center justify-between pt-1">
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