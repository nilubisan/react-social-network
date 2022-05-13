import React, { FC } from 'react';
import User, { IUser } from './User/User';
import Pagination from '../Pagination/Pagination';
import style from './Users.module.css';

interface IUsers {
  usersList: IUser[];
  activePageNumber: number;
  totalAmount: number;
  isAuth: boolean;
  onChangeFollowStatus: (_id: string, _followed: boolean) => void;
  onPageSwitch: (_activePageNumber: number) => void;
  onSetProfile: (_id: string) => void;
  checkIfFollowingInProgress: (_userId: string) => boolean;
}
const Users: FC<{
  usersList: IUsers['usersList'];
  activePageNumber: IUsers['activePageNumber'];
  totalAmount: IUsers['totalAmount'];
  onChangeFollowStatus: IUsers['onChangeFollowStatus'];
  onPageSwitch: IUsers['onPageSwitch'];
  checkIfFollowingInProgress: IUsers['checkIfFollowingInProgress'];
  isAuth: IUsers['isAuth'];
}> = ({
  usersList,
  activePageNumber,
  totalAmount,
  onChangeFollowStatus,
  onPageSwitch,
  checkIfFollowingInProgress,
  isAuth,
}) => 
   (
    <>
      <ul className={style['users-list']}>
        {usersList.map((user: IUser) => (
          <li className={style['users-list__item']} key={user.id}>
            <User
              id={user.id}
              name={user.name}
              status={user.status}
              uniqueUrlName={user.uniqueUrlName}
              photos={user.photos}
              followed={user.followed}
              onChangeFollowStatus={onChangeFollowStatus}
              checkIfFollowingInProgress={checkIfFollowingInProgress}
              isAuth={isAuth}
            />
          </li>
        ))}
      </ul>
      <Pagination totalItemsAmount={totalAmount} activePageNumber={activePageNumber} onPageSwitch={onPageSwitch} />
    </>
  )
;
export default Users;
