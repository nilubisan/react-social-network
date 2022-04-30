import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.css';

const Header: FC<{
  isUserAuth: boolean;
  isAuthPage: boolean;
  unsign: () => void;
}> = ({ isUserAuth, isAuthPage, unsign }) => (
  <header className={style.header}>
    <h2>Hallo</h2>
    {isAuthPage ? null : isUserAuth ? (
      <Link to="/" onClick={unsign} className={style['sign-btn']}>
        <span>log out</span>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </Link>
    ) : (
      <Link to="/auth" className={style['sign-btn']}>
        <span>log in</span>
        <FontAwesomeIcon icon={faRightToBracket} />
      </Link>
    )}
  </header>
);

export default Header;
