// import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import API from './api';
import Login from './components/Login';
// import UserManagement from './components/UserManagement';
// import ResortManagement from './components/ResortManagement';
import AdminDashboard from "./components/AdminDashboard";
// import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
// import ProtectedComponent from './components/ProtectedComponent';
import 'antd/dist/reset.css';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem("role");
//   return token ? children : <Navigate to="/login" />;
// };

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />; // Redirect if role is not allowed
  }

  return children;
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
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        {/* <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} /> */}
       
         {/* ✅ Regular users (All authenticated users) */}
         <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "CGM", "department_head"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ Admin dashboard (Only accessible by Admins) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />      
       
       
       
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;