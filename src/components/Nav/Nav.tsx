import React from 'react';
import './Nav.css';

const Nav = () => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <button className="nav__link" type="button">
          Profile
        </button>
      </li>
      <li className="nav__item">
        <button className="nav__link" type="button">
          News
        </button>
      </li>
      <li className="nav__item">
        <button className="nav__link" type="button">
          Messages
        </button>
      </li>
      <li className="nav__item">
        <button className="nav__link" type="button">
          Friends
        </button>
      </li>
      <li className="nav__item">
        <button className="nav__link" type="button">
          Settings
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
