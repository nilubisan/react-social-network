import React from 'react';
import Nav from './Nav/Nav';
import style from './Sidebar.module.css';

const Sidebar = () => (
  <div className={style.sidebar}>
    <Nav />
  </div>
);
export default Sidebar;
