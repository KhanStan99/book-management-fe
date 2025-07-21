// src/components/PrivateRoute.tsx

import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();

  if (!user.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
