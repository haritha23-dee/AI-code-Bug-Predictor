import { RefreshCw, Sparkles } from 'lucide-react';

export default function RefreshBar({ eyebrow, title, subtitle, updatedAt, refreshing, onRefresh }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 text-accent mb-1">
                    <Sparkles size={14} />
                    <span className="text-xs uppercase tracking-widest">{eyebrow}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    {updatedAt ? `Updated ${updatedAt.toLocaleTimeString()} · auto 30s` : 'Loading…'}
                </span>
                <button
                    onClick={onRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 h-9 px-3.5 rounded-xl border border-border text-sm hover:bg-border/30 transition disabled:opacity-60"
                >
                    <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh
                </button>
            </div>
        </div>
    );
}