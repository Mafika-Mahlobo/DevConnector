import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../layouts/Spinner';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    if (loading) return (<Spinner />);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; 
};

export default PrivateRoute;
