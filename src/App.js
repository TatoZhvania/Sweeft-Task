import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserPage from './components/UserPage';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserList />} />
      <Route path="/users/:userId" element={<UserPage />} />
    </Routes>
  );
};

export default App;
