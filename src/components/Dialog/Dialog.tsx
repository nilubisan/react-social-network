import React from 'react';
import style from './Dialog.module.css';
import ContactsList from './ContactsList/ContactsList';
import Messages from './Messages/Messages';

const Dialog = () => {
  const userNames = ['Ann', 'Michael', 'Tonya', 'Oleg', 'Farid', 'Roman'];
  return (
    <div className={style.dialog}>
      <div className={style.dialog__contacts}>
        <div className={style.contacts__wrapper}>
          <ContactsList usernames={userNames} />
        </div>
      </div>
      <div className={style['dialog__divide-line']} />
      <div className={style.dialog__messages}>
        <Messages />
      </div>
    </div>
  );
};

export default Dialog;
