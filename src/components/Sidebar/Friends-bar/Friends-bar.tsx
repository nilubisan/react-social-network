import React, { FC } from 'react';
import { IUser } from '../../Dialog/Dialog';
import shuffleArray from '../../../helpers/shuffleArray';
import style from './Friends-bar.module.css';
import { FRIENDS_AMOUNT_IN_BAR } from '../../../helpers/constants';

const FriendsBar: FC<{ users: IUser[] }> = ({ users }) => {
  if (users.length === 0) return <div />;
  let usersList = [];
  const Users = shuffleArray([...users]);
  if (Users.length >= FRIENDS_AMOUNT_IN_BAR)
    usersList = Users.splice(0, FRIENDS_AMOUNT_IN_BAR);
  else usersList = Users;
  return (
    <div className={style.users}>
      <h3 className={style.users__header}>Friends</h3>
      <div className={style.users__wrapper}>
        {usersList.map((user) => (
          <div className={style.user} key={user.id}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU"
              alt=""
              className={style.user__avatar}
            />
            <span className={style.user__name}>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsBar;
