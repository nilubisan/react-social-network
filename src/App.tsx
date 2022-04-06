import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SetUsersStatusAC } from './redux/reducers/user-reducer';
import Header from './components/Header/Header';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import TempDialog from './components/Dialog/TempDialog';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import './App.css';

const App: FC<{}> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SetUsersStatusAC());
  }, [dispatch]);
  return (
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
                <Route path="/messages/*" element={<TempDialog />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/profile/:userId" element={<ProfileContainer />} />
              </Routes>
            </main>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default App;
