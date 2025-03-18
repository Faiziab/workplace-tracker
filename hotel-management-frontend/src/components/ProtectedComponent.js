// src/components/ProtectedComponent.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import { Button, message } from 'antd';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);

  const fetchProtectedData = async () => {
    try {
      const response = await API.get('/api/protected');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
      message.error('Failed to fetch protected data.');
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <div>
      <h2>Protected Data</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading protected data...</p>
      )}
    </div>
  );
};

export default ProtectedComponent;
