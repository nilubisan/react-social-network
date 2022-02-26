import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Contact from '../Contact/Contact';
import style from './ContactsList.module.css';
import { IUser } from '../Dialog';

interface IContactsList {
  users: IUser[];
  activeUser: string;
  setActiveUser: any;
}

const ContactsList: FC<{
  users: IContactsList['users'];
  activeUser: IContactsList['activeUser'];
  setActiveUser: IContactsList['setActiveUser'];
}> = ({ users, activeUser, setActiveUser }) => {
  const toggleClass = (username: string, id: string) =>
    setActiveUser({ username, id });
  return (
    <ul className={style.contacts}>
      {users.map(({ name, id }) => (
        <li key={id} className={style.contacts__item}>
          <NavLink
            to={`/messages/${id}`}
            className={style['contacts__item-button']}
            onClick={() => toggleClass(name, id)}
            type="button"
          >
            <Contact username={name} isActive={name === activeUser} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
