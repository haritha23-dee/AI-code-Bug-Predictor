import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../services/supabase';
import BackToHome from '../../components/auth/BackToHome';

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [step, setStep] = useState('request'); // 'request' | 'verify' | 'done'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        setLoading(false);
        if (error) {
            setError(error.message);
            return;
        }
        setStep('verify');
    };

    const handleVerifyAndReset = async (e) => {
        e.preventDefault();
        setError('');

        if (otp.trim().length < 6) {
            setError('Enter the 6-digit code from your email');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        const { error: verifyError } = await supabase.auth.verifyOtp({
            email,
            token: otp.trim(),
            type: 'recovery',
        });

        if (verifyError) {
            setLoading(false);
            setError(verifyError.message || 'Invalid or expired code');
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({ password });
        setLoading(false);

        if (updateError) {
            setError(updateError.message);
            return;
        }

        setStep('done');
        setTimeout(() => navigate('/login'), 2000);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-bg text-text px-6">
            <div className="ambient-glow" />
            <BackToHome/>
            <div className="relative z-10 w-full max-w-md">
                <div className="glass-card rounded-3xl p-8 shadow-2xl">
                    {error && (
                        <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2 mb-4">
                            {error}
                        </div>
                    )}

                    {step === 'request' && (
                        <>
                            <div className="flex items-center gap-2 mb-1 text-accent">
                                <KeyRound size={16} />
                                <span className="text-xs uppercase tracking-widest">Reset access</span>
                            </div>
                            <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
                            <p className="text-sm text-text-muted mb-6">
                                Enter your email — we'll send a 6-digit code.
                            </p>

                            <form onSubmit={handleRequestOtp} className="space-y-4">
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type="email"
                                        required
                                        autoCapitalize="none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                        placeholder="Email address"
                                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition disabled:opacity-60 shadow-[0_0_28px_-6px_var(--glow)]"
                                >
                                    {loading ? 'Sending...' : 'Send Code'}
                                </button>
                            </form>
                        </>
                    )}

                    {step === 'verify' && (
                        <>
                            <div className="flex items-center gap-2 mb-1 text-accent">
                                <KeyRound size={16} />
                                <span className="text-xs uppercase tracking-widest">Enter code</span>
                            </div>
                            <h1 className="text-2xl font-bold mb-2">Check your email</h1>
                            <p className="text-sm text-text-muted mb-6">
                                Enter the 6-digit code sent to <span className="text-text font-medium">{email}</span>, then set a new password.
                            </p>

                            <form onSubmit={handleVerifyAndReset} className="space-y-3.5">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    placeholder="6-digit code"
                                    className="w-full h-12 px-4 rounded-xl bg-bg border border-border text-sm text-text text-center tracking-[0.5em] font-semibold focus:outline-none focus:ring-2 focus:ring-accent transition"
                                />

                                <div className="relative">
                                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="New password"
                                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                                    />
                                </div>

                                <div className="relative">
                                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type="password"
                                        required
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition disabled:opacity-60 shadow-[0_0_28px_-6px_var(--glow)]"
                                >
                                    {loading ? 'Verifying...' : 'Verify & Update Password'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => { setStep('request'); setOtp(''); setError(''); }}
                                    className="w-full text-xs text-text-muted hover:text-text transition"
                                >
                                    Use a different email
                                </button>
                            </form>
                        </>
                    )}

                    {step === 'done' && (
                        <div className="text-center py-4">
                            <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                                <CheckCircle2 size={26} className="text-green-500" />
                            </div>
                            <h1 className="text-xl font-bold mb-2">Password updated</h1>
                            <p className="text-sm text-text-muted">Redirecting to login...</p>
                        </div>
                    )}

                    {step !== 'done' && (
                        <p className="text-center text-sm text-text-muted mt-6">
                            <Link to="/login" className="flex items-center justify-center gap-1.5 text-accent hover:text-accent-hover font-medium">
                                <ArrowLeft size={13} /> Back to login
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}