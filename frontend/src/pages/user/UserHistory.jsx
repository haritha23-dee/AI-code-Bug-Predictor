// dynamic user history
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, FileCode, FolderKanban } from 'lucide-react';
import { getAggregatedUserHistory } from '../../api/analysis';
import Spinner from '../../components/ui/Spinner';

const severityTheme = {
    critical: 'text-red-500 bg-red-500/10 border-red-500/30 shadow-[0_0_14px_-4px_rgba(239,68,68,0.5)]',
    high: 'text-orange-500 bg-orange-500/10 border-orange-500/30 shadow-[0_0_14px_-4px_rgba(249,115,22,0.45)]',
    medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_14px_-4px_rgba(234,179,8,0.4)]',
    low: 'text-blue-400 bg-blue-400/10 border-blue-400/30 shadow-[0_0_14px_-4px_rgba(96,165,250,0.4)]',
    none: 'text-text-muted bg-border/20 border-border',
};

export default function UserHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAggregatedUserHistory()
            .then((data) => {
                if (Array.isArray(data)) {
                    setHistory(data);
                } else if (data && Array.isArray(data.data)) {
                    setHistory(data.data);
                } else {
                    console.error("Backend sent garbage instead of an array:", data);
                    setHistory([]); 
                }
            })
            .catch((err) => setError(err.response?.data?.detail || 'Failed to load history'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner full />;

    if (error) {
        return (
            <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-text">Analysis History</h1>
                <p className="text-sm text-text-muted mt-0.5">
                    {history.length} run{history.length !== 1 ? 's' : ''} across all your projects
                </p>
            </div>

            {history.length === 0 ? (
                <div className="glass-card rounded-2xl p-14 text-center text-text-muted">
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                        <History size={22} className="text-accent" />
                    </div>
                    No analysis runs yet. Analyze a file to see it here.
                </div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-widest">
                                    <th className="px-5 py-3.5 font-medium">Project</th>
                                    <th className="px-5 py-3.5 font-medium">File</th>
                                    <th className="px-5 py-3.5 font-medium">Date</th>
                                    <th className="px-5 py-3.5 font-medium">Bug Score</th>
                                    <th className="px-5 py-3.5 font-medium">Severity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {history.map((entry, i) => {
                                    const theme = severityTheme[entry.bug_severity] || severityTheme.none;
                                    return (
                                        <tr
                                            key={entry.id || i}
                                            onClick={() => navigate(`/files/${entry.file_id}`)}
                                            className="cursor-pointer hover:bg-accent/5 transition group"
                                        >
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-2 text-text-muted">
                                                    <FolderKanban size={14} className="shrink-0" />
                                                    <span className="truncate max-w-[160px]">{entry.project_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-2 text-text font-medium group-hover:text-accent transition">
                                                    <FileCode size={14} className="text-accent shrink-0" />
                                                    <span className="truncate max-w-[200px]">{entry.file_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-text-muted whitespace-nowrap">
                                                {entry.created_at
                                                    ? new Date(entry.created_at).toLocaleDateString(undefined, {
                                                          year: 'numeric', month: 'short', day: 'numeric',
                                                      })
                                                    : '—'}
                                            </td>
                                            <td className="px-5 py-3.5 text-text font-semibold">
                                                {entry.bug_score != null ? entry.bug_score : '—'}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-block px-2.5 py-1 rounded-lg border text-xs font-medium capitalize ${theme}`}>
                                                    {entry.bug_severity || 'none'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}