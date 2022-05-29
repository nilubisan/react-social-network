import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './Dialog.module.css';
import ContactsList from './ContactsList/ContactsList';
import Messages, { Message } from './Messages/Messages';
import { DialogUserInfo } from './DialogContainer';
import { getMessages } from '../../redux/reducers/dialog-reducer';
import Preloader from '../Preloader/Preloader';

export interface MessagesStore {
  [userId: number]: {
    messages: Message[];
    newMessageText: string;
    totalCount: number;
  };
}

interface IDialog {
  users: DialogUserInfo[];
  messages: MessagesStore;
  onMessageInputChange: (_messageObj: {
    message: string;
    userId: number;
  }) => void;
  onMessageInputSubmit: (_userId: number, _message: string) => void;
  onMessageDelete: (_msgProps: { msgId: string; userId: number }) => void;
}

const Dialog: FC<{
  users: IDialog['users'];
  messages: IDialog['messages'];
  onMessageInputChange: IDialog['onMessageInputChange'];
  onMessageInputSubmit: IDialog['onMessageInputSubmit'];
  onMessageDelete: IDialog['onMessageDelete'];
}> = ({
  users,
  messages,
  onMessageInputChange,
  onMessageInputSubmit,
  onMessageDelete,
}) => {
  const [activeUser, setActiveUser] = useState(users[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages(activeUser.id));
  }, [activeUser.id]);
  const setActiveUserById = (id: number) => {
    const ind = users.findIndex((user) => user.id === id);
    setActiveUser(users[ind]);
  };
  return (
    <div className={style.dialog}>
      <div className={style.dialog__contacts}>
        <div className={style.contacts__wrapper}>
          <ContactsList
            users={users}
            activeUser={activeUser}
            setActiveUser={setActiveUserById}
          />
        </div>
      </div>
      <div className={style['dialog__divide-line']} />
      <div className={style.dialog__messages}>
        {!messages[activeUser.id] ? (
          <Preloader />
        ) : (
          <Messages
            userName={activeUser.userName}
            userId={activeUser.id}
            messages={messages[activeUser.id].messages}
            onMessageInputChange={onMessageInputChange}
            onMessageInputSubmit={onMessageInputSubmit}
            onMessageDelete={onMessageDelete}
            newMessageText={messages[activeUser.id].newMessageText}
          />
        )}
      </div>
    </div>
  );
};

export default Dialog;
