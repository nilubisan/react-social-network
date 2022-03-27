import React, { FC } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActionChangeFollowingStatusCreator,
  SwitchUserPageAC,
} from '../../redux/reducers/user-reducer';
import Users from './Users';

const UsersContainer: FC<{}> = () => {
  const usersProps = useSelector((state: any) => ({
    users: state.users,
  }));

  let activePageNumber = useSelector(
    (state: any) => state.users.activePageNumber,
  );
  const totalAmount = useSelector((state: any) => state.users.totalAmount);
  const dispatch = useDispatch();
  const onChangeFollowStatus = (userID: string) => {
    dispatch(ActionChangeFollowingStatusCreator(userID));
  };

  const onPageSwitch = (activePageNum: number) => {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${activePageNum}`,
      )
      .then((response) => {
        dispatch(SwitchUserPageAC(response.data.items, activePageNum));
      });
  };

  const onPageBack = () => {
    if (+activePageNumber > 1) {
      activePageNumber -= 1;
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${activePageNumber}`,
        )
        .then((response) => {
          dispatch(SwitchUserPageAC(response.data.items, activePageNumber));
        });
    }
  };

  const onPageForward = () => {
    if (+activePageNumber !== Math.ceil(totalAmount / 10)) {
      activePageNumber += 1;
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${activePageNumber}`,
        )
        .then((response) => {
          dispatch(SwitchUserPageAC(response.data.items, activePageNumber));
        });
    }
  };

  return (
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
