import React, { FC, useRef } from 'react';
import styles from './CreateMessage.module.css';

export interface INewMessage {
  messageId: string;
  messageDate: Date;
  messageText: string;
  isFriendsMessage: boolean;
}

interface ICreateMessage {
  userId: number;
  onMessageInputChange: (_messageObj: {
    message: string;
    userId: number;
  }) => void;
  onMessageInputSubmit: (_userId: number, _message: string) => void;
  inputMessageText: string;
}

const CreateMessage: FC<{
  userId: ICreateMessage['userId'];
  onMessageInputChange: ICreateMessage['onMessageInputChange'];
  onMessageInputSubmit: ICreateMessage['onMessageInputSubmit'];
  inputMessageText: ICreateMessage['inputMessageText'];
}> = ({
  onMessageInputChange,
  onMessageInputSubmit,
  inputMessageText,
  userId,
}) => {
  const inputEl = useRef(null);
  const onTextAreaSubmit = () => {
    onMessageInputSubmit(userId, inputEl.current.value);
  };
  return (
    <div className={styles.panel}>
      <textarea
        name=""
        id=""
        cols={30}
        rows={2}
        placeholder="Type here your new message"
        ref={inputEl}
        value={inputMessageText}
        onChange={() =>
          onMessageInputChange({
            message: inputEl.current.value,
            userId,
          })
        }
      />
      <button type="submit" onClick={onTextAreaSubmit}>
        Send
      </button>
    </div>
  );
};

export default CreateMessage;
