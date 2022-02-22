import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Contact from '../Contact/Contact';
import style from './ContactsList.module.css';
import { User } from '../Dialog'

interface ContactsListProps {
  users: User[];
  activeUser: string;
  setActiveUser: any;
}

const ContactsList: FC<{ users: ContactsListProps['users'], activeUser: ContactsListProps['activeUser'], setActiveUser: ContactsListProps['setActiveUser'] }> = ({
  users, activeUser, setActiveUser
}) => {

  const toggleClass = (username: string) => setActiveUser(username);
  return (
    <ul className={style.contacts}>
      {users.map(({ name, id}) => (
        <li key={id} className={style.contacts__item}>
          <NavLink
            to={ `/messages/${id}`}
            className={style['contacts__item-button']}
            onClick={() => toggleClass(name)}
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
