import React, { FC, useRef } from 'react';
import {
  ActionCreateMessage,
  updateMessageActionCreator,
  createMessageActionCreator,
  ActionUpdateMessageText,
} from '../../../../state';

export interface INewMessage {
  messageID: string;
  messageDate: Date;
  messageText: string;
  isFriendsMessage: boolean;
}

interface ICreateMessage {
  friendID: string;
  dispatch: (_action: ActionCreateMessage | ActionUpdateMessageText) => void;
  inputMessageText: string;
}

const CreateMessage: FC<{
  friendID: ICreateMessage['friendID'];
  dispatch: ICreateMessage['dispatch'];
  inputMessageText: ICreateMessage['inputMessageText'];
}> = ({ dispatch, inputMessageText, friendID }) => {
  const inputEl = useRef(null);
  const onTextAreaSubmit = () => {
    if (inputEl.current.value !== '')
      dispatch(createMessageActionCreator(friendID));
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
          dispatch(
            updateMessageActionCreator({
              message: inputEl.current.value,
              friendID,
            }),
          )
        }
      />
      <button type="submit" onClick={onTextAreaSubmit}>
        Send
      </button>
    </>
  );
};

export default CreateMessage;
