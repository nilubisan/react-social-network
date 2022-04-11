import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SetUsersStatusAC,
  ChangeFollowingStatusAC,
  SwitchUserPageAC,
  ToggleIsLoadingAC,
  ToggleFollowInProgressAC
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
    followingInProgressUsers: state.users.followingInProgressUsers
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
    dispatch(ToggleFollowInProgressAC(+id));
    if (followed) {
      apiService.followUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
        dispatch(ToggleFollowInProgressAC(+id));
      });
    } else {
      apiService.unFollowUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
        dispatch(ToggleFollowInProgressAC(+id));
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

  const checkIfFollowingInProgress = (userId: string) => (
    usersProps.followingInProgressUsers.includes(userId)
  );

  return usersProps.isLoading ? (
    <Preloader />
  ) : (
    <Users
      usersProps={usersProps.users}
      onChangeFollowStatus={onChangeFollowStatus}
      onPageSwitch={onPageSwitch}
      checkIfFollowingInProgress={checkIfFollowingInProgress}
    />
  );
};

export default UsersContainer;
