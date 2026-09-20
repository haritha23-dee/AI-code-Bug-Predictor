import { useMemo } from 'react';
import { Users, FolderKanban, FileCode, Activity } from 'lucide-react';
import {
    PieChart, Pie, Cell, RadialBarChart, RadialBar, PolarAngleAxis,
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { getPlatformOverview, getUserBreakdown } from '../../api/admin';
import useAdminData from '../../hooks/useAdminData';
import RefreshBar from '../../components/admin/RefreshBar';
import Spinner from '../../components/ui/Spinner';

const SEVERITY = [
    { key: 'critical_bugs', label: 'Critical', color: '#ef4444' },
    { key: 'high_bugs', label: 'High', color: '#f97316' },
    { key: 'medium_bugs', label: 'Medium', color: '#eab308' },
    { key: 'low_bugs', label: 'Low', color: '#60a5fa' },
];

const tooltipStyle = {
    background: 'rgba(15,15,25,0.95)',
    border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: 12,
    fontSize: 12,
    color: '#e2e8f0',
};

const round1 = (n) => Math.round(Number(n ?? 0) * 10) / 10;

export default function AdminOverview() {
    const overview = useAdminData(getPlatformOverview);
    const users = useAdminData(getUserBreakdown);

    const topUsers = useMemo(
        () =>
            (users.data || [])
                .sort((a, b) => b.analysis_count - a.analysis_count)
                .slice(0, 5)
                .map((u) => ({
                    name: u.full_name || (u.email || '').split('@')[0],
                    analyses: Number(u.analysis_count),
                })),
        [users.data]
    );

    if (overview.loading) return <Spinner full />;
    if (overview.error && !overview.data) {
        return (
            <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                {overview.error}
            </div>
        );
    }

    const d = overview.data || {};
    const severity = SEVERITY.map((s) => ({ ...s, value: Number(d[s.key] ?? 0) }));
    const findings = severity.reduce((n, s) => n + s.value, 0);
    const highRisk = findings ? Math.round(((severity[0].value + severity[1].value) / findings) * 100) : 0;
    const pieData = findings ? severity : [{ label: 'None', value: 1, color: '#334155' }];

    const kpis = [
        { label: 'Total Users', value: d.total_users, icon: Users, tone: 'text-accent' },
        { label: 'Total Projects', value: d.total_projects, icon: FolderKanban, tone: 'text-accent-2' },
        { label: 'Total Files', value: d.total_files, icon: FileCode, tone: 'text-blue-400' },
        { label: 'Total Analyses', value: d.total_analyses, icon: Activity, tone: 'text-green-500' },
    ];

    return (
        <div className="space-y-6">
            <RefreshBar
                eyebrow="Mission Control"
                title="Platform Overview"
                subtitle="Dynamic Live Aggregations"
                updatedAt={overview.updatedAt}
                refreshing={overview.refreshing || users.refreshing}
                onRefresh={() => { overview.refresh(); users.refresh(); }}
            />

            {overview.error && (
                <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {overview.error} — showing last known data.
                </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map(({ label, value, icon: Icon, tone }) => (
                    <div key={label} className="glass-card rounded-2xl p-5 hover:border-accent/40 transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[11px] uppercase tracking-widest text-text-muted mb-1">{label}</p>
                                <p className="text-3xl font-bold">{value ?? '—'}</p>
                            </div>
                            <div className={`h-11 w-11 rounded-xl bg-border/20 border border-border flex items-center justify-center ${tone}`}>
                                <Icon size={19} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Panel title="Bug severity">
                    <div className="relative h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="label"
                                    innerRadius={62}
                                    outerRadius={84}
                                    paddingAngle={findings ? 3 : 0}
                                    stroke="none"
                                >
                                    {pieData.map((s) => <Cell key={s.label} fill={s.color} />)}
                                </Pie>
                                {findings > 0 && <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#e2e8f0' }} />}
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-2xl font-bold">{findings}</p>
                            <p className="text-[10px] uppercase tracking-widest text-text-muted">Findings</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                        {severity.map((s) => (
                            <div key={s.label} className="flex items-center justify-between text-xs rounded-lg border border-border px-2.5 py-1.5">
                                <span className="flex items-center gap-2 text-text-muted">
                                    <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                                    {s.label}
                                </span>
                                <span className="font-semibold">{s.value}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-text-muted mt-3 text-center">{highRisk}% high / critical</p>
                </Panel>

                <Panel title="Average scores">
                    <div className="grid grid-cols-2 gap-2">
                        <ScoreGauge label="Bug score" hint="lower is better" value={d.avg_bug_score} color="#f97316" />
                        <ScoreGauge label="Quality score" hint="higher is better" value={d.avg_quality_score} color="#22c55e" />
                    </div>
                </Panel>

                <Panel title="Top users by analyses">
                    {topUsers.length ? (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topUsers} layout="vertical" margin={{ left: 0, right: 12 }}>
                                    <XAxis type="number" allowDecimals={false} hide />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={90}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip cursor={{ fill: 'rgba(148,163,184,0.08)' }} contentStyle={tooltipStyle} itemStyle={{ color: '#e2e8f0' }} />
                                    <Bar dataKey="analyses" fill="#8b5cf6" radius={[0, 8, 8, 0]} barSize={16} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-sm text-text-muted py-16 text-center">No user activity yet.</p>
                    )}
                </Panel>
            </div>
        </div>
    );
}

function Panel({ title, children }) {
    return (
        <div className="glass-card rounded-2xl p-5">
            <p className="text-[11px] uppercase tracking-widest text-text-muted mb-4">{title}</p>
            {children}
        </div>
    );
}

function ScoreGauge({ label, hint, value, color }) {
    const v = Number(value ?? 0);
    return (
        <div className="text-center">
            <div className="relative h-36">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ v }]} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar dataKey="v" cornerRadius={10} fill={color} background={{ fill: 'rgba(148,163,184,0.15)' }} />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-2xl font-bold">{value == null ? '—' : round1(v)}</p>
                </div>
            </div>
            <p className="text-sm font-medium mt-1">{label}</p>
            <p className="text-[10px] uppercase tracking-widest text-text-muted">{hint}</p>
        </div>
    );
}