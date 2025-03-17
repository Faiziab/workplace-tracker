// src/components/ResortManagement.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import { Table, Button, message, Modal, Form, Input } from 'antd';

const ResortManagement = () => {
  const [resorts, setResorts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Function to fetch resorts from backend
  const fetchResorts = async () => {
    try {
      const response = await API.get('/api/resorts');
      setResorts(response.data);
    } catch (error) {
      console.error('Error fetching resorts:', error);
      message.error('Failed to fetch resorts.');
    }
  };

  useEffect(() => {
    fetchResorts();
  }, []);

  // Function to delete a resort by ID
  const deleteResort = async (id) => {
    try {
      await API.delete(`/api/resorts/${id}`);
      message.success('Resort deleted successfully.');
      fetchResorts();
    } catch (error) {
      console.error('Error deleting resort:', error);
      message.error('Failed to delete resort.');
    }
  };

  // Function to handle adding a new resort
  const handleAddResort = async (values) => {
    try {
      await API.post('/api/resorts', values);
      message.success('Resort added successfully.');
      setIsModalVisible(false);
      form.resetFields();
      fetchResorts();
    } catch (error) {
      console.error('Error adding resort:', error);
      message.error('Failed to add resort.');
    }
  };

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Cluster GM',
      dataIndex: 'clusterGM',
      key: 'clusterGM'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger onClick={() => deleteResort(record.id)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Resort Management</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
        Add Resort
      </Button>
      <Table dataSource={resorts} columns={columns} rowKey="id" />

      {/* Modal for adding a new resort */}
      <Modal
        title="Add New Resort"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddResort}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the resort name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please enter the location' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Cluster GM" name="clusterGM" rules={[{ required: true, message: 'Please enter the Cluster GM' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Resort
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResortManagement;
