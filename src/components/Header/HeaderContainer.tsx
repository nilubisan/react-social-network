import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logOut } from '../../redux/reducers/auth-reducer';
import { selectIsAuthStatus } from '../Login/AuthSelectors';
import Header from './Header';

const HeaderContainer: FC<{}> = () => {
  const isAuth = useSelector(selectIsAuthStatus);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const unsign = () => {
    dispatch(logOut());
  };

  const isAuthPage = pathname === '/auth';

  return <Header isUserAuth={isAuth} isAuthPage={isAuthPage} unsign={unsign} />;
};

export default HeaderContainer;
