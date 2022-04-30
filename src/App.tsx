import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import TempDialog from './components/Dialog/TempDialog';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import AuthContainer from './components/Login/LoginContainer';
import './App.css';

const App: FC<{}> = () => (
  <div className="app">
    <div className="app__wrapper">
      <Router>
        <HeaderContainer />
        <div className="bottom">
          <SidebarContainer />
          <main className="main">
            <Routes>
              <Route path="/" element={<ProfileContainer />} />
              <Route path="/news" element={<News />} />
              <Route path="/messages/*" element={<TempDialog />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/auth" element={<AuthContainer />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  </div>
);

export default App;
