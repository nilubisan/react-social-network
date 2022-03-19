import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionChangeFollowingStatusCreator } from '../../redux/reducers/user-reducer';
import Users from './Users';

const UsersContainer: FC<{}> = () => {
  const usersProps = useSelector((state: any) => ({
    users: state.common.users,
  }));

  const dispatch = useDispatch();
  const onChangeFollowStatus = (userID: string) => {
    dispatch(ActionChangeFollowingStatusCreator(userID));
  };

  return (
    <Users
      usersList={usersProps.users}
      onChangeFollowStatus={onChangeFollowStatus}
    />
  );
};

export default UsersContainer;
