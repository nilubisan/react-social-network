import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogContainer from './components/Dialog/DialogContainer';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import './App.css';

const App: FC<{}> = () => (
  <div className="app">
    <div className="app__wrapper">
      <Header />
      <div className="bottom">
        <Router>
          <SidebarContainer />
          <main className="main">
            <Routes>
              <Route path="/" element={<ProfileContainer />} />
              <Route path="/news" element={<News />} />
              <Route path="/messages/*" element={<DialogContainer />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </Router>
      </div>
    </div>
  </div>
);

export default App;
