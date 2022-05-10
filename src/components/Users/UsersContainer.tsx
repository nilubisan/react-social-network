import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsers,
  changeFollowingStatus,
  switchPage,
} from '../../redux/reducers/user-reducer';
import Preloader from '../Preloader/Preloader';
import Users from './Users';
import {selectUsersList, selectActivePageNumber, selectTotalAmount, selectIsFetchingUsersListInProgress, selectFollowingInProgressUsers} from './UsersSelectors';
import {selectIsAuthStatus} from '../Login/AuthSelectors';

const UsersContainer: FC<{}> = () => {
  const usersList = useSelector(selectUsersList);
  const activePageNumber = useSelector(selectActivePageNumber);
  const totalAmount = useSelector(selectTotalAmount);
  const isLoading = useSelector(selectIsFetchingUsersListInProgress);
  const followingInProgressUsers = useSelector(selectFollowingInProgressUsers);
  const isAuth = useSelector(selectIsAuthStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(activePageNumber));
  }, []);

  const onChangeFollowStatus = (id: string, followed: boolean) => {
    dispatch(changeFollowingStatus(id, followed));
  };

  const onPageSwitch = (activePageNum: number) => {
    dispatch(switchPage(activePageNum));
  };

  const checkIfFollowingInProgress = (userId: string) =>
    followingInProgressUsers.includes(userId);

  return isLoading ? (
    <Preloader />
  ) : (
    <Users
      usersList={usersList}
      activePageNumber={activePageNumber}
      totalAmount={totalAmount}
      onChangeFollowStatus={onChangeFollowStatus}
      onPageSwitch={onPageSwitch}
      checkIfFollowingInProgress={checkIfFollowingInProgress}
      isAuth={isAuth}
    />
  );
};

export default UsersContainer;
