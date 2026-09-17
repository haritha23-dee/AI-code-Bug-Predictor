import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    PlayCircle,
    Download,
    ShieldAlert,
    Gauge,
    Layers,
    Sparkles,
    AlertTriangle,
    Terminal,
    Wand2,
} from 'lucide-react';
import { getFile } from '../../api/files';
import { triggerAnalysis, getLatestAnalysis } from '../../api/analysis';
import Spinner from '../../components/ui/Spinner';

const severityTheme = {
    critical: { text: 'text-red-500', chip: 'text-red-500 bg-red-500/10 border-red-500/30', ring: 'border-red-500/40' },
    high: { text: 'text-orange-500', chip: 'text-orange-500 bg-orange-500/10 border-orange-500/30', ring: 'border-orange-500/40' },
    medium: { text: 'text-yellow-500', chip: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30', ring: 'border-yellow-500/40' },
    low: { text: 'text-blue-400', chip: 'text-blue-400 bg-blue-400/10 border-blue-400/30', ring: 'border-blue-400/40' },
    none: { text: 'text-text-muted', chip: 'text-text-muted bg-border/20 border-border', ring: 'border-border' },
};

export default function FileAnalysisView() {
    const { fileId } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState('');

    const loadFile = async () => {
        setLoading(true);
        try {
            const fileRes = await getFile(fileId);
            setFile(fileRes.data);
            try {
                const latest = await getLatestAnalysis(fileId);
                setAnalysis(latest.data);
            } catch {
                setAnalysis(null);
            }
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load file');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFile();
    }, [fileId]);

    const handleAnalyze = async () => {
        setAnalyzing(true);
        setError('');
        try {
            const res = await triggerAnalysis(fileId);
            setAnalysis(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Analysis failed');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleDownload = () => {
        if (!analysis?.suggested_code_text || !file) return;
        const blob = new Blob([analysis.suggested_code_text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fixed_${file.file_name}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <Spinner full />;
    if (!file) return <div className="text-text-muted">File not found.</div>;

    const theme = severityTheme[analysis?.bug_severity] || severityTheme.none;

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="flex items-center gap-2 h-9 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition disabled:opacity-60 shadow-[0_0_20px_-6px_var(--glow)]"
                    >
                        {analyzing ? <Sparkles size={15} className="animate-pulse" /> : <PlayCircle size={15} />}
                        {analyzing ? 'Analyzing...' : analysis ? 'Re-run Analysis' : 'Run Analysis'}
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!analysis?.suggested_code_text}
                        className="flex items-center gap-2 h-9 px-4 rounded-xl border border-border text-text text-sm hover:bg-border/30 transition disabled:opacity-40"
                    >
                        <Download size={15} />
                        Download Fix
                    </button>
                </div>
            </div>

            {error && (
                <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {error}
                </div>
            )}

            {analysis && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <MetricChip icon={ShieldAlert} label="Bug Score" value={analysis.bug_score} theme={theme} />
                    <MetricChip icon={Layers} label="Complexity" value={analysis.complexity_score} theme={severityTheme.none} />
                    <MetricChip icon={Gauge} label="Quality" value={analysis.quality_score} theme={severityTheme.none} />
                    <div className={`glass-card rounded-xl border ${theme.ring} px-4 py-3`}>
                        <p className="text-[10px] uppercase tracking-widest text-text-muted mb-0.5">Severity</p>
                        <p className={`text-sm font-bold capitalize ${theme.text}`}>{analysis.bug_severity || 'none'}</p>
                    </div>
                </div>
            )}

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[420px]">
                <div className="rounded-2xl border border-border bg-bg-soft overflow-hidden flex flex-col">
                    <PaneHeader icon={Terminal} label={file.file_name} tint="border-border" />
                    <pre className="flex-1 text-xs leading-relaxed text-text overflow-auto p-4 font-mono">
                        <code>{file.original_code}</code>
                    </pre>
                </div>

                <div className="rounded-2xl border border-accent/30 bg-bg-soft overflow-hidden flex flex-col relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent-2/5 to-transparent pointer-events-none" />
                    <PaneHeader icon={Wand2} label="Groq AI Suggested Fix" tint="border-accent/30" accent />
                    <div className="relative flex-1 overflow-auto">
                        {analysis?.suggested_code_text ? (
                            <pre className="text-xs leading-relaxed text-text p-4 font-mono">
                                <code>{analysis.suggested_code_text}</code>
                            </pre>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-text-muted p-8 gap-2">
                                <Sparkles size={22} className="text-accent" />
                                <p className="text-sm">
                                    {analysis ? 'No rewrite suggested for this file.' : 'Run analysis to see the AI-rewritten code.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {analysis && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {analysis.suggested_fix_text && (
                        <div className="glass-card rounded-2xl p-4">
                            <p className="text-xs uppercase tracking-widest text-text-muted mb-2">Why this fix</p>
                            <p className="text-sm text-text-muted whitespace-pre-wrap leading-relaxed">
                                {analysis.suggested_fix_text}
                            </p>
                        </div>
                    )}

                    {analysis.flagged_lines?.length > 0 && (
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
                                <ShieldAlert size={14} className="text-red-500" />
                                <span className="text-xs uppercase tracking-widest text-text-muted">
                                    {analysis.flagged_lines.length} Flagged Line{analysis.flagged_lines.length > 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="divide-y divide-border max-h-40 overflow-auto">
                                {analysis.flagged_lines.map((fl, i) => {
                                    const t = severityTheme[fl.severity] || severityTheme.none;
                                    return (
                                        <div key={i} className="flex items-center gap-2.5 px-4 py-2 text-xs">
                                            <AlertTriangle size={13} className={t.text} />
                                            <span className="font-mono text-text-muted">L{fl.line}</span>
                                            <span className="text-text truncate">{fl.message}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function PaneHeader({ icon: Icon, label, accent }) {
    return (
        <div className={`relative flex items-center gap-2 px-4 py-3 border-b border-border ${accent ? 'bg-accent/5' : 'bg-border/10'}`}>
            <Icon size={14} className={accent ? 'text-accent' : 'text-text-muted'} />
            <span className="text-xs font-medium text-text truncate">{label}</span>
        </div>
    );
}

function MetricChip({ icon: Icon, label, value, theme }) {
    return (
        <div className={`glass-card rounded-xl border ${theme.ring} px-4 py-3 flex items-center justify-between`}>
            <div>
                <p className="text-[10px] uppercase tracking-widest text-text-muted mb-0.5">{label}</p>
                <p className="text-sm font-bold text-text">{value != null ? value : '—'}</p>
            </div>
            <Icon size={16} className={theme.text} />
        </div>
    );
}