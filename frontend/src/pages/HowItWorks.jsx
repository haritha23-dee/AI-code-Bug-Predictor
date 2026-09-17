import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Sparkles, Download } from 'lucide-react';

const steps = [
    { icon: Upload, title: 'Upload your code', desc: 'Create a project and drop in any source file.' },
    { icon: Sparkles, title: 'Groq analyzes it', desc: 'Bug severity, complexity, and quality scored in seconds.' },
    { icon: Download, title: 'Ship the fix', desc: 'Compare original vs. suggested code and download the rewrite.' },
];

export default function HowItWorks() {
    return (
        <div className="relative min-h-screen bg-bg text-text px-6 py-16">
            <div className="ambient-glow" />
            <div className="relative z-10 max-w-3xl mx-auto">
                <Link to="/" className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition mb-10">
                    <ArrowLeft size={15} /> Back home
                </Link>
                <h1 className="text-3xl font-bold mb-10">How it works</h1>
                <div className="space-y-4">
                    {steps.map(({ icon: Icon, title, desc }, i) => (
                        <div key={title} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                                <Icon size={18} className="text-accent" />
                            </div>
                            <div>
                                <p className="text-xs text-accent font-semibold mb-1">STEP {i + 1}</p>
                                <h2 className="font-semibold text-text mb-1">{title}</h2>
                                <p className="text-sm text-text-muted">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}