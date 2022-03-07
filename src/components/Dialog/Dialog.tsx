import React, { FC, useState } from 'react';
import style from './Dialog.module.css';
import ContactsList from './ContactsList/ContactsList';
import Messages from './Messages/Messages';
import { IMessage } from './Messages/Message/Message';
import {
  ActionSetPost,
  ActionCreateMessage,
  ActionUpdateMessageText,
} from '../../state';

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
  newMessageText: string;
  dispatch: (
    _action: ActionSetPost | ActionCreateMessage | ActionUpdateMessageText,
  ) => void;
}

const Dialog: FC<{
  users: IDialog['users'];
  messages: IDialog['messages'];
  newMessageText: IDialog['newMessageText'];
  dispatch: IDialog['dispatch'];
}> = ({ users, messages, dispatch, newMessageText }) => {
  const [activeUser, setActiveUser] = useState(users[0]);
  const activeUserMessages = messages.find(
    (el) => activeUser.id === el.friendID,
  );

  return (
    <div className={style.dialog}>
      <div className={style.dialog__contacts}>
        <div className={style.contacts__wrapper}>
          <ContactsList
            users={users}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
          />
        </div>
      </div>
      <div className={style['dialog__divide-line']} />
      <div className={style.dialog__messages}>
        <Messages
          userName={activeUser.name}
          userID={activeUser.id}
          messages={activeUserMessages ? activeUserMessages.messages : []}
          dispatch={dispatch}
          newMessageText={newMessageText}
        />
      </div>
    </div>
  );
};

export default Dialog;
