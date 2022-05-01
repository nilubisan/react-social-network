import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Auth from './Login';
import { authMe } from '../../redux/reducers/auth-reducer';

export interface AuthParameters {
  email: string,
  password: string,
  captchaInput: string,
  rememberMe: boolean
};

const AuthContainer: FC<{}> = () => {
  const nav = useNavigate();
  const error = useSelector((state: any) => ({
    isError: state.authData.isError,
    message: state.authData.errorMessage,
    captchaUrl: state.authData.captchaUrl,
  }));
  const dispatch = useDispatch();
  const onSubmitAuthForm = async (authParameters: AuthParameters, setStatus: (_status: string) => void) => {
    await dispatch(authMe(authParameters, setStatus));
    nav('/');
  };
  return <Auth onSubmitAuthForm={onSubmitAuthForm} error={error} />;
};

export default AuthContainer;
