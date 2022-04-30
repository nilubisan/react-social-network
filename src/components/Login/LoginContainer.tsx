import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Auth from './Login';
import { authMe } from '../../redux/reducers/auth-reducer';

const AuthContainer: FC<{}> = () => {
  const nav = useNavigate();
  const error = useSelector((state: any) => ({
    isError: state.authData.isError,
    message: state.authData.errorMessage,
    captchaUrl: state.authData.captchaUrl,
  }));
  const dispatch = useDispatch();
  const onSubmitAuthForm = async (
    email: string,
    password: string,
    captchaInput: string,
    rememberMe: boolean = false,
  ) => {
    await dispatch(authMe(email, password, captchaInput, rememberMe));
    nav('/');
  };
  return <Auth onSubmitAuthForm={onSubmitAuthForm} error={error} />;
};

export default AuthContainer;
