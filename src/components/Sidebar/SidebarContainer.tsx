import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const SidebarContainer = () => {
  const sidebarProps = useSelector((state: any) => ({
    users: state.common.users,
  }));

  return <Sidebar users={sidebarProps.users} />;
};

export default SidebarContainer;
