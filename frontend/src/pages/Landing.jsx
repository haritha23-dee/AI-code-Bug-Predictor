import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Code2, AlertTriangle, Gauge, Mail, Menu, X } from 'lucide-react';
import ThemeToggle from '../components/layout/ThemeToggle';

const GithubIcon = (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.06-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.91.1-.71.38-1.2.7-1.47-2.45-.28-5.02-1.23-5.02-5.46 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.41.11-2.94 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.96 0 4.24-2.58 5.17-5.04 5.44.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
);

const LinkedinIcon = (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
    </svg>
);

const DiscordIcon = (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.45.87-.61 1.26a18.3 18.3 0 0 0-5.48 0 12.6 12.6 0 0 0-.62-1.26.08.08 0 0 0-.08-.04c-1.7.29-3.34.8-4.89 1.52a.07.07 0 0 0-.03.03C1.08 8.68.37 12.86.7 16.98a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13c.13-.09.25-.19.37-.28a.07.07 0 0 1 .08 0c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08 0c.12.1.24.19.37.28a.08.08 0 0 1 0 .13c-.6.35-1.22.65-1.87.89a.08.08 0 0 0-.04.11c.36.7.78 1.37 1.23 2a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.4-4.76-.67-8.9-2.83-12.58a.06.06 0 0 0-.03-.03ZM8.68 14.6c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.17 1.1 2.15 2.42 0 1.34-.95 2.42-2.15 2.42Zm6.65 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.17 1.1 2.15 2.42 0 1.34-.94 2.42-2.15 2.42Z" />
    </svg>
);

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const LINKEDIN_URL = 'https://linkedin.com/in/haritha-sampath';
const DISCORD_URL = 'https://discord.gg/H9tzPNmQf';
const GITHUB_URL = 'https://github.com/haritha23-dee/AI-code-Bug-Predictor/';
const CONTACT_EMAIL = 'octoberfairyy@gmail.com';

