import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import Home from './components/pages/Home';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/*" element={<Home/>} />
        
      </Routes>
    </div>
  );
}
