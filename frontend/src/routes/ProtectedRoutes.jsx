import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';

export default function ProtectedRoute( {roles} ){
    const { user, loading } = useAuth();

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner full />
            </div>
        );
    }
    if (!user) return <Navigate to="/login" replace />;

    if (roles && !roles.includes(user.role)){
        return <Navigate to="unauthorized" replace />;
    }

    return <Outlet />;

}