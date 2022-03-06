import React, { FC, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface INewMessage {
  messageID: string;
  messageDate: Date;
  messageText: string;
  isFriendsMessage: boolean;
}

interface ICreateMessage {
  sendMessage: (_message: INewMessage) => void;
  updateMessageText: (_message: string) => void;
  inputMessageText: string;
}

const CreateMessage: FC<{
  sendMessage: ICreateMessage['sendMessage'];
  updateMessageText: ICreateMessage['updateMessageText'];
  inputMessageText: ICreateMessage['inputMessageText'];
}> = ({ sendMessage, updateMessageText, inputMessageText }) => {
  const inputEl = useRef(null);
  const onTextAreaSubmit = () => {
    if (inputEl.current.value !== '')
      sendMessage({
        messageID: uuidv4(),
        messageDate: new Date(),
        messageText: inputEl.current.value,
        isFriendsMessage: false,
      });
  };
  return (
    <>
      <textarea
        name=""
        id=""
        cols={30}
        rows={2}
        placeholder="Type here your new message"
        ref={inputEl}
        value={inputMessageText}
        onChange={() => updateMessageText(inputEl.current.value)}
      />
      <button type="submit" onClick={onTextAreaSubmit}>
        Send
      </button>
    </>
  );
};

export default CreateMessage;
