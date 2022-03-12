import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store, { IStore } from './redux/store';

const renderEntireTree = (store: IStore) => {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
renderEntireTree(Store);
Store.subscribe(renderEntireTree);
