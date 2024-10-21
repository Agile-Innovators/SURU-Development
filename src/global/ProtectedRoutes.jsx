import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ROUTE_PATHS } from '../routes';
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ children }) => {
    const { getAuthToken } = useAuth();
    const authToken = getAuthToken();

    if (authToken === null) {
        console.log(
            'ProtectedRoute - Not logged user. Redirecting to login page. Token '
        );
        return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
    }

    return children;
};

ProtectedRoutes.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoutes;
