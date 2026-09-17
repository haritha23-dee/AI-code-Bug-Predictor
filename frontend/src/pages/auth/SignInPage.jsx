import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignInPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-bg text-text px-6">
            <div className="ambient-glow" />

            <div className="relative z-10 w-full max-w-md">
                <Link to="/" className="block text-center text-lg font-semibold mb-8 tracking-tight">
                    Brainy
                </Link>

                <div className="glass-card rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-1 text-accent">
                        <Sparkles size={16} />
                        <span className="text-xs uppercase tracking-widest">Welcome back</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-6">Log in to your account</h1>

                    {error && (
                        <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2 mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                            />
                        </div>

                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="password"
                                required
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
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowRight size={15} />}
                        </button>
                    </form>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-accent hover:text-accent-hover font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}