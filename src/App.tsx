import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Dialog, { IUser, IMessagesStore } from './components/Dialog/Dialog';
import { IPost } from './components/Profile/Post/Post';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import './App.css';
import { IMessage } from './components/Dialog/Messages/Message/Message';

export interface IAppProps {
  state: {
    users: IUser[];
    messages: IMessagesStore[];
    posts: IPost[];
    newMessageText: string;
  };
  setPost: (_post: IPost) => void;
  createMessage: (_message: IMessage, _friendID: string) => void;
  updateMessageText: (_messageText: string) => void;
}

const App: FC<{
  state: IAppProps['state'];
  setPost: IAppProps['setPost'];
  createMessage: IAppProps['createMessage'];
  updateMessageText: IAppProps['updateMessageText'];
}> = ({ state, setPost, createMessage, updateMessageText }) => {
  const { users, messages, posts, newMessageText } = state;
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
                  element={<Profile posts={posts} setPost={setPost} />}
                />
                <Route path="/news" element={<News />} />
                <Route
                  path="/messages/*"
                  element={
                    <Dialog
                      users={users}
                      messages={messages}
                      newMessageText={newMessageText}
                      createMessage={createMessage}
                      updateMessageText={updateMessageText}
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
