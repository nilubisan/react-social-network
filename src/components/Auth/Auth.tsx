import React, { FC } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../../helpers/api';
import { SetAuthDataAC } from '../../redux/reducers/auth-reducer';

const Auth: FC<{}> = () => {
  const dispatch = useDispatch();
  const authMe = () => {
    axios
      .post(`${API_URL}/auth/login`, {
        email: 'r.nas9329@gmail.com',
        password: 'Ss76109133',
      })
      .then((response) => {
        if (response.data.resultCode === 0)
          dispatch(
            SetAuthDataAC({
              id: response.data.data.userId,
              login: null,
              email: null,
              isAuth: true,
            }),
          );
        else
          dispatch(
            SetAuthDataAC({
              id: null,
              login: null,
              email: null,
              isAuth: false,
            }),
          );
      });
  };
  return (
    <div>
      <Link to="/" onClick={authMe} type="button">
        AUTH ME
      </Link>
    </div>
  );
};

export default Auth;
