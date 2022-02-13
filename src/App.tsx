import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';

const App = () => (
  <div className="app">
    <div className="app__wrapper">
      <Header />
      <Nav />
      <Profile />
    </div>
  </div>
);

export default App;
