import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/redux';
import Auth from './Login';
import { authMe } from '../../redux/reducers/auth-reducer';

export interface AuthParameters {
  email: string;
  password: string;
  captchaInput: string;
  rememberMe: boolean;
}

const AuthContainer = () => {
  const nav = useNavigate();
  const error = useSelector((state: RootState) => ({
    isAuth: state.authData.isAuth,
    isError: state.authData.isError,
    message: state.authData.errorMessage,
    captchaUrl: state.authData.captchaUrl,
  }));
  const dispatch = useDispatch();
  const onSubmitAuthForm = async (
    authParameters: AuthParameters,
    setStatus: (_status: { message: string }) => void,
  ) => {
    const res = (await dispatch(authMe(authParameters, setStatus))) as unknown;
    if (typeof res === 'number') nav('/');
  };
  return <Auth onSubmitAuthForm={onSubmitAuthForm} error={error} />;
};

export default AuthContainer;
