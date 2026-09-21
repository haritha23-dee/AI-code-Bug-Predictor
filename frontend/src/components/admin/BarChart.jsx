import { useState, useMemo } from 'react';
import { Zap, Bug, ShieldAlert, Code2 } from 'lucide-react';

export default function BarChart({ data = [], height = 280 }) {
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const summary = useMemo(() => {
        if (!data || data.length === 0) return { totalScans: 0, totalBugs: 0, criticalCount: 0 };
        return data.reduce(
            (acc, curr) => ({
                totalScans: acc.totalScans + curr.scans,
                totalBugs: acc.totalBugs + curr.bugsFound,
                criticalCount: acc.criticalCount + curr.critical,
            }),
            { totalScans: 0, totalBugs: 0, criticalCount: 0 }
        );
    }, [data]);

    if (!data || data.length === 0) {
        return (
            <div className="w-full flex items-center justify-center text-sm text-text-muted" style={{ height }}>
                No scan telemetry recorded for this timeframe.
            </div>
        );
    }

    const maxScans = Math.max(...data.map((d) => d.scans), 1);

    return (
        <div className="w-full flex flex-col">
            <div className="grid grid-cols-3 gap-3 mb-6 pb-4 border-b border-border/40">
                <div>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted block">7-Day Throughput</span>
                    <span className="text-lg font-bold text-text">{summary.totalScans.toLocaleString()} <span className="text-xs font-normal text-text-muted">files</span></span>
                </div>
                <div>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted block">Total Vulnerabilities</span>
                    <span className="text-lg font-bold text-accent-2">{summary.totalBugs.toLocaleString()} <span className="text-xs font-normal text-text-muted">flagged</span></span>
                </div>
                <div>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted block">Critical Risk Catch</span>
                    <span className="text-lg font-bold text-red-500">{summary.criticalCount} <span className="text-xs font-normal text-text-muted">halted</span></span>
                </div>
            </div>

            <div className="relative w-full flex flex-col" style={{ height }}>
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="w-full border-t border-border/25 flex justify-end">
                            <span className="text-[9px] text-text-muted/60 font-mono -mt-3 mr-1">
                                {Math.round(maxScans - (i * (maxScans / 3)))}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="relative flex-1 flex items-end justify-between gap-2.5 sm:gap-4 z-10">
                    {data.map((item, i) => {
                        const heightPercent = (item.scans / maxScans) * 100;
                        const criticalRatio = (item.critical / item.scans) * 100;
                        const isHovered = hoveredIdx === i;

                        return (
                            <div
                                key={item.day}
                                className="relative flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                            >
                                {isHovered && (
                                    <div className="absolute -top-32 bg-bg-soft/95 backdrop-blur-md border border-border text-text p-3 rounded-xl shadow-2xl z-30 min-w-[190px] animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
                                        <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-2">
                                            <span className="text-xs font-semibold text-text">{item.date}</span>
                                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">
                                                {item.topLang}
                                            </span>
                                        </div>

                                        <div className="space-y-1 text-xs">
                                            <div className="flex items-center justify-between text-text-muted">
                                                <span className="flex items-center gap-1.5"><Code2 size={12} /> Scans</span>
                                                <span className="font-semibold text-text">{item.scans}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-text-muted">
                                                <span className="flex items-center gap-1.5"><Bug size={12} className="text-orange-400" /> Bugs</span>
                                                <span className="font-semibold text-text">{item.bugsFound}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-text-muted">
                                                <span className="flex items-center gap-1.5"><ShieldAlert size={12} className="text-red-400" /> Critical</span>
                                                <span className="font-semibold text-red-400">{item.critical}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-text-muted pt-1 border-t border-border/40">
                                                <span className="flex items-center gap-1.5"><Zap size={12} className="text-accent" /> Latency</span>
                                                <span className="font-mono text-[11px] text-accent">{item.latency}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="w-full max-w-[42px] rounded-t-lg relative flex flex-col justify-end overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_-3px_var(--glow)]"
                                    style={{
                                        height: `${heightPercent}%`,
                                        background: isHovered ? 'var(--accent-hover)' : 'var(--accent)',
                                    }}
                                >
                                    <div
                                        className="w-full bg-red-500/80 transition-opacity"
                                        style={{ height: `${Math.min(criticalRatio * 1.5, 30)}%` }}
                                        title={`${item.critical} critical findings`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center justify-between gap-2.5 sm:gap-4 mt-3 pt-2 border-t border-border/40">
                    {data.map((item, i) => (
                        <div key={i} className="flex-1 text-center">
                            <span className={`block text-[11px] font-medium transition ${hoveredIdx === i ? 'text-accent' : 'text-text-muted'}`}>
                                {item.day}
                            </span>
                            <span className="block text-[9px] text-text-muted/60 font-mono -mt-0.5">
                                {item.date.split(' ')[1]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}