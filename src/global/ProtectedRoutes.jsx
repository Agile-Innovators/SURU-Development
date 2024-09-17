import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoutes = ({ children }) => {
  const { getAuthToken } = useAuth();
  const authToken = getAuthToken();

  if (authToken === null) {
    console.log("ProtectedRoute - Not logged user. Redirecting to login page. Token " + authToken);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;