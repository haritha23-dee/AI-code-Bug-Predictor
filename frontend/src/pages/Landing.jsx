import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Code2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import ThemeToggle from '../components/layout/ThemeToggle';

const features = [
    {
        icon: Zap,
        title: 'Groq-Powered Analysis',
        desc: 'Near-instant inference to scan your codebase for bugs, complexity, and quality risk.',
    },
    {
        icon: ShieldCheck,
        title: 'Severity-Ranked Findings',
        desc: 'Every issue flagged by line, message, and severity — critical to low, nothing buried.',
    },
    {
        icon: Code2,
        title: 'AI Rewrites, Side-by-Side',
        desc: 'Compare your original source against suggested fixes in a real IDE-style workspace.',
    },
];

export default function Landing() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-bg text-text">
            <div className="ambient-glow" />

            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20">
                <span className="text-lg font-semibold tracking-tight">Brainy</span>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        to="/login"
                        className="text-sm text-text-muted hover:text-text transition px-3 py-2"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/signup"
                        className="flex items-center gap-1.5 text-sm font-medium bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-xl transition shadow-[0_0_24px_-6px_var(--glow)]"
                    >
                        Get Started
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </nav>

            <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28">
                <div className="glass-card inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-text-muted mb-8">
                    <Sparkles size={13} className="text-accent" />
                    Powered by Groq — enterprise-grade inference
                </div>

                {/* font changes */}
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1]">    Your AI Assistant,
                    <br />
                    <span className="text-gradient">Built to Work Smarter</span>
                </h1>

                <p className="mt-6 max-w-xl text-text-muted text-base md:text-lg">
                    Upload your source. Let Groq-powered analysis catch bugs, score complexity,
                    and rewrite broken logic — before it ever reaches production.
                </p>

                <div className="mt-10 flex items-center gap-4">
                    <Link
                        to="/signup"
                        className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl text-sm font-medium transition shadow-[0_0_32px_-6px_var(--glow)]"
                    >
                        Start Analyzing
                        <ArrowRight size={16} />
                    </Link>
                    <Link
                        to="/how-it-works"
                        className="px-6 py-3 rounded-xl text-sm font-medium border border-border text-text hover:bg-border/30 transition"
                    >
                        How it works
                    </Link>
                </div>

                <div className="relative mt-20 w-full max-w-3xl">
                    <div className="absolute -inset-6 bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent blur-3xl rounded-3xl" />
                    <div className="glass-card relative rounded-2xl p-1.5 shadow-2xl">
                        <div className="rounded-xl bg-bg-soft border border-border overflow-hidden">
                            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                                <span className="ml-3 text-xs text-text-muted">analysis_result.json</span>
                            </div>
                            <pre className="text-left text-xs md:text-sm p-5 font-mono text-text-muted overflow-x-auto">
{`{
  "bug_severity": "high",
  "bug_score": 7.8,
  "complexity_score": 4.2,
  "quality_score": 6.1,
  "suggested_fix": "Null-check gutters before append..."
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 px-6 md:px-12 pb-28 max-w-6xl mx-auto">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div
                        key={title}
                        className="glass-card rounded-2xl p-6 hover:border-accent/40 transition hover:-translate-y-1"
                    >
                        <div className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                            <Icon size={20} className="text-accent" />
                        </div>
                        <h3 className="font-semibold text-text mb-2">{title}</h3>
                        <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
                    </div>
                ))}
            </section>

            <footer className="relative z-10 border-t border-border">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-text">Brainy</span>
                        <span className="text-xs text-text-muted">© {new Date().getFullYear()}</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-text-muted">
                        <Link to="/how-it-works" className="hover:text-text transition">How it works</Link>
                        <Link to="/tools" className="hover:text-text transition">Tools Integration</Link>
                        <Link to="/terms" className="hover:text-text transition">Terms & Conditions</Link>
                        <Link to="/privacy" className="hover:text-text transition">Privacy Policy</Link>
                    </div>

                    <div className="flex items-center gap-3 text-text-muted">
                        <a 
                            href = "https://github.com/haritha23-dee/AI-code-Bug-Predictor/"
                            target = "_blank"
                            rel="noopener noreferrer"
                            aria-label="Github Repository"
                        >
                            <FaGithub size = {18} className="hover:text-text transition cursor-pointer" />
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}