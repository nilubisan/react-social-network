import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRedirect = (WrappedComponent: FC<{ props: any }>) => (props: any) => {
  const authData = useSelector((state: any) => ({
    isAuth: state.authData.isAuth,
  }));
  if (authData.isAuth) return <WrappedComponent {...props} />;
  return <Navigate to="/auth" />;
};

export default AuthRedirect;
