import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignInPage() {
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const justSignedUp = location.state?.justSignedUp;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
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
        <div className="relative min-h-screen flex items-center justify-center bg-bg text-text px-6 overflow-hidden">
            <div className="ambient-glow" />

            <div className="relative z-10 w-full max-w-md">
                <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center mb-5 shadow-[0_0_30px_-6px_var(--glow)]">
                            <Sparkles size={24} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">
                            Welcome <span className="text-text-muted font-normal">back</span>
                        </h1>
                        <p className="text-sm text-text-muted mt-1.5">Log in to keep debugging with Brainy.</p>
                    </div>

                    {justSignedUp && (
                        <div className="flex items-center gap-2 text-sm text-green-500 border border-green-500/30 bg-green-500/10 rounded-xl px-4 py-2 mb-4">
                            <CheckCircle2 size={16} />
                            Account created — log in to continue.
                        </div>
                    )}
                    {error && (
                        <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2 mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <input
                            type="email"
                            required
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck="false"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            placeholder="Enter your email"
                            className="w-full h-12 px-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full h-12 px-4 pr-11 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between pt-0.5">
                            <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-3.5 w-3.5 rounded accent-accent"
                                />
                                Remember for 30 days
                            </label>
                            <Link to="/forgot-password" className="text-xs text-accent hover:text-accent-hover font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition disabled:opacity-60 shadow-[0_0_28px_-6px_var(--glow)] mt-1"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-[10px] uppercase tracking-widest text-text-muted">or sign in with</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={async () => {
                                try { await loginWithGoogle(); }
                                catch (err) { setError(err.message || 'Google sign-in failed'); }
                            }}
                            className="h-12 flex items-center justify-center rounded-xl border border-border bg-bg-soft hover:bg-border/30 transition"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09a5.99 5.99 0 010-3.18V8.07H2.18a10.98 10.98 0 000 9.86l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.98l3.66 2.84c.87-2.6 3.3-4.44 6.16-4.44z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            disabled
                            title="GitHub sign-in coming soon"
                            className="h-12 flex items-center justify-center rounded-xl border border-border bg-bg-soft opacity-40 cursor-not-allowed"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-text">
                                <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.06-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.91.1-.71.38-1.2.7-1.47-2.45-.28-5.02-1.23-5.02-5.46 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.41.11-2.94 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.96 0 4.24-2.58 5.17-5.04 5.44.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/>
                            </svg>
                        </button>
                    </div>

                    <p className="text-center text-sm text-text-muted mt-7">
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