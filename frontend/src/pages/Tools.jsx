import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Terminal, Webhook } from 'lucide-react';

const tools = [
    { icon: Github, name: 'GitHub', desc: 'Coming soon - sync repos directly into your projects.' },
    { icon: Terminal, name: 'CLI', desc: 'Coming soon - run analysis from your terminal.' },
    { icon: Webhook, name: 'Webhooks', desc: 'Coming soon - trigger analysis on push.' },
];

export default function Tools() {
    return (
        <div className="relative min-h-screen bg-bg text-text px-6 py-16">
            <div className="ambient-glow" />
            <div className="relative z-10 max-w-3xl mx-auto">
                <Link to="/" className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition mb-10">
                    <ArrowLeft size={15} /> Back home
                </Link>
                <h1 className="text-3xl font-bold mb-2">Tools Integration</h1>
                <p className="text-text-muted mb-10">Connect Brainy to the rest of your stack.</p>
                <div className="grid sm:grid-cols-3 gap-4">
                    {tools.map(({ icon: Icon, name, desc }) => (
                        <div key={name} className="glass-card rounded-2xl p-6">
                            <Icon size={20} className="text-accent mb-3" />
                            <h2 className="font-semibold text-text mb-1">{name}</h2>
                            <p className="text-sm text-text-muted">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}