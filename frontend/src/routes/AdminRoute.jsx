import ProtectedRoute from './ProtectedRoutes';

export default function AdminRoute() {
    return <ProtectedRoute roles={['admin']} />;
}