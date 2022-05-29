import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import Home from './components/pages/Home';

export function App() {
  //
  //
  // read
  //
  

  if (localStorage.getItem('loggedIn') == null) {
    localStorage.setItem('loggedIn', false);
  }
  if (localStorage.getItem('loggedIn') == 'true') {
    var loggedIn = true;
  } else {
    var loggedIn = false;
  }
  return (
    <div>
      <Routes>
        <Route path="/*" element={loggedIn ? <Home /> : <LoginPage />} />
      </Routes>
    </div>
  );
}
