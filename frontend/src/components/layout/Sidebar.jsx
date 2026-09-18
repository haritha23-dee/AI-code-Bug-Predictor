import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, History, Sparkles } from 'lucide-react';

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/history', label: 'History', icon: History },
];

export default function Sidebar() {
    return (
        <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-border bg-bg-soft/70 backdrop-blur-xl h-screen sticky top-0 z-10">
            <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center shrink-0">
                    <Sparkles size={15} className="text-white" />
                </div>
                <span className="font-semibold text-text tracking-tight">Brainy</span>
            </div>

            <nav className="flex-1 px-3 py-5 space-y-1.5">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition overflow-hidden ${
                                isActive
                                    ? 'text-accent font-medium'
                                    : 'text-text-muted hover:text-text hover:bg-border/30'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-accent/15 to-transparent pointer-events-none" />
                                )}
                                {isActive && (
                                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-accent shadow-[0_0_10px_var(--glow)]" />
                                )}
                                <Icon size={18} className="relative" />
                                <span className="relative">{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="glass-card rounded-xl p-3 text-xs text-text-muted">
                    Powered by Groq
                    <span className="block text-[10px] mt-0.5 opacity-70">Enterprise inference engine</span>
                </div>
            </div>
        </aside>
    );
}