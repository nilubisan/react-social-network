import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Contact from '../Contact/Contact';
import style from './ContactsList.module.css';
import { DialogUserInfo } from '../DialogContainer';

interface IContactsList {
  users: DialogUserInfo[];
  activeUser: DialogUserInfo;
  setActiveUser: (_id: number) => void;
}

const ContactsList: FC<{
  users: IContactsList['users'];
  activeUser: IContactsList['activeUser'];
  setActiveUser: IContactsList['setActiveUser'];
}> = ({ users, activeUser, setActiveUser }) => (
  <ul className={style.contacts}>
    {users.map(({ userName, id }) => (
      <li key={id} className={style.contacts__item}>
        <NavLink
          to={`/messages/${id.toString()}`}
          className={style['contacts__item-button']}
          onClick={() => setActiveUser(id)}
          type="button"
        >
          <Contact
            userName={userName}
            isActive={userName === activeUser.userName}
          />
        </NavLink>
      </li>
    ))}
  </ul>
);

export default ContactsList;
