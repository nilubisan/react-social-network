import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import Dialog from './components/Dialog/Dialog';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import './App.css';

const App = () => (
  <div className="app">
    <div className="app__wrapper">
      <Header />
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/news" element={<News />} />
          <Route path="/messages" element={<Dialog />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  </div>
);

export default App;
