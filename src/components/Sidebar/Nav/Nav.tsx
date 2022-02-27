import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';

const Nav = () => (
  <nav className={style.nav}>
    <ul className={style.nav__list}>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${style.nav__link} ${isActive ? style.activated : ''}`
            }
          >
            Profile
          </NavLink>
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `${style.nav__link} ${isActive ? style.activated : ''}`
            }
          >
            News
          </NavLink>
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `${style.nav__link} ${isActive ? style.activated : ''}`
            }
          >
            Messages
          </NavLink>
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              `${style.nav__link} ${isActive ? style.activated : ''}`
            }
          >
            Friends
          </NavLink>
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${style.nav__link} ${isActive ? style.activated : ''}`
            }
          >
            Settings
          </NavLink>
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
