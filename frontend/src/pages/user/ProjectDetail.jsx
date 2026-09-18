import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileCode, Trash2, Code2 } from 'lucide-react';
import { getProject } from '../../api/projects';
import { listFilesForProject, uploadFile, createPastedFile, deleteFile } from '../../api/files';
import Spinner from '../../components/ui/Spinner';

const LANGUAGES = [
    { value: 'python', label: 'python' },
    { value: 'javascript', label: 'JavaScript' },
    {value: 'reactjs', label: 'React (JSX/TSX)' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'html', label: 'HTML'},
    { value: 'css', label: 'CSS'},
    {value: 'r', label: 'R'},
]

const EXT_BY_LANG = {
    python: '.py', javascript: '.js', reactjs: '.jsx', java: '.java',
    cpp: '.cpp', c: '.c', html: '.html', css: '.css', r: '.r',
}

export default function ProjectDetail() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [project, setProject] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    //file upload
    const [mode, setMode] = useState('upload');

    //paste mode
    const [pasteLang, setPasteLang] = useState('python');
    const [pasteFileName, setPasteFileName] = useState('');
    const [pasteCode, setPasteCode] = useState('');
    const [pasteSubmitting, setPasteSubmitting] = useState(false);

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

    //copy-paste submission
    const handlePasteSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const trimmedName = pasteFileName.trim();
        const trimmedCode = pasteCode.trim();

        if (!trimmedName) {
            setError('File name is required');
            return;
        }
        if(!trimmedCode){
            setError('Code cannot be empty');
            return;
        }

        const hasExt = /\.[a-zA-Z0-9]+$/.test(trimmedName);
        const finalName = hasExt ? trimmedName : `${trimmedName}${EXT_BY_LANG[pasteLang]}`;

        setPasteSubmitting(true);
        try {
            await createPastedFile(projectId, finalName, pasteLang, trimmedCode);
            const filesRes = await listFilesForProject(projectId);
            setFiles(filesRes.data);
            setPasteFileName('');
            setPasteCode('');
        } catch (err){
            setError(err.response?.data?.detail || 'Failed to save code');
        } finally {
            setPasteSubmitting(false);
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
                <h1 className="text-2xl font-bold tracking-tight text-text">{project.name}</h1>
                <p className="text-sm text-text-muted mt-0.5">
                    {project.description || 'No description'}
                </p>
            </div>

            {error && (
                <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {error}
                </div>
            )}

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="flex border-b border-border">
                    <TabButton
                        active={mode === 'upload'}
                        onClick={() => setMode('upload')}
                        icon={Upload}
                        label="Upload File"
                    />
                    <TabButton
                        active={mode === 'paste'}
                        onClick={() => setMode('paste')}
                        icon={Code2}
                        label="Paste Code"
                    />
                </div>

             <div className="p-4">
                    {mode === 'upload' ? (
                        <label className="flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed border-border hover:border-accent/50 cursor-pointer transition text-text-muted">
                            <Upload size={22} className={uploading ? 'animate-pulse text-accent' : ''} />
                            <span className="text-sm">
                                {uploading ? 'Uploading...' : 'Click to choose a file (max 5MB)'}
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileSelect}
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>
                    ) : (
                        <form onSubmit={handlePasteSubmit} className="space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <select
                                    value={pasteLang}
                                    onChange={(e) => setPasteLang(e.target.value)}
                                    className="h-10 px-3 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent sm:w-48"
                                >
                                    {LANGUAGES.map((l) => (
                                        <option key={l.value} value={l.value}>
                                            {l.label}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    value={pasteFileName}
                                    onChange={(e) => setPasteFileName(e.target.value)}
                                    placeholder={`File name (e.g. main${EXT_BY_LANG[pasteLang]})`}
                                    className="flex-1 h-10 px-3 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent"
                                    required
                                />
                            </div>
                            <textarea
                                value={pasteCode}
                                onChange={(e) => setPasteCode(e.target.value)}
                                placeholder="Paste your code here..."
                                rows={10}
                                className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-xs font-mono text-text focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                                required
                            />
                            <button
                                type="submit"
                                disabled={pasteSubmitting}
                                className="flex items-center gap-2 h-10 px-5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition disabled:opacity-60"
                            >
                                {pasteSubmitting ? 'Saving...' : 'Save & Add File'}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <div>
                <h2 className="font-medium text-text mb-3">Files ({files.length})</h2>

                {files.length === 0 ? (
                    <div className="glass-card rounded-xl p-10 text-center text-text-muted">
                        No files uploaded yet. Upload one or paste code.
                    </div>
                ) : (
                    <div className="glass-card rounded-2xl divide-y divide-border">
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
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition border-b-2 ${
                active
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-transparent text-text-muted hover:text-text'
            }`}
        >
            <Icon size={15} />
            {label}
        </button>
    );
}