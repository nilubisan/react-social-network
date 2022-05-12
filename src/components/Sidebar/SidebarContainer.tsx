import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { selectUsersList } from '../Users/UsersSelectors';

const SidebarContainer = () => {
  const usersList = useSelector(selectUsersList);

  return <Sidebar _users={usersList} />;
};

export default SidebarContainer;
