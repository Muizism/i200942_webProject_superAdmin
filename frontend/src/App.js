import React from 'react';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Users from './Users';
import Admins from './Admin';
import Reports from './ReportAnalytics';
import Hotels from './Hotels';
import Signup from './Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
