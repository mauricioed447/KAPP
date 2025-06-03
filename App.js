import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentApp } from './components/student';
import { AdminApp } from './components/admin';

const App = () => (
  <Router>
    <Routes>
      <Route path="/admin/*" element={<AdminApp navigate={(path) => window.location.href = path} />} />
      <Route path="/*" element={<StudentApp navigate={(path) => window.location.href = path} />} />
    </Routes>
  </Router>
);

export default App;
