import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsers,
  changeFollowingStatus,
  switchPage,
} from '../../redux/reducers/user-reducer';
import Preloader from '../Preloader/Preloader';
import Users from './Users';
import {
  selectUsersList,
  selectActivePageNumber,
  selectTotalAmount,
  selectIsFetchingUsersListInProgress,
  selectFollowingInProgressUsers,
  selectKeyword
} from './UsersSelectors';
import { selectIsAuthStatus } from '../Login/AuthSelectors';

const UsersContainer: FC<{}> = () => {
  const usersList = useSelector(selectUsersList);
  const activePageNumber = useSelector(selectActivePageNumber);
  const totalAmount = useSelector(selectTotalAmount);
  const isLoading = useSelector(selectIsFetchingUsersListInProgress);
  const followingInProgressUsers = useSelector(selectFollowingInProgressUsers);
  const isAuth = useSelector(selectIsAuthStatus);
  const keyword = useSelector(selectKeyword);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({page: activePageNumber}));
  }, [isAuth]);

  const onChangeFollowStatus = (id: string, followed: boolean) => {
    dispatch(changeFollowingStatus(id, followed));
  };

  const onPageSwitch = (activePageNum: number, keywordString: string = '') => {
    dispatch(switchPage({page: activePageNum, term: keywordString}));
  };

  const searchByUsername = (username: string) => {
    dispatch(getUsers({page: 1, term: username}))
  }

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
      searchByUsername={searchByUsername}
      isAuth={isAuth}
      keyword={keyword}
    />
  );
};

export default UsersContainer;
