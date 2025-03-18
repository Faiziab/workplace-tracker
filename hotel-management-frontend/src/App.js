import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import API from './api';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import ResortManagement from './components/ResortManagement';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   API.get('/')
  //     .then(response => setMessage(response.data))
  //     .catch(error => console.error('API error:', error));
  // }, []);



  return (
    <div>
     {/* <Login /> */ }
     {/* <UserManagement /> */}
     <ResortManagement />

    </div>
  );


}


export default App;