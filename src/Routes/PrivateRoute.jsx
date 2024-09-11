import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CircularProgress } from '@mui/material';
import RadialProgress from '../components/RadialProgress/RadialProgress';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [loading, user, navigate, location]);

    if (loading) {
        // return <progress className="progress w-56"></progress>;
        return <RadialProgress></RadialProgress>
    }
// 

    if (user) {
        return children;
    }

    // Optionally, you could return a fallback UI here, but `useEffect` will handle the redirection
    return null;
};

export default PrivateRoute;
