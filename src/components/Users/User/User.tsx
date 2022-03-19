import React, { FC } from 'react';
import style from './User.module.css';

export interface IUser {
  id: string;
  name: string;
  about: string;
  avatarUrl: string;
  isFollowed: boolean;
  onChangeFollowStatus: (_userID: string) => void;
}

const User: FC<{
  id: IUser['id'];
  name: IUser['name'];
  about: IUser['about'];
  avatar: IUser['avatarUrl'];
  isFollowed: IUser['isFollowed'];
  onChangeFollowStatus: IUser['onChangeFollowStatus'];
}> = ({ id, name, about, avatar, isFollowed, onChangeFollowStatus }) => (
  <div className={style.user__wrapper}>
    <div className={style.user__info}>
      <img src={avatar} className={style.user__avatar} alt="" />
      <div>
        <p className={style.user__name}>{name}</p>
        <p className={style.user__about}>{about}</p>
      </div>
    </div>
    <button
      type="button"
      className={`${style.user__button} ${
        isFollowed ? style.unfollow : style.follow
      }`}
      onClick={() => onChangeFollowStatus(id)}
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </button>
  </div>
);

export default User;
