import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsers,
  changeFollowingStatus,
  switchPage,
  convertDisplayedUsersCategoryToBoolean,
} from '../../redux/reducers/user-reducer';
import Preloader from '../Preloader/Preloader';
import Users from './Users';
import {
  selectUsersList,
  selectActivePageNumber,
  selectTotalAmount,
  selectIsFetchingUsersListInProgress,
  selectFollowingInProgressUsers,
  selectKeyword,
  selectPageSize,
  selectDisplayedUsersCategory,
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
  const pageSize = useSelector(selectPageSize);
  const displayedUsersCategory = useSelector(selectDisplayedUsersCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers({ page: activePageNumber }));
  }, [isAuth]);

  const pageSizeOptions = [10, 15, 20, 30, 40, 50];

  const onChangeFollowStatus = (id: string, followed: boolean) => {
    dispatch(changeFollowingStatus(id, followed));
  };

  const onPageSwitch = (
    activePageNum: number,
    pageSizeValue: number,
    keywordString: string = '',
    usersDisplayingStatusVal = null as string,
  ) => {
    dispatch(
      switchPage({
        page: activePageNum,
        term: keywordString,
        count: pageSizeValue,
        friend: convertDisplayedUsersCategoryToBoolean(
          usersDisplayingStatusVal,
        ),
      }),
    );
  };

  const searchByUsername = (
    username: string,
    displayedUsersCategoryValue: string,
  ) => {
    dispatch(
      getUsers({
        page: 1,
        term: username,
        friend: convertDisplayedUsersCategoryToBoolean(
          displayedUsersCategoryValue,
        ),
      }),
    );
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
      searchByUsername={searchByUsername}
      isAuth={isAuth}
      keyword={keyword}
      pageSize={pageSize}
      displayedUsersCategory={displayedUsersCategory}
      pageSizeOptions={pageSizeOptions}
    />
  );
};

export default UsersContainer;
