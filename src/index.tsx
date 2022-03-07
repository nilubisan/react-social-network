import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store, { IState } from './state';

const renderEntireTree = (state: IState) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        setPost={(p) => Store.setPost(p)}
        createMessage={(m, f) => Store.createMessage(m, f)}
        updateMessageText={(m) => Store.updateMessageText(m)}
      />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
renderEntireTree(Store.getState());
Store.subscriber(renderEntireTree);
