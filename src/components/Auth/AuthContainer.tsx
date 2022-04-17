import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import Auth from './Auth';
import { authMe } from '../../redux/reducers/auth-reducer';

const AuthContainer: FC<{}> = () => {
  const dispatch = useDispatch();
  const onSubmitAuthForm = () => {
    dispatch(authMe());
  };
  return <Auth onSubmitAuthForm={onSubmitAuthForm} />;
};

export default AuthContainer;
