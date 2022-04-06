import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './User.module.css';

const defaultAvatarUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU';
export interface IUser {
  id: string;
  name: string;
  uniqueUrlName: string;
  status: string;
  photos: {
    small: string;
    large: string;
  };
  followed: boolean;
}

const User: FC<{
  id: IUser['id'];
  name: IUser['name'];
  status: IUser['status'];
  uniqueUrlName: IUser['uniqueUrlName'];
  photos: IUser['photos'];
  followed: IUser['followed'];
  onChangeFollowStatus: (_userID: string) => void;
}> = ({
  id,
  name,
  status,
  uniqueUrlName,
  photos,
  followed,
  onChangeFollowStatus,
}) => (
  <div className={style.user__wrapper} id={uniqueUrlName}>
    <div className={style.user__info}>
      <img
        src={photos.small ? photos.small : defaultAvatarUrl}
        className={style.user__avatar}
        alt=""
      />
      <div>
        <Link to={`/profile/${id}`}>
          <p className={style.user__name}>{name}</p>
        </Link>
        <p className={style.user__about}>{status}</p>
      </div>
    </div>
    <button
      type="button"
      className={`${style.user__button} ${
        followed ? style.unfollow : style.follow
      }`}
      onClick={() => onChangeFollowStatus(id)}
    >
      {followed ? 'Unfollow' : 'Follow'}
    </button>
  </div>
);

export default User;
