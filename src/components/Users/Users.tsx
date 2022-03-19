import React, { FC } from 'react';
import User, { IUser } from './User/User';
import style from './Users.module.css';

interface IUsers {
  usersList: IUser[];
  onChangeFollowStatus: (_userID: string) => void;
}
const Users: FC<{
  usersList: IUsers['usersList'];
  onChangeFollowStatus: IUsers['onChangeFollowStatus'];
}> = ({ usersList, onChangeFollowStatus }) => (
  <ul className={style['users-list']}>
    {usersList.map((user: IUser) => (
      <li className={style['users-list__item']} key={user.id}>
        <User
          id={user.id}
          name={user.name}
          about={user.about}
          avatar={user.avatarUrl}
          isFollowed={user.isFollowed}
          onChangeFollowStatus={onChangeFollowStatus}
        />
      </li>
    ))}
  </ul>
);
export default Users;
