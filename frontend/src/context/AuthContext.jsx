import { createContext, useState, useEffect, useContext, useMemo } from "react";
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider( {children} ){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() =>{
        const token = localStorage.getItem('scrs_token');
        if(!token){
            setLoading(false);
            return;
        }
        authApi
            .getMe()
            .then((res) => setUser(res.data.user || res.data))
            .catch(() => localStorage.removeItem('scrs_token'))
            .finally(() => setLoading(false));
        }, []);

        const login = async (email, password) => {
            try{
                const res = await authApi.login(email, password);
                const { token, user: loggedInUser } = res.data;
                localStorage.setItem('scrs_token', token);
                setUser(loggedInUser);
                return loggedInUser;
            } catch (err){
                throw new Error(err.response?.data?.message || 'Login failed');
            }
        };

        const logout = () => {
            localStorage.removeItem('scrs_token');
            setUser(null);
        };

        const updateProfile = async(data) => {
            const res = await authApi.updateProfile(data);
            setUser(res.data.user || res.data);
            return res.data;
        };

        const value = useMemo(
            () => ({ user, setUser, loading, login, logout, updateProfile }),
            [user, loading]
        );

        return <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}


