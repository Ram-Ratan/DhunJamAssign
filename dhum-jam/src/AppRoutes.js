import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  );
}

export default AppRoutes