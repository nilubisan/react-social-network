import React, { FC, useState } from 'react';
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

export interface IAppProps {
  state: {
    users: IUser[];
    messages: IMessagesStore[];
    posts: IPost[];
  };
  setPost: (_post: IPost) => void;
}

const App: FC<{
  state: IAppProps['state'],
  setPost: IAppProps['setPost']
}> = ({ state, setPost }) => {
  const { users, messages, posts } = state;
  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <div className='bottom'>
        <Router>
          <Sidebar users={users} />
          <main className='main'>
            <Routes>
              <Route path="/" element={<Profile posts={posts} setPost={setPost}/>} />
              <Route path="/news" element={<News />} />
              <Route
                path="/messages/*"
                element={<Dialog users={users} messages={messages} />}
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
