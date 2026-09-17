import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="relative min-h-screen bg-bg text-text px-6 py-16">
            <div className="ambient-glow" />
            <div className="relative z-10 max-w-2xl mx-auto">
                <Link to="/" className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition mb-10">
                    <ArrowLeft size={15} /> Back home
                </Link>
                <div className="glass-card rounded-2xl p-8">
                    <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-sm text-text-muted leading-relaxed">
                        Placeholder privacy content.
                    </p>
                </div>
            </div>
        </div>
    );
}