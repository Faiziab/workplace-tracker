// src/components/ResortManagement.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import { Table, Button, message, Modal, Form, Input } from 'antd';

const ResortManagement = () => {
  const [resorts, setResorts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingResort, setEditingResort] = useState(null);
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


  
  //  Handle adding/updating resort
  const handleSubmit = async (values) => {
    try {
      if (editingResort) {
        await API.put(`/api/resorts/${editingResort.id}`, values);
        message.success("Resort updated successfully");
      } else {
        await API.post("/api/resorts", values);
        message.success("Resort added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchResorts();
    } catch (error) {
      message.error("Failed to save resort");
    }
  };

    //  Open modal for editing resort
    const openEditModal = (resort) => {
      setEditingResort(resort);
      form.setFieldsValue(resort);
      setIsModalVisible(true);
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
    <div style={{ padding: "20px" }}>
      <h2>Resort Management</h2>
      <Button type="primary" onClick={() => { setEditingResort(null); setIsModalVisible(true); }}>
        Add Resort
      </Button>
      <Table dataSource={resorts} rowKey="id" style={{ marginTop: "20px" }}>
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Location" dataIndex="location" />
        <Table.Column title="Cluster GM" dataIndex="clusterGM" />
        <Table.Column
          title="Actions"
          render={(_, resort) => (
            <>
              <Button onClick={() => openEditModal(resort)} style={{ marginRight: "10px" }}>Edit</Button>
              <Button danger onClick={() => deleteResort(resort.id)}>Delete</Button>
            </>
          )}
        />
      </Table>

      {/* Modal for Adding/Editing Resort */}
      <Modal
        title={editingResort ? "Edit Resort" : "Add Resort"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Resort Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="clusterGM" label="Cluster GM" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResortManagement;
