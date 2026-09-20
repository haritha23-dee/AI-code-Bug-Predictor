import { useMemo, useState } from 'react';
import { Search, ArrowUpDown, FolderKanban, FileCode, Activity } from 'lucide-react';
import { getUserBreakdown } from '../../api/admin';
import useAdminData from '../../hooks/useAdminData';
import RefreshBar from '../../components/admin/RefreshBar';
import Spinner from '../../components/ui/Spinner';

const COLUMNS = [
    { key: 'full_name', label: 'User' },
    { key: 'joined_at', label: 'Joined' },
    { key: 'project_count', label: 'Projects', icon: FolderKanban },
    { key: 'file_count', label: 'Files', icon: FileCode },
    { key: 'analysis_count', label: 'Analyses', icon: Activity },
    { key: 'avg_quality_score', label: 'Avg Quality' },
];

const qualityTone = (q) =>
    q == null
        ? 'text-text-muted bg-border/20 border-border'
        : q >= 70
        ? 'text-green-500 bg-green-500/10 border-green-500/30'
        : q >= 50
        ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
        : 'text-red-500 bg-red-500/10 border-red-500/30';

export default function AdminUsers() {
    const { data, error, loading, refreshing, updatedAt, refresh } = useAdminData(getUserBreakdown);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState({ key: 'analysis_count', dir: 'desc' });

    const all = data || [];
    const active = all.filter((u) => u.analysis_count > 0).length;
    const maxAnalyses = Math.max(1, ...all.map((u) => Number(u.analysis_count)));

    const rows = useMemo(() => {
        const q = query.trim().toLowerCase();
        const val = (u) =>
            sort.key === 'joined_at'
                ? new Date(u.joined_at || 0).getTime()
                : sort.key === 'full_name'
                ? (u.full_name || u.email || '').toLowerCase()
                : Number(u[sort.key] ?? -1);
        return (data || [])
            .filter((u) => !q || `${u.full_name ?? ''} ${u.email ?? ''}`.toLowerCase().includes(q))
            .sort((a, b) => {
                const x = val(a), y = val(b);
                return (x > y ? 1 : x < y ? -1 : 0) * (sort.dir === 'asc' ? 1 : -1);
            });
    }, [data, query, sort]);

    const toggleSort = (key) =>
        setSort((s) =>
            s.key === key
                ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
                : { key, dir: key === 'full_name' ? 'asc' : 'desc' }
        );

    if (loading) return <Spinner full />;

    return (
        <div className="space-y-6">
            <RefreshBar
                eyebrow="User Breakdown"
                title="Platform Users"
                subtitle={`${all.length} registered users`}
                updatedAt={updatedAt}
                refreshing={refreshing}
                onRefresh={refresh}
            />

            {error && (
                <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Registered', value: all.length },
                    { label: 'Active', value: active },
                    { label: 'Idle (no analyses)', value: all.length - active },
                ].map((s) => (
                    <div key={s.label} className="glass-card rounded-2xl p-4">
                        <p className="text-[11px] uppercase tracking-widest text-text-muted mb-1">{s.label}</p>
                        <p className="text-2xl font-bold">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="relative max-w-sm">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name or email"
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                />
            </div>

            {rows.length === 0 ? (
                <div className="glass-card rounded-2xl p-14 text-center text-text-muted">
                    {all.length ? 'No users match your search.' : 'No users found.'}
                </div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-text-muted text-xs uppercase tracking-widest">
                                    {COLUMNS.map(({ key, label, icon: Icon }) => (
                                        <th key={key} className="px-5 py-3.5 font-medium">
                                            <button
                                                onClick={() => toggleSort(key)}
                                                className={`inline-flex items-center gap-1.5 uppercase tracking-widest hover:text-text transition ${sort.key === key ? 'text-accent' : ''}`}
                                            >
                                                {Icon && <Icon size={12} />}
                                                {label}
                                                <ArrowUpDown size={11} />
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {rows.map((u) => (
                                    <tr key={u.user_id} className="hover:bg-accent/5 transition">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 shrink-0 rounded-xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center text-sm font-bold">
                                                    {(u.full_name || u.email || '?')[0].toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium truncate max-w-[200px]">{u.full_name || '—'}</p>
                                                    <p className="text-xs text-text-muted truncate max-w-[200px]">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-text-muted whitespace-nowrap">
                                            {u.joined_at ? new Date(u.joined_at).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-5 py-3.5 font-medium">{u.project_count}</td>
                                        <td className="px-5 py-3.5 font-medium">{u.file_count}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3 min-w-[110px]">
                                                <span className="font-medium w-6">{u.analysis_count}</span>
                                                <div className="h-1.5 flex-1 rounded-full bg-border/40 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                                                        style={{ width: `${(Number(u.analysis_count) / maxAnalyses) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${qualityTone(u.avg_quality_score)}`}>
                                                {u.avg_quality_score ?? '—'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5 py-3 border-t border-border text-xs text-text-muted">
                        Showing {rows.length} of {all.length}
                    </div>
                </div>
            )}
        </div>
    );
}