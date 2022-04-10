import React, { FC } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChangeFollowingStatusAC,
  SwitchUserPageAC,
  ToggleIsLoadingAC,
} from '../../redux/reducers/user-reducer';
import Preloader from '../Preloader/Preloader';
import { API_URL } from '../../helpers/api';
import Users from './Users';

const UsersContainer: FC<{}> = () => {
  const usersProps = useSelector((state: any) => ({
    users: state.users,
    isLoading: state.users.isLoading,
  }));

  let activePageNumber = useSelector(
    (state: any) => state.users.activePageNumber,
  );
  const totalAmount = useSelector((state: any) => state.users.totalAmount);
  const dispatch = useDispatch();

  const onChangeFollowStatus = (id: string, followed: boolean) => {
    if (followed) {
      axios
        .post(
          `${API_URL}/follow/${id}`,
          {},
          {
            withCredentials: true,
            headers: {
              'API-KEY': 'd551ca8e-0007-4cc8-8fb1-dffb040d97e3',
            },
          },
        )
        .then((response) => {
          if (response.data.resultCode === 0) {
            dispatch(ChangeFollowingStatusAC(id, followed));
          }
        });
    } else {
      axios
        .delete(`${API_URL}/follow/${id}`, {
          withCredentials: true,
          headers: {
            'API-KEY': 'd551ca8e-0007-4cc8-8fb1-dffb040d97e3',
          },
        })
        .then((response) => {
          if (response.data.resultCode === 0) {
            dispatch(ChangeFollowingStatusAC(id, followed));
          }
        });
    }
  };

  const onPageSwitch = (activePageNum: number) => {
    dispatch(ToggleIsLoadingAC(true));
    axios
      .get(`${API_URL}/users?page=${activePageNum}`, {
        withCredentials: true,
        headers: {
          'API-KEY': 'd551ca8e-0007-4cc8-8fb1-dffb040d97e3',
        },
      })
      .then((response) => {
        dispatch(ToggleIsLoadingAC(false));
        dispatch(SwitchUserPageAC(response.data.items, activePageNum));
      });
  };

  const onPageBack = () => {
    if (+activePageNumber > 1) {
      activePageNumber -= 1;
      dispatch(ToggleIsLoadingAC(true));
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${activePageNumber}`,
          {
            withCredentials: true,
            headers: {
              'API-KEY': 'd551ca8e-0007-4cc8-8fb1-dffb040d97e3',
            },
          },
        )
        .then((response) => {
          dispatch(ToggleIsLoadingAC(false));
          dispatch(SwitchUserPageAC(response.data.items, activePageNumber));
        });
    }
  };

  const onPageForward = () => {
    if (+activePageNumber !== Math.ceil(totalAmount / 10)) {
      activePageNumber += 1;
      dispatch(ToggleIsLoadingAC(true));
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${activePageNumber}`,
          {
            withCredentials: true,
            headers: {
              'API-KEY': 'd551ca8e-0007-4cc8-8fb1-dffb040d97e3',
            },
          },
        )
        .then((response) => {
          dispatch(ToggleIsLoadingAC(false));
          dispatch(SwitchUserPageAC(response.data.items, activePageNumber));
        });
    }
  };

  return usersProps.isLoading ? (
    <Preloader />
  ) : (
    <Users
      usersProps={usersProps.users}
      onChangeFollowStatus={onChangeFollowStatus}
      onPageSwitch={onPageSwitch}
      onPageForward={onPageForward}
      onPageBack={onPageBack}
    />
  );
};

export default UsersContainer;
