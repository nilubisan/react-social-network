import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthStatus } from '../components/Login/AuthSelectors';

const AuthRedirect = (WrappedComponent: FC<{ props: any }>) => (props: any) => {
  const isAuth = useSelector(selectIsAuthStatus);
  if (isAuth) return <WrappedComponent {...props} />;
  return <Navigate to="/auth" />;
};

export default AuthRedirect;
