import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileCode, Trash2 } from 'lucide-react';
import { getProject } from '../../api/projects';
import { listFilesForProject, uploadFile, deleteFile } from '../../api/files';
import Spinner from '../../components/ui/Spinner';

export default function ProjectDetail() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [project, setProject] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const load = async () => {
        setLoading(true);
        try {
            const [projectRes, filesRes] = await Promise.all([
                getProject(projectId),
                listFilesForProject(projectId),
            ]);
            setProject(projectRes.data);
            setFiles(filesRes.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load project');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [projectId]);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            await uploadFile(projectId, file);
            const filesRes = await listFilesForProject(projectId);
            setFiles(filesRes.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Upload failed');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDeleteFile = async (fileId) => {
        if (!window.confirm('Delete this file?')) return;
        try {
            await deleteFile(fileId);
            setFiles((prev) => prev.filter((f) => f.id !== fileId));
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to delete file');
        }
    };

    if (loading) return <Spinner full />;
    if (!project) return <div className="text-text-muted">Project not found.</div>;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition"
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </button>

            <div>
                <h1 className="text-xl font-semibold text-text">{project.name}</h1>
                <p className="text-sm text-text-muted">
                    {project.description || 'No description'}
                </p>
            </div>

            {error && (
                <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {error}
                </div>
            )}

            <div className="flex items-center justify-between">
                <h2 className="font-medium text-text">Files ({files.length})</h2>
                <label className="flex items-center gap-2 h-9 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm transition cursor-pointer">
                    <Upload size={16} />
                    {uploading ? 'Uploading...' : 'Upload File'}
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            </div>

            {files.length === 0 ? (
                <div className="glass-card rounded-xl p-10 text-center text-text-muted">
                    No files uploaded yet.
                </div>
            ) : (
                <div className="glass-card rounded-xl divide-y divide-border">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center justify-between px-4 py-3"
                        >
                            <Link
                                to={`/files/${file.id}`}
                                className="flex items-center gap-3 text-sm text-text hover:text-accent transition min-w-0"
                            >
                                <FileCode size={16} className="text-accent shrink-0" />
                                <span className="truncate">{file.file_name}</span>
                                <span className="text-xs text-text-muted shrink-0">
                                    {file.language}
                                </span>
                            </Link>
                            <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="text-text-muted hover:text-red-500 transition shrink-0"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}