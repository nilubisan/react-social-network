import React from 'react';
import style from './Nav.module.css';

const Nav = () => (
  <nav className={style.nav}>
    <ul className={style.nav__list}>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          Profile
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          News
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          Messages
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          Friends
        </button>
      </li>
      <li className={style.nav__item}>
        <button className={style.nav__link} type="button">
          Settings
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
