import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Code2, Upload, Wand2, Download } from 'lucide-react';
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

//smooth landing style
const steps = [
    {
        icon: Upload,
        title: 'Upload or paste your code', 
        desc: 'Create a project, then upload a file or paste code directly — pick your language.',
    },
    { 
        icon: Wand2, title: 'Groq analyzes it', 
        desc: 'Bug severity, complexity, and quality scored in seconds, line by line.' 
    },
    { 
        icon: Download, 
        title: 'Ship the fix', 
        desc: 'Compare original vs. suggested code side-by-side and download the rewrite.' 
    },

];

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Landing() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-bg text-text">
            <div className="ambient-glow" />

            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 h-20">
                <span className="font-display text-lg font-semibold tracking-tight">Brainy</span>

                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => scrollToSection('how-it-works')}
                        className="text-sm text-text-muted hover:text-text transition"
                    >
                        How it works
                    </button>
                    <button
                        onClick={() => scrollToSection('features')}
                        className="text-sm text-text-muted hover:text-text transition"
                    >
                        Features
                    </button>
                    <Link to="/tools" className="text-sm text-text-muted hover:text-text transition">
                        Tools Integration
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link to="/login" className="text-sm text-text-muted hover:text-text transition px-3 py-2">
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

            <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24">
                <div className="glass-card inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-text-muted mb-8">
                    <Sparkles size={13} className="text-accent" />
                    Powered by Groq — enterprise-grade inference
                </div>

                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1]">
                    Your AI Assistant,
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
                    <button
                        onClick={() => scrollToSection('how-it-works')}
                        className="px-6 py-3 rounded-xl text-sm font-medium border border-border text-text hover:bg-border/30 transition"
                    >
                        How it works
                    </button>
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

            {/* How it works */}
            <section id="how-it-works" className="relative z-10 px-6 md:px-12 pb-24 max-w-4xl mx-auto scroll-mt-24">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">How it works</h2>
                <div className="space-y-4">
                    {steps.map(({ icon: Icon, title, desc }, i) => (
                        <div key={title} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                                <Icon size={18} className="text-accent" />
                            </div>
                            <div>
                                <p className="text-xs text-accent font-semibold mb-1">STEP {i + 1}</p>
                                <h3 className="font-semibold text-text mb-1">{title}</h3>
                                <p className="text-sm text-text-muted">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="relative z-10 px-6 md:px-12 pb-24 max-w-6xl mx-auto scroll-mt-24">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Features</h2> 
                <div className="gird grid-cols-1 md:grid-cols-3 gap-5"/>
                {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="glass-card rounded-2xl p-6 hover:border-accent/40 transition hover:-translate-y-1">
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
                        <span className="font-display font-semibold text-text">Brainy</span>
                        <span className="text-xs text-text-muted">© {new Date().getFullYear()}</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-text-muted">
                        <button onClick={() => scrollToSection('how-it-works')} className="hover:text-text transition">
                            How it works
                        </button>
                        <Link to="/tools" className="hover:text-text transition">Tools Integration</Link>
                        <Link to="/terms" className="hover:text-text transition">Terms & Conditions</Link>
                        <Link to="/privacy" className="hover:text-text transition">Privacy Policy</Link>
                    </div>

                    <div className="flex items-center gap-3 text-text-muted">
                        <a
                            href="https://github.com/haritha23-dee/AI-code-Bug-Predictor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Repository"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="hover:text-text transition cursor-pointer">
                                <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.06-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.91.1-.71.38-1.2.7-1.47-2.45-.28-5.02-1.23-5.02-5.46 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.41.11-2.94 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.96 0 4.24-2.58 5.17-5.04 5.44.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}