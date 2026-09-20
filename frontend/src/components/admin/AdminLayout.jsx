import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, User, Users, Sparkles } from 'lucide-react';
import Header from '../layout/Header';

const NAV = [
    { to: '/admin/overview', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/profile', label: 'Profile', icon: User },
    { to: '/admin/users', label: 'Platform Users', icon: Users },
];

export default function AdminLayout() {
    return (
        <div className="relative flex min-h-screen bg-bg text-text overflow-hidden">
            <div className="ambient-glow opacity-60" />

            <aside className="relative z-[1] hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-bg-soft/40 backdrop-blur">
                <div className="flex items-center gap-3 h-20 px-6 border-b border-border">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center shadow-[0_0_24px_-6px_var(--glow)]">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <span className="font-display text-xl font-semibold tracking-tight">Brainy</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {NAV.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                                    isActive
                                        ? 'bg-accent/10 text-accent before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:rounded-full before:bg-accent'
                                        : 'text-text-muted hover:text-text hover:bg-border/30'
                                }`
                            }
                        >
                            <Icon size={18} /> {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-6 border-t border-border">
                    <p className="text-sm text-text-muted">Powered by Groq</p>
                    <p className="text-xs text-text-muted/70 mt-0.5">Enterprise inference engine</p>
                </div>
            </aside>

            <div className="relative flex-1 flex flex-col min-w-0 z-[1]">
                <Header />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}