import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Code2, AlertTriangle, Gauge } from 'lucide-react';
import ThemeToggle from '../components/layout/ThemeToggle';

const GithubIcon = (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.06-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.91.1-.71.38-1.2.7-1.47-2.45-.28-5.02-1.23-5.02-5.46 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.41.11-2.94 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.96 0 4.24-2.58 5.17-5.04 5.44.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
);

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Landing() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-bg text-text">
            <div className="ambient-glow" />

            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center">
                        <Sparkles size={15} className="text-white" />
                    </div>
                    <span className="font-display text-lg font-semibold tracking-tight">Brainy</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection('features')} className="text-sm text-text-muted hover:text-text transition">Features</button>
                    <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-text-muted hover:text-text transition">How it works</button>
                    <Link to="/tools" className="text-sm text-text-muted hover:text-text transition">Tools</Link>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link to="/login" className="text-sm font-medium border border-border px-4 py-2 rounded-full hover:bg-border/30 transition">
                        Login
                    </Link>
                    <Link to="/signup" className="text-sm font-medium bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-full transition shadow-[0_0_20px_-6px_var(--glow)]">
                        Get Started
                    </Link>
                </div>
            </nav>

            <section className="relative z-10 px-6 md:px-12 pt-10 pb-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="glass-card inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-text-muted mb-8">
                        <Sparkles size={13} className="text-accent" />
                        New: Groq inference just landed
                        <ArrowRight size={12} />
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
                        Comprehensive
                        <br />
                        Bug Detection and
                        <br />
                        <span className="text-gradient">Code Analysis</span>
                    </h1>

                    <p className="mt-6 max-w-lg text-text-muted text-base md:text-lg">
                        A dashboard for in-depth analysis and quality control of every file you ship.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/signup"
                            className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3.5 rounded-xl text-sm font-medium transition shadow-[0_0_32px_-6px_var(--glow)]"
                        >
                            Get Started
                            <ArrowRight size={16} />
                        </Link>
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="px-6 py-3.5 rounded-xl text-sm font-medium border border-border text-text hover:bg-border/30 transition"
                        >
                            How it works
                        </button>
                    </div>

                    <div className="mt-16 pt-8 border-t border-border">
                        <p className="text-text-muted text-sm mb-6">
                            Where messy code is scanned, scored, and rewritten.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <StatBlock icon={Zap} label="Groq Inference" value="Sub-second" />
                            <StatBlock icon={Code2} label="Languages" value="9 Supported" />
                            <StatBlock icon={ShieldCheck} label="Severity Levels" value="4 Tiers" />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-10 bg-gradient-to-br from-accent/25 via-accent-2/15 to-transparent blur-3xl rounded-full" />

                    <div className="relative glass-card rounded-2xl p-5 mb-4 max-w-sm ml-auto shadow-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                                <ShieldCheck size={15} className="text-accent" />
                            </div>
                            <span className="font-medium text-sm">Severity-Ranked Findings</span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed">
                            Every issue flagged by line, message, and severity — critical to low.
                        </p>
                    </div>

                    <div className="relative glass-card rounded-2xl p-5 mb-4 max-w-xs shadow-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-accent-2/15 border border-accent-2/30 flex items-center justify-center">
                                <AlertTriangle size={15} className="text-accent-2" />
                            </div>
                            <span className="font-medium text-sm">Bug Score Tracking</span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed">
                            Track complexity and quality over time, file by file.
                        </p>
                    </div>

                    <div className="relative bg-gradient-to-br from-accent to-accent-2 rounded-2xl p-5 max-w-sm ml-auto shadow-2xl">
                        <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                            <Gauge size={15} className="text-white" />
                        </div>
                        <p className="font-semibold text-white text-sm mb-1">Live Analysis Dashboard</p>
                        <p className="text-xs text-white/80 leading-relaxed">
                            Our IDE-style workspace gives accurate, timely feedback on every commit.
                        </p>
                    </div>
                </div>
            </section>

            <section id="features" className="relative z-10 px-6 md:px-12 pb-24 max-w-6xl mx-auto scroll-mt-24">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Everything you need to ship clean code</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FeatureCard icon={Zap} title="Groq-Powered Analysis" desc="Near-instant inference to scan your codebase for bugs, complexity, and quality risk." />
                    <FeatureCard icon={ShieldCheck} title="Severity-Ranked Findings" desc="Every issue flagged by line, message, and severity — critical to low, nothing buried." />
                    <FeatureCard icon={Code2} title="AI Rewrites, Side-by-Side" desc="Compare your original source against suggested fixes in a real IDE-style workspace." />
                </div>
            </section>

            <section id="how-it-works" className="relative z-10 px-6 md:px-12 pb-24 max-w-4xl mx-auto scroll-mt-24">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">How it works</h2>
                <div className="space-y-4">
                    {[
                        { title: 'Upload or paste your code', desc: 'Create a project, then upload a file or paste code directly — pick your language.' },
                        { title: 'Groq analyzes it', desc: 'Bug severity, complexity, and quality scored in seconds, line by line.' },
                        { title: 'Ship the fix', desc: 'Compare original vs. suggested code side-by-side and download the rewrite.' },
                    ].map((s, i) => (
                        <div key={s.title} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                            <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 text-accent text-sm font-bold">
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="font-semibold text-text mb-1">{s.title}</h3>
                                <p className="text-sm text-text-muted">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="relative z-10 border-t border-border">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-text">Brainy</span>
                        <span className="text-xs text-text-muted">© {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-text-muted">
                        <Link to="/tools" className="hover:text-text transition">Tools</Link>
                        <Link to="/terms" className="hover:text-text transition">Terms</Link>
                        <Link to="/privacy" className="hover:text-text transition">Privacy</Link>
                        <a 
                                                
                            href="https://github.com/haritha23-dee/AI-code-Bug-Predictor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Repository"
                            className="text-text-muted hover:text-text transition"
                        >
                            <GithubIcon />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function StatBlock({ icon: Icon, label, value }) {
    return (
        <div>
            <Icon size={16} className="text-accent mb-2" />
            <p className="font-semibold text-text text-sm">{value}</p>
            <p className="text-xs text-text-muted">{label}</p>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }) {
    return (
        <div className="glass-card rounded-2xl p-6 hover:border-accent/40 transition hover:-translate-y-1">
            <div className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                <Icon size={20} className="text-accent" />
            </div>
            <h3 className="font-semibold text-text mb-2">{title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
        </div>
    );
}