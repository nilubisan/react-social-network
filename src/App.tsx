import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Dialog from './components/Dialog/Dialog';
import { IState } from './store';
import {
  ActionSetPost,
  ActionUpdatePostText,
} from './reducers/profile-reducer';
import {
  ActionCreateMessage,
  ActionUpdateMessageText,
} from './reducers/dialog-reducer';
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
  const {
    common: { users },
    dialog: { messages },
    profile: { posts, newPostText },
  } = state;
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
