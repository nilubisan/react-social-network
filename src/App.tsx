import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setAuthData } from './redux/reducers/auth-reducer';
import { setInitializedAC } from './redux/reducers/app-reducer';
import selectIsInitialized from './AppSelector';
import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import AuthContainer from './components/Login/LoginContainer';
import ChatContainer from './components/Chat/ChatContainer';
import './App.css';
import Preloader from './components/Preloader/Preloader';

const DialogContainer = lazy(
  () => import('./components/Dialog/DialogContainer'),
);
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

const App = () => {
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
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path="/" element={<ProfileContainer />} />
                  <Route path="/messages/*" element={<DialogContainer />} />
                  <Route path="/users" element={<UsersContainer />} />
                  <Route
                    path="/profile/:userId"
                    element={<ProfileContainer />}
                  />
                  <Route path="/auth" element={<AuthContainer />} />
                  <Route path="/chat" element={<ChatContainer />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
