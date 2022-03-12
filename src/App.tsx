import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogContainer from './components/Dialog/DialogContainer';
import { IStore } from './redux/store';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import './App.css';

const App: FC<{
  store: IStore;
}> = ({ store }) => {
  const state = store.getState();
  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <div className="bottom">
          <Router>
            <Sidebar users={state.common.users} />
            <main className="main">
              <Routes>
                <Route path="/" element={<ProfileContainer store={store} />} />
                <Route path="/news" element={<News />} />
                <Route
                  path="/messages/*"
                  element={<DialogContainer store={store} />}
                />
                <Route path="/friends" element={<Friends />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default App;
