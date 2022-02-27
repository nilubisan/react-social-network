import React, { FC } from 'react';
import Nav from './Nav/Nav';
import FriendsBar from './Friends-bar/Friends-bar';
import { IUser } from '../Dialog/Dialog';
import style from './Sidebar.module.css';

const Sidebar: FC<{ users: IUser[] }> = ({ users }) => (
  <div className={style.sidebar}>
    <Nav />
    <FriendsBar users={users} />
  </div>
);
export default Sidebar;
