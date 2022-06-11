import React, {useRef, useEffect} from 'react';
import style from './Chat.module.css';

interface ChatMessage {
  userId: number;
  userName: string;
  message: string;
  photo: string;
}

interface Chat {
  startChat: () => void;
  endChat: () => void;
  messages: ChatMessage[];
  newMessageText: string;
  onMessageInputChange: (_message: string) => void;
  onMessageInputSubmit: () => void;
}

const Chat = (props: Chat) => {
  const {
    startChat,
    endChat,
    messages,
    newMessageText,
    onMessageInputChange,
    onMessageInputSubmit,
  } = props;
  const messagesEndRef = useRef(null);
  const scrollToChatBottom = () => messagesEndRef.current.scrollIntoView();
  useEffect(() => scrollToChatBottom(), [messages])
  return (
    <div>
      <div className={style.messages__main} />
      <div>
        <button type="button" onClick={startChat}>
          Start chat
        </button>
        <button type="button" onClick={endChat}>
          End chat
        </button>
      </div>
      <div className={style['chat__messages-inner']}>
        {messages.map((message) => (
          <div key={`${message.message}`} className={style.chat__message}>
            <div>
              <img src={message.photo} width="40" height="40" alt="" />
              <span>{message.userName}</span>
            </div>
            <div>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={style.messages__input}>
        <textarea
          value={newMessageText}
          onChange={(e) => onMessageInputChange(e.target.value)}
        />
        <button type="button" onClick={onMessageInputSubmit}>
          Send message
        </button>
      </div>
    </div>
  );
};

export default Chat;
