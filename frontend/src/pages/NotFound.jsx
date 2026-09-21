import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import ThemeToggle from '../components/layout/ThemeToggle';

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-bg text-text px-6 overflow-hidden">
            <div className="ambient-glow" />
            
            <div className="absolute top-6 right-6 z-20">
                <ThemeToggle />
            </div>

            <div className="relative z-10 w-full max-w-md text-center">
                <div className="glass-card rounded-3xl p-10 shadow-2xl flex flex-col items-center">
                    <div className="h-20 w-20 rounded-3xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-6 shadow-[0_0_30px_-6px_var(--glow)]">
                        <AlertCircle size={40} className="text-accent" />
                    </div>
                    <h1 className="font-display text-7xl font-bold tracking-tight mb-2 text-gradient">404</h1>
                    <h2 className="text-xl font-semibold mb-3">Page not found</h2>
                    <p className="text-sm text-text-muted mb-8 leading-relaxed">
                        The file or directory you are looking for has been moved, deleted, or does not exist in this workspace.
                    </p>
                    <Link
                        to="/"
                        className="h-12 w-full flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition shadow-[0_0_28px_-6px_var(--glow)]"
                    >
                        <Home size={18} />
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}