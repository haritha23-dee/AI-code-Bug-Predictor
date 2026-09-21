import { createContext, useState, useEffect, useContext, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from '../api/auth';
//supabase client
import { supabase } from '../services/supabase';
import { registerUnauthorizedHandler } from "../services/api";

const AuthContext = createContext(null);

//jwt payload verification for scheduking warning: backend/supabase validates the token itself
function getTokenExpiryMs(token) {
    try{
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return payload.exp * 1000;
    } catch {
        return null;
    }
}

export function AuthProvider( {children} ){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const warningTimerRef = useRef(null);  //warning timer reference from react component 'useRef'

    const clearSession = () => {
        localStorage.removeItem('scrs_token');
        localStorage.removeItem('scrs_refresh_token');
        if(warningTimerRef.current) clearTimeout(warningTimerRef.current);  //condition tests the timeout and warning to users
        setUser(null);
    };

    //schedule for expiry warning
    const scheduleExpiryWarning = (access_token) => {
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);

        const expiryMs = getTokenExpiryMs(access_token);
        if(!expiryMs) return;

        // const warnAt = expiryMs - Date.now() - 5 * 60 * 1000;    //5 mins before expiry set thgh millisecs
        const warnAt = 1*60*1000;

        if (warnAt <= 0){
            handleExpiryPrompt();
            return;
        }
        warningTimerRef.current = setTimeout(handleExpiryPrompt, warnAt);
    };

    //expiry prompt to users
    const handleExpiryPrompt = async() => {
        const wantsToContinue = window.confirm(
            'Your session will expire in 1 min. Click OK to CONTINUE your session.. or CANCEL to LOG OUT now..'
        );
        
        //want to continue
        if(!wantsToContinue){
            clearSession();
            navigate('/login', {replace: true});
            return;
        }

        const refreshTokenValue = localStorage.getItem('scrs_refresh_token');

        const { data: supaSession } = await supabase.auth.getSession();
        try{
            if(supaSession?.session?.refresh_token){
                const { data, error } = await supabase.auth.refreshSession();
                    if (error) throw error;
                    localStorage.setItem('scrs_token', data.session.access_token);
                    localStorage.setItem('scrs_refresh_token', data.session.refresh_token);
                    scheduleExpiryWarning(data.session.access_token);
                } else if (refreshTokenValue) {
                    const res = await authApi.refreshToken(refreshTokenValue);
                    localStorage.setItem('scrs_token', res.data.access_token);
                    localStorage.setItem('scrs_refresh_token', res.data.refresh_token);
                    scheduleExpiryWarning(res.data.access_token);
                } else {
                    throw new Error('No refresh token available');
                }
            } catch {
                clearSession();
                navigate('/login', {replace: true});
            }
    };

    //global handler(expired and invalid token land here & forces clean logout + redirect

    useEffect (() => {
        registerUnauthorizedHandler(() => {
            clearSession();
            navigate('/login', { replace: true });
        });
    }, [navigate]);

    useEffect(() =>{
        const token = localStorage.getItem('scrs_token');
        if(!token){
            setLoading(false);
            return;
        }
        authApi
            .getMe()
            .then((res) => {
                setUser(res.data);
                scheduleExpiryWarning(token);
            })
            .catch(() => clearSession())
            .finally(() => setLoading(false));

            //conditional warning timer ref out.
            return () => {
            if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
            };
        }, []);


        const login = async (email, password) => {
            try{
                const res = await authApi.login(email, password);
                const { access_token, refresh_token } = res.data;
                localStorage.setItem('scrs_token', access_token);
                localStorage.setItem('scrs_refresh_token', refresh_token);
                const me = await authApi.getMe();
                setUser(me.data);
                scheduleExpiryWarning(access_token);  //expiry scheduling
                return me.data;
            } catch (err){
                localStorage.removeItem('scrs_token');
                throw new Error(err.response?.data?.detail || 'Login failed');
            }
        };

        const signup = async (email, password, full_name) => {
            try {
                await authApi.signup(email, password, full_name);
            }
            catch (err){
                throw new Error(err.response?.data?.detail || 'Signup failed');
            }
        };

        
        //google auth provider by supabase
        const loginWithGoogle = async() => {
            const {error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw new Error(error.message);
        };

        const logout = () => {
            clearSession();
        };

        // const refreshUser = async () => {
        //     const me = await authApi.getMe();
        //     setUser(me.data);
        //     return me.data;
        // };

        // const updateProfile = async(data) => {
        //     const res = await authApi.updateProfile(data);
        //     setUser(res.data.user || res.data);
        //     return res.data;
        // };

        const value = useMemo(
            () => ({ user, setUser, loading, login, logout, signup, loginWithGoogle,
                scheduleExpiryWarning
             }),
            [user, loading]
        );

        return <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>;
    }

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};


