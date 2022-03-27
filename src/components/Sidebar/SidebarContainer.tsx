import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const SidebarContainer = () => {
  const sidebarProps = useSelector((state: any) => ({
    users: state.users.usersList,
  }));

  return <Sidebar _users={sidebarProps.users} />;
};

export default SidebarContainer;
