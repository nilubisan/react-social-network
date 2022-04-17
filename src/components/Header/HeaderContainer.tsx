import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthData, logOut } from '../../redux/reducers/auth-reducer';
import Header from './Header';

const HeaderContainer: FC<{}> = () => {
  const HeaderProps = useSelector((state: any) => ({
    login: state.authData.login,
    isAuth: state.authData.isAuth,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthData());
  }, []);

  const unsign = () => {
    dispatch(logOut());
  };

  return <Header isAuth={HeaderProps.isAuth} unsign={unsign} />;
};

export default HeaderContainer;
