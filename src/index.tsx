import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { IAppProps } from './App';
import {
  STATE,
  setPost,
  createMessage,
  updateMessageText,
  subscriber,
} from './state';

const renderEntireTree = (state: IAppProps['state']) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        setPost={setPost}
        createMessage={createMessage}
        updateMessageText={updateMessageText}
      />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
subscriber(renderEntireTree);
renderEntireTree(STATE);
