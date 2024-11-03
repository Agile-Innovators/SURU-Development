import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ROUTE_PATHS } from '../routes';

const ProtectedRoutes = () => {
    const { getAuthToken } = useAuth();
    const authToken = getAuthToken();

    if (!authToken) {
        console.log(
            'ProtectedRoute - Not logged user. Redirecting to login page.'
        );
        return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
