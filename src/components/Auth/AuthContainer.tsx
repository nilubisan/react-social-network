import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';
import { authMe } from '../../redux/reducers/auth-reducer';

const AuthContainer: FC<{}> = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const onSubmitAuthForm = async () => {
    await dispatch(authMe());
    nav('/');
  };
  return <Auth onSubmitAuthForm={onSubmitAuthForm} />;
};

export default AuthContainer;
