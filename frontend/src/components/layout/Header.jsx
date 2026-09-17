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

    return (
        <header className="h-16 border-b border-border bg-bg-soft flex items-center justify-between px-6 sticky top-0 z-10">
            <div />

            <div className="flex items-center gap-3">
                <ThemeToggle />

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="flex items-center gap-2 h-9 px-3 rounded-xl border border-border hover:bg-border/30 transition text-sm text-text"
                    >
                        <User size={16} />
                        <span className="max-w-[140px] truncate">{displayName}</span>
                        <ChevronDown size={14} className="text-text-muted" />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-44 glass-card rounded-xl shadow-lg py-1 text-sm">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    navigate('/profile');
                                }}
                                className="w-full text-left px-3 py-2 flex items-center gap-2 text-text hover:bg-border/30"
                            >
                                <User size={15} />
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-500 hover:bg-border/30"
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
