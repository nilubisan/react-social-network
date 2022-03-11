import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store, { IState } from './redux/store';

const renderEntireTree = (state: IState) => {
  const dispatch = Store.dispatch.bind(Store);
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} dispatch={dispatch} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
renderEntireTree(Store.getState());
Store.subscribe(renderEntireTree);
