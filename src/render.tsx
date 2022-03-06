import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { IAppProps } from './App';
import { setPost, createMessage, updateMessageText } from './state';

const renderEntireTree = (STATE: IAppProps['state']) => {
        ReactDOM.render(
        <React.StrictMode>
          <App state={STATE} setPost={setPost} createMessage={createMessage} updateMessageText={updateMessageText}/>
        </React.StrictMode>,
        document.getElementById('root'),
      )
};

export default renderEntireTree;