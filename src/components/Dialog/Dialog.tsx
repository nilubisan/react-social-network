import React, { FC, useState } from 'react';
import style from './Dialog.module.css';
import ContactsList from './ContactsList/ContactsList';
import Messages from './Messages/Messages';
import { IMessage } from './Messages/Message/Message';

export interface IUser {
  name: string;
  id: string;
}

export interface IMessagesStore {
  friendID: string;
  messages: IMessage[];
}

interface IDialog {
  users: IUser[];
  messages: IMessagesStore[];
}

const Dialog: FC<{
  users: IDialog['users'];
  messages: IDialog['messages'];
}> = ({ users, messages }) => {
  const [activeUser, setActiveUser] = useState(users[0]);
  const activeUserMessages = messages.find(
    (el) => activeUser.id === el.friendID,
  );

  console.log(activeUser);
  return (
    <div className={style.dialog}>
      <div className={style.dialog__contacts}>
        <div className={style.contacts__wrapper}>
          <ContactsList
            users={users}
            activeUser={activeUser.name}
            setActiveUser={setActiveUser}
          />
        </div>
      </div>
      <div className={style['dialog__divide-line']} />
      <div className={style.dialog__messages}>
        <Messages
          userName={activeUser.name}
          messages={activeUserMessages ? activeUserMessages.messages : []}
        />
      </div>
    </div>
  );
};

export default Dialog;
