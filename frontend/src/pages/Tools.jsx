import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal, Puzzle, Cpu } from 'lucide-react';

const GithubMark = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.06-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.91.1-.71.38-1.2.7-1.47-2.45-.28-5.02-1.23-5.02-5.46 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.41.11-2.94 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.96 0 4.24-2.58 5.17-5.04 5.44.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/>
    </svg>
);

const GitlabMark = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 21.94 15.9 10.1H8.1L12 21.94Z" />
        <path d="M12 21.94 8.1 10.1H1.98l1.36 4.19a.76.76 0 0 0 .27.38L12 21.94Z" opacity=".7" />
        <path d="M3.34 10.1 1.98 14.29a.76.76 0 0 0 .27.85L12 21.94l-8.66-11.84Z" opacity=".45" />
        <path d="M3.34 10.1H8.1L6.07 3.87a.4.4 0 0 0-.76 0L3.34 10.1Z" />
        <path d="M12 21.94 15.9 10.1h4.72l-1.36 4.19a.76.76 0 0 1-.27.38L12 21.94Z" opacity=".7" />
        <path d="M20.66 10.1 22.02 14.29a.76.76 0 0 1-.27.85L12 21.94l8.66-11.84Z" opacity=".45" />
        <path d="M20.66 10.1H15.9l2.03-6.23a.4.4 0 0 1 .76 0l1.97 6.23Z" />
    </svg>
);

const tools = [
    {
        icon: GithubMark,
        name: 'GitHub',
        desc: 'Connect a repository and analyze pull requests automatically on every push.',
    },
    {
        icon: Cpu,
        name: 'Groq AI Engine',
        desc: 'Groq API Powers the analysis pipeline, scoring bugs, complexity and quality in seconds.',
    },
    {
        icon: Puzzle,
        name: 'VS Code Extension',
        desc: 'Run Groq-powered analysis directly in your editor without leaving your workspace.',
    },
    {
        icon: Terminal,
        name: 'CLI',
        desc: 'Trigger analysis from your terminal or CI pipeline with a single command.',
    },
];

export default function Tools() {
    return (
        <div className="relative min-h-screen bg-bg text-text px-6 py-16">
            <div className="ambient-glow" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <Link to="/" className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition mb-10">
                    <ArrowLeft size={15} /> Back home
                </Link>

                <div className="mb-10">
                    <h1 className="font-display text-3xl font-bold mb-2">Tools Integration</h1>
                    <p className="text-text-muted">Connect Brainy to the rest of your development workflow.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    {tools.map(({ icon: Icon, name, desc }) => (
                        <div
                            key={name}
                            className="group relative overflow-hidden glass-card rounded-2xl p-6 hover:border-accent/40 transition hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent-2/0 group-hover:from-accent/10 group-hover:to-accent-2/5 transition pointer-events-none" />
                            <div className="relative flex items-start justify-between mb-4">
                                <div className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shadow-[0_0_0_0_var(--glow)] group-hover:shadow-[0_0_20px_-4px_var(--glow)] transition">
                                    <Icon width={20} height={20} />
                                </div>
                            </div>
                            <h2 className="relative font-semibold text-text mb-1.5">{name}</h2>
                            <p className="relative text-sm text-text-muted leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}