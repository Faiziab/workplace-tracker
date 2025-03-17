import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import API from './api';
import Login from './components/login';
import UserManagement from './components/usermanagement';
import ResortManagement from './components/ResortManagement';



function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/')
      .then(response => setMessage(response.data))
      .catch(error => console.error('API error:', error));
  }, []);



  return (
    <div>
     {/* <Login /> */ }
     {/* <UserManagement /> */}
     {/* <ResortManagement /> */}
    </div>
  );

}

export default App;