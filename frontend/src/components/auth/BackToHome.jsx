import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackToHome() {
    return (
        <Link
            to="/"
            className="absolute top-6 left-6 z-20 flex items-center gap-2 h-10 px-4 rounded-xl border border-border bg-bg-soft/60 backdrop-blur text-sm text-text-muted hover:text-text hover:border-accent/40 hover:shadow-[0_0_24px_-6px_var(--glow)] transition"
        >
            <ArrowLeft size={15} />
            Back to Home
        </Link>
    );
}