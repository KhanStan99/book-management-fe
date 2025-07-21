// src/components/PublicRoute.tsx

import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();

  if (user.user && location.pathname === '/login') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
