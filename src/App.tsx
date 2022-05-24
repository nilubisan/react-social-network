import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setAuthData } from './redux/reducers/auth-reducer';
import { setInitializedAC } from './redux/reducers/app-reducer';
import { selectIsInitialized } from './AppSelector';
import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogContainer from './components/Dialog/DialogContainer';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import AuthContainer from './components/Login/LoginContainer';
import './App.css';
import Preloader from './components/Preloader/Preloader';

const App: FC<{}> = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const initializeApp = async () => {
    await dispatch(setAuthData());
    await dispatch(setInitializedAC());
  };
  useEffect(() => {
    initializeApp();
  }, []);
  return !isInitialized ? (
    <Preloader />
  ) : (
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
                <Route path="/messages/*" element={<DialogContainer />} />
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
};

export default App;
