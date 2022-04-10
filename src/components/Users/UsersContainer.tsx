import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SetUsersStatusAC,
  ChangeFollowingStatusAC,
  SwitchUserPageAC,
  ToggleIsLoadingAC,
} from '../../redux/reducers/user-reducer';
import Preloader from '../Preloader/Preloader';
import { apiService } from '../../helpers/api';
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
      apiService
        .getUsers(usersProps.activePageNumber, false)
        .then(({ totalCount, users }) => {
          dispatch(SetUsersStatusAC(totalCount, users));
          dispatch(ToggleIsLoadingAC(false));
        });
    }
  }, []);

  const onChangeFollowStatus = (id: string, followed: boolean) => {
    if (followed) {
      apiService.followUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
      });
    } else {
      apiService.unFollowUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
      });
    }
  };

  const onPageSwitch = (activePageNum: number) => {
    if (
      activePageNum >= 1 &&
      activePageNum <= Math.ceil(usersProps.totalAmount / 10)
    ) {
      dispatch(ToggleIsLoadingAC(true));
      apiService.getUsers(activePageNum, true).then(({ users }) => {
        dispatch(ToggleIsLoadingAC(false));
        dispatch(SwitchUserPageAC(users, activePageNum));
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
    />
  );
};

export default UsersContainer;
