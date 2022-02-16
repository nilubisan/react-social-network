import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
// import Profile from './components/Profile/Profile';
import Dialog from './components/Dialog/Dialog';

const App = () => (
  <div className="app">
    <div className="app__wrapper">
      <Header />
      <Nav />
      {/* <Profile /> */}
      <Dialog />
    </div>
  </div>
);

export default App;
