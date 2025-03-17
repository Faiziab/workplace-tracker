// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import { Table, Button, message } from 'antd';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await API.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to fetch users.');
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to delete a user by ID
  const deleteUser = async (id) => {
    try {
      await API.delete(`/api/users/${id}`);
      message.success('User deleted successfully.');
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user.');
    }
  };

  // Define table columns for Ant Design Table component
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger onClick={() => deleteUser(record.id)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default UserManagement;
