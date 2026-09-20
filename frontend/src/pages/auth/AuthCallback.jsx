import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import * as authApi from '../../api/auth';
import Spinner from '../../components/ui/Spinner';

export default function AuthCallback() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        const finishLogin = async () => {
            const { data, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !data.session) {
                setError('Google sign-in failed. Please try again.');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            const { access_token } = data.session;
            localStorage.setItem('scrs_token', access_token);

            try {
                const me = await authApi.getMe();
                setUser(me.data);
                navigate('/dashboard');
            } catch (err) {
                localStorage.removeItem('scrs_token');
                setError('Signed in with Google, but your profile could not be loaded.');
                setTimeout(() => navigate('/login'), 2500);
            }
        };

        finishLogin();
    }, [navigate, setUser]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg text-text px-6">
                <p className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {error}
                </p>
            </div>
        );
    }

    return <Spinner full />;
}