export default function Landing() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div className="relative min-h-screen overflow-hidden bg-bg text-text">
            <div className="ambient-glow" />

            <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 h-20">
                <div className="flex items-center gap-2">
                    <img src="/brainy-logo.webp" alt="Brainy Logo" className="h-8 w-8 object-contain" />
                    <span className="font-display text-lg font-semibold tracking-tight">Brainy</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection('features')} className="text-sm text-text-muted hover:text-text transition">Features</button>
                    <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-text-muted hover:text-text transition">How it works</button>
                    <Link to="/tools" className="text-sm text-text-muted hover:text-text transition">Tools</Link>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link to="/login" className="text-sm font-medium border border-border px-4 py-2 rounded-full hover:bg-border/30 transition">
                        Login
                    </Link>
                    <Link to="/signup" className="text-sm font-medium bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-full transition shadow-[0_0_20px_-6px_var(--glow)]">
                        Get Started
                    </Link>
                </div>

                <div className="md:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-text-muted hover:text-text transition">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-bg/95 backdrop-blur-xl border-b border-border z-40 md:hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col px-6 py-6 gap-6">
                        <button onClick={() => { scrollToSection('features'); setIsMobileMenuOpen(false); }} className="text-left text-sm font-medium text-text">Features</button>
                        <button onClick={() => { scrollToSection('how-it-works'); setIsMobileMenuOpen(false); }} className="text-left text-sm font-medium text-text">How it works</button>
                        <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-sm font-medium text-text">Tools Integration</Link>
                        
                        <div className="h-px w-full bg-border" />
                        
                        <div className="flex flex-col gap-3">
                            <Link to="/login" className="flex justify-center items-center h-11 rounded-xl border border-border font-medium text-sm">Login</Link>
                            <Link to="/signup" className="flex justify-center items-center h-11 rounded-xl bg-accent text-white font-medium text-sm">Get Started</Link>
                        </div>
                    </div>
                </div>
            )}

            <section className="relative z-10 px-6 md:px-12 pt-14 pb-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
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

                    <p className="mt-6 max-w-lg text-text-muted text-base md:text-lg leading-relaxed">
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

            <section className="relative z-10 px-6 md:px-12 pb-8 max-w-6xl mx-auto">
                <div className="glass-card rounded-2xl px-6 py-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                    <StatBlock icon={Zap} label="Groq Inference" value="Sub-second" />
                    <StatBlock icon={Code2} label="Languages Supported" value="9" />
                    <StatBlock icon={ShieldCheck} label="Severity Tiers" value="4" />
                </div>
            </section>

            <section id="features" className="relative z-10 px-6 md:px-12 pt-16 pb-24 max-w-6xl mx-auto scroll-mt-24">
                <div className="text-center mb-14">
                    <p className="text-xs uppercase tracking-widest text-accent font-medium mb-3">Why Brainy</p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold">Everything you need to ship clean code</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FeatureCard icon={Zap} title="Groq-Powered Analysis" desc="Near-instant inference to scan your codebase for bugs, complexity, and quality risk." />
                    <FeatureCard icon={ShieldCheck} title="Severity-Ranked Findings" desc="Every issue flagged by line, message, and severity — critical to low, nothing buried." />
                    <FeatureCard icon={Code2} title="AI Rewrites, Side-by-Side" desc="Compare your original source against suggested fixes in a real IDE-style workspace." />
                </div>
            </section>

            <section id="how-it-works" className="relative z-10 px-6 md:px-12 pb-28 max-w-4xl mx-auto scroll-mt-24">
                <div className="text-center mb-14">
                    <p className="text-xs uppercase tracking-widest text-accent font-medium mb-3">The Process</p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold">How it works</h2>
                </div>
                <div className="space-y-4">
                    {[
                        { title: 'Upload or paste your code', desc: 'Create a project, then upload a file or paste code directly — pick your language.' },
                        { title: 'Groq analyzes it', desc: 'Bug severity, complexity, and quality scored in seconds, line by line.' },
                        { title: 'Ship the fix', desc: 'Compare original vs. suggested code side-by-side and download the rewrite.' },
                    ].map((s, i) => (
                        <div key={s.title} className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:border-accent/30 transition">
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

            <section className="relative z-10 px-6 md:px-12 pb-24 max-w-4xl mx-auto text-center">
                <div className="glass-card rounded-3xl p-10 md:p-14">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Ready to ship cleaner code?</h2>
                    <p className="text-text-muted mb-8 max-w-md mx-auto">Create your first project and get a Groq-powered analysis in seconds.</p>
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-7 py-3.5 rounded-xl text-sm font-medium transition shadow-[0_0_32px_-6px_var(--glow)]"
                    >
                        Get Started Free
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <footer className="relative z-10 border-t border-border">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <img src="/brainy-logo.webp" alt="Brainy Logo" className="h-7 w-7 object-contain" />
                            <span className="font-display font-semibold text-text">Brainy</span>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            Groq-powered code analysis, bug scoring, and AI rewrites in one workspace.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-widest text-text-muted mb-4">Platform</p>
                        <ul className="space-y-2.5 text-sm">
                            <li><button onClick={() => scrollToSection('features')} className="text-text-muted hover:text-text transition">Features</button></li>
                            <li><button onClick={() => scrollToSection('how-it-works')} className="text-text-muted hover:text-text transition">How it works</button></li>
                            <li><Link to="/tools" className="text-text-muted hover:text-text transition">Tools Integration</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-widest text-text-muted mb-4">Legal</p>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/terms" className="text-text-muted hover:text-text transition">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="text-text-muted hover:text-text transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-widest text-text-muted mb-4">Community</p>
                        <div className="flex items-center gap-3">
                            <SocialIcon href={GITHUB_URL} label="GitHub" icon={GithubIcon} />
                            <SocialIcon href={LINKEDIN_URL} label="LinkedIn" icon={LinkedinIcon} />
                            <SocialIcon href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`} label="Email" icon={Mail} external={true} />
                            <SocialIcon href={DISCORD_URL} label="Discord" icon={DiscordIcon} />
                        </div>
                    </div>
                </div>

                <div className="border-t border-border py-6 px-6 md:px-12">
                    <p className="text-xs text-text-muted text-center">© {new Date().getFullYear()} Brainy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function SocialIcon({ href, label, icon: Icon, external = true }) {
    return (
        <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition shadow-[0_0_0_0_var(--glow)] hover:shadow-[0_0_16px_-4px_var(--glow)]"
        >
            <Icon size={16} />
        </a>
    );
}

function StatBlock({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-3 py-3 sm:py-0 sm:px-6 first:sm:pl-0 last:sm:pr-0">
            <div className="h-9 w-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-accent" />
            </div>
            <div>
                <p className="font-semibold text-text text-sm">{value}</p>
                <p className="text-xs text-text-muted">{label}</p>
            </div>
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