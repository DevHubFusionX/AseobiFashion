import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        // Redirect to login page but save the current location they were trying to access
        return <Navigate to={ROUTES.ADMIN_LOGIN} state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
