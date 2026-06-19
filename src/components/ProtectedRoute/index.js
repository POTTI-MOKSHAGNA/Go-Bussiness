import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from '../Login';

function ProtectedRoute({ children }) {
    const jwtToken = Cookies.get('jwt_token');
    if(!jwtToken){
        return <Navigate to = '/login' replace />
    }
    return children
}