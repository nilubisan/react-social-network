import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../helpers/api';
import { SetAuthDataAC } from '../../redux/reducers/auth-reducer';
import Header from './Header';

const HeaderContainer: FC<{}> = () => {
  const HeaderProps = useSelector((state: any) => ({
    login: state.authData.login,
    isAuth: state.authData.isAuth,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (HeaderProps.isAuth) {
      axios
        .get(`${API_URL}/auth/me`, { withCredentials: true })
        .then((response: any) => {
          dispatch(
            SetAuthDataAC({
              id: response.data.data.id,
              email: response.data.data.email,
              login: response.data.data.login,
              isAuth: true,
            }),
          );
        });
    }
  }, []);

  const unsign = () => {
    axios.delete(`${API_URL}/auth/login`).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(
          SetAuthDataAC({
            id: null,
            login: null,
            email: null,
            isAuth: false,
          }),
        );
      }
    });
  };

  return <Header isAuth={HeaderProps.isAuth} unsign={unsign} />;
};

export default HeaderContainer;
