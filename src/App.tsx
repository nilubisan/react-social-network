import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Dialog from './components/Dialog/Dialog';
import {
  IState,
  ActionSetPost,
  ActionCreateMessage,
  ActionUpdateMessageText,
  ActionUpdatePostText,
} from './state';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import './App.css';

export interface IAppProps {
  state: IState;
  dispatch: (
    _action:
      | ActionSetPost
      | ActionCreateMessage
      | ActionUpdateMessageText
      | ActionUpdatePostText,
  ) => void;
}

const App: FC<{
  state: IAppProps['state'];
  dispatch: IAppProps['dispatch'];
}> = ({ state, dispatch }) => {
  const { users, messages, posts, newMessageText, newPostText } = state;
  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <div className="bottom">
          <Router>
            <Sidebar users={users} />
            <main className="main">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Profile
                      posts={posts}
                      dispatch={dispatch}
                      newPostText={newPostText}
                    />
                  }
                />
                <Route path="/news" element={<News />} />
                <Route
                  path="/messages/*"
                  element={
                    <Dialog
                      users={users}
                      messages={messages}
                      newMessageText={newMessageText}
                      dispatch={dispatch}
                    />
                  }
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
