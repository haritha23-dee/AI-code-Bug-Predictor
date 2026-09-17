import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, History } from 'lucide-react';

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/history', label: 'History', icon: History },
];

export default function Sidebar() {
    return (
        <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-r border-border bg-bg-soft h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-border">
                <span className="font-semibold text-text tracking-tight">Brainy</span>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                                isActive
                                    ? 'bg-accent/10 text-accent font-medium'
                                    : 'text-text-muted hover:bg-border/30 hover:text-text'
                            }`
                        }
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}