import React, { FC, useRef } from 'react';

export interface INewMessage {
  messageID: string;
  messageDate: Date;
  messageText: string;
  isFriendsMessage: boolean;
}

interface ICreateMessage {
  friendID: string;
  onMessageInputChange: (_messageObj: {
    message: string;
    friendID: string;
  }) => void;
  onMessageInputSubmit: (_friendID: string) => void;
  inputMessageText: string;
}

const CreateMessage: FC<{
  friendID: ICreateMessage['friendID'];
  onMessageInputChange: ICreateMessage['onMessageInputChange'];
  onMessageInputSubmit: ICreateMessage['onMessageInputSubmit'];
  inputMessageText: ICreateMessage['inputMessageText'];
}> = ({
  onMessageInputChange,
  onMessageInputSubmit,
  inputMessageText,
  friendID,
}) => {
  const inputEl = useRef(null);
  const onTextAreaSubmit = () => {
    onMessageInputSubmit(friendID);
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
        onChange={() =>
          onMessageInputChange({
            message: inputEl.current.value,
            friendID,
          })
        }
      />
      <button type="submit" onClick={onTextAreaSubmit}>
        Send
      </button>
    </>
  );
};

export default CreateMessage;
