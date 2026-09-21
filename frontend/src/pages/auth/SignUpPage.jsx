import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BackToHome from '../../components/auth/BackToHome';

export default function SignUpPage() {
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-bg text-text px-6">
            <div className="ambient-glow" />
            <BackToHome />   a
            <div className="relative z-10 w-full max-w-md">
                <Link to="/" className="block text-center text-lg font-semibold mb-8 tracking-tight">
                    Brainy
                </Link>

                <div className="glass-card rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-1 text-accent">
                        <Sparkles size={16} />
                        <span className="text-xs uppercase tracking-widest">Get started</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-6">Create your account</h1>

                    {error && (
                        <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2 mb-4">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={async() =>{
                            try {await loginWithGoogle();}
                            catch (err) { setError(err.message || 'Google sign-up failed'); }
                        }
                        }
                        className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-soft hover:bg-border/30 text-sm font-medium text-text transition mb-5"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09a5.99 5.99 0 010-3.18V8.07H2.18a10.98 10.98 0 000 9.86l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.98l3.66 2.84c.87-2.6 3.3-4.44 6.16-4.44z" />
                        </svg>
                        Sign up with Google
                    </button>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-text-muted">or</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full name"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                            />
                        </div>

                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="email"
                                required
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                placeholder="Email address"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                            />
                        </div>

                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="password"
                                required
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition disabled:opacity-60 shadow-[0_0_24px_-6px_var(--glow)]"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                            {!loading && <ArrowRight size={15} />}
                        </button>
                    </form>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent hover:text-accent-hover font-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}