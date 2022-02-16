import React, { FC, useState } from 'react';
import Contact from '../Contact/Contact';
import style from './ContactsList.module.css';

interface ContactsListProps {
  usernames: string[];
}

const ContactsList: FC<{ usernames: ContactsListProps['usernames'] }> = ({
  usernames,
}) => {
  const [activeUser, setActiveUser] = useState('');
  const toggleClass = (username: string) => setActiveUser(username);
  return (
    <ul className={style.contacts}>
      {usernames.map((username: string) => (
        <li key={username} className={style.contacts__item}>
          <button
            className={style['contacts__item-button']}
            onClick={() => toggleClass(username)}
            type="button"
          >
            <Contact username={username} isActive={username === activeUser} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
