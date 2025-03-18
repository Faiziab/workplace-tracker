// import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import API from './api';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import ResortManagement from './components/ResortManagement';
// import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import ProtectedComponent from './components/ProtectedComponent';
import 'antd/dist/reset.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/')
      .then(response => setMessage(response.data))
      .catch(error => console.error('API error:', error));
  }, []);



  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;