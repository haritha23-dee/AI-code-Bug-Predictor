import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, Mail, ArrowRight } from 'lucide-react';
import { adminLogin } from '../../api/admin';
import { useAuth } from '../../context/AuthContext';
import * as authApi from '../../api/auth';
import BackToHome from '../../components/auth/BackToHome';

export default function AdminLoginPage() {
    const { setUser, scheduleExpiryWarning } = useAuth();
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
            const res = await adminLogin(email, password);
            //refresh token
            localStorage.setItem('scrs_token', res.data.access_token);
            localStorage.setItem('scrs_refresh_token', res.data.refresh_token);
            scheduleExpiryWarning(res.data.access_token);

            const me = await authApi.getMe();
            setUser(me.data);
            navigate('/admin/overview');
        } catch (err) {
            localStorage.removeItem('scrs_token');
            setError(err.response?.data?.detail || 'Admin login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-bg text-text px-6">
            <div className="ambient-glow" />
            <BackToHome />
            <div className="relative z-10 w-full max-w-md">
                <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-5 shadow-[0_0_30px_-6px_rgba(239,68,68,0.5)]">
                            <ShieldAlert size={24} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Access</h1>
                        <p className="text-sm text-text-muted mt-1.5">Restricted — authorized personnel only.</p>
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2 mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="email"
                                required
                                autoCapitalize="none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                placeholder="Admin email"
                                className="w-full h-12 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-red-500/60 transition"
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
                                className="w-full h-12 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text focus:outline-none focus:ring-2 focus:ring-red-500/60 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition disabled:opacity-60 shadow-[0_0_28px_-6px_rgba(239,68,68,0.5)] mt-1"
                        >
                            {loading ? 'Verifying...' : 'Sign In as Admin'}
                            {!loading && <ArrowRight size={15} className="inline ml-1.5 -mt-0.5" />}
                        </button>
                    </form>

                    <p className="text-center text-xs text-text-muted mt-6">
                        Not an admin?{' '}
                        <Link to="/login" className="text-accent hover:text-accent-hover font-medium">
                            Go to regular login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}