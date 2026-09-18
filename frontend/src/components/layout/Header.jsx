import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const displayName = user?.full_name || user?.email || 'Account';
    const initials = (user?.full_name || user?.email || '?')
        .trim().split(/\s+/).slice(0,2).map((s) => s[0]).join('').toUpperCase();

    return (
        <header className = "h-16 border-b border-border bg-bg-soft/70 backdrop-blur-xl flex items-center justify-between px-6 top-0 z-10">
            <div />

            <div className="flex items-center gap-3">
                <ThemeToggle />

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="flex items-center gap-2.5 h-10 pl-1.5 pr-3 rounded-xl border border-border hover:border-accent/40 hover: bg-border/20 transition"
                    >
                        {user?.avatar_url ? (
                            <img src={user.avatar_url} alt="" className="h-7 w-7 rounded-lg object-cover" />
                        ) : (
                            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-white">{initials}</span>
                            </div>
                        )}
                        <span className="max-w-[140px] truncate text-sm text-text">{displayName}</span>
                        <ChevronDown size={14} className="text-text-muted" />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-2xl py-1.5 text-sm overflow-hidden">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    navigate('/profile');
                                }}
                                className="w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 text-text hover:bg-accent/10 hover:text-accent transition"
                            >
                                <User size={15} />
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 text-red-500 hover:bg-red-500/10 transition"
                            >
                                <LogOut size={15} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
