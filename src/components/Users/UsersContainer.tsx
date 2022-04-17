import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsers,
  changeFollowingStatus,
  switchPage
} from '../../redux/reducers/user-reducer';
import Preloader from '../Preloader/Preloader';
import Users from './Users';

const UsersContainer: FC<{}> = () => {
  const usersProps = useSelector((state: any) => ({
    users: state.users,
    isLoading: state.users.isLoading,
    activePageNumber: state.users.activePageNumber,
    totalAmount: state.users.totalAmount,
    followingInProgressUsers: state.users.followingInProgressUsers,
    isAuth: state.authData.isAuth,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getUsers(usersProps.activePageNumber))
  }, []);

  const onChangeFollowStatus = (id: string, followed: boolean) => {
    dispatch(changeFollowingStatus(id, followed))
  };

  const onPageSwitch = (activePageNum: number) => {
    dispatch(switchPage(activePageNum));
  };

  const checkIfFollowingInProgress = (userId: string) =>
    usersProps.followingInProgressUsers.includes(userId);

  return usersProps.isLoading ? (
    <Preloader />
  ) : (
    <Users
      usersProps={usersProps.users}
      onChangeFollowStatus={onChangeFollowStatus}
      onPageSwitch={onPageSwitch}
      checkIfFollowingInProgress={checkIfFollowingInProgress}
      isAuth={usersProps.isAuth}
    />
  );
};

export default UsersContainer;
