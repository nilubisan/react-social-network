import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  SetUsersStatusAC,
  ChangeFollowingStatusAC,
  SwitchUserPageAC,
  ToggleIsLoadingAC,
} from '../../redux/reducers/user-reducer';
import Preloader from '../Preloader/Preloader';
import { API_URL, API_KEY } from '../../helpers/api';
import Users from './Users';

const UsersContainer: FC<{}> = () => {
  const usersProps = useSelector((state: any) => ({
    users: state.users,
    isLoading: state.users.isLoading,
    activePageNumber: state.users.activePageNumber,
    totalAmount: state.users.totalAmount,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const { usersList } = usersProps.users;
    if (usersList.length === 0) {
      dispatch(ToggleIsLoadingAC(true));
      axios
        .get(`${API_URL}/users?page=${usersProps.activePageNumber}`, {
          withCredentials: true,
          headers: {
            'API-KEY': API_KEY,
          },
        })
        .then((response) => {
          dispatch(
            SetUsersStatusAC(response.data.totalCount, response.data.items),
          );
          dispatch(ToggleIsLoadingAC(false));
        });
    }
  }, []);

  const onChangeFollowStatus = (id: string, followed: boolean) => {
    if (followed) {
      axios
        .post(
          `${API_URL}/follow/${id}`,
          {},
          {
            withCredentials: true,
            headers: {
              'API-KEY': API_KEY,
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
            'API-KEY': API_KEY,
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
          'API-KEY': API_KEY,
        },
      })
      .then((response) => {
        dispatch(ToggleIsLoadingAC(false));
        dispatch(SwitchUserPageAC(response.data.items, activePageNum));
      });
  };

  const onPageBack = () => {
    if (+usersProps.activePageNumber > 1) {
      usersProps.activePageNumber -= 1;
      dispatch(ToggleIsLoadingAC(true));
      axios
        .get(`${API_URL}/users?page=${usersProps.activePageNumber}`, {
          withCredentials: true,
          headers: {
            'API-KEY': API_KEY,
          },
        })
        .then((response) => {
          dispatch(ToggleIsLoadingAC(false));
          dispatch(
            SwitchUserPageAC(response.data.items, usersProps.activePageNumber),
          );
        });
    }
  };

  const onPageForward = () => {
    if (
      +usersProps.activePageNumber !== Math.ceil(usersProps.totalAmount / 10)
    ) {
      usersProps.activePageNumber += 1;
      dispatch(ToggleIsLoadingAC(true));
      axios
        .get(`${API_URL}/users?page=${usersProps.activePageNumber}`, {
          withCredentials: true,
          headers: {
            'API-KEY': API_KEY,
          },
        })
        .then((response) => {
          dispatch(ToggleIsLoadingAC(false));
          dispatch(
            SwitchUserPageAC(response.data.items, usersProps.activePageNumber),
          );
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
