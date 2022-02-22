import React, { useState } from 'react';
import style from './Dialog.module.css';
import ContactsList from './ContactsList/ContactsList';
import Messages from './Messages/Messages';

export interface User {
  name: string;
  id: string;
}

const Dialog = () => {
  const users = [
    {
      name: 'Ann',
      id: 'X65SPP0CM6',
    },
    {
      name: 'Michael',
      id: '6XYOC5yy7I',
    },
    {
      name: 'Tonya',
      id: 'BGTP5M4599',
    },
    {
      name: 'Oleg',
      id: 'RQ4D130E0R',
    },
    {
      name: 'Farid',
      id: 'RIUz5UXPQD',
    },
  ];
  const [activeUser, setActiveUser] = useState('Ann');
  return (
    <div className={style.dialog}>
      <div className={style.dialog__contacts}>
        <div className={style.contacts__wrapper}>
          <ContactsList users={users} activeUser={activeUser} setActiveUser={setActiveUser} />
        </div>
      </div>
      <div className={style['dialog__divide-line']} />
      <div className={style.dialog__messages}>
        <Messages activeUser={activeUser}/>
      </div>
    </div>
  );
};

export default Dialog;
