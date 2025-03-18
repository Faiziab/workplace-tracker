// src/components/UserManagement.js
import React, { useState, useEffect } from "react";
import API from "../api";
import { Table, Button, message, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // ✅ Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await API.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Handle adding/updating user
  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        await API.put(`/api/users/${editingUser.id}`, values);
        message.success("User updated successfully");
      } else {
        await API.post("/api/users", values);
        message.success("User added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error("Failed to save user");
    }
  };

  // ✅ Handle deleting user
  const deleteUser = async (id) => {
    try {
      await API.delete(`/api/users/${id}`);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  // ✅ Open modal for editing user
  const openEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <Button type="primary" onClick={() => { setEditingUser(null); setIsModalVisible(true); }}>
        Add User
      </Button>
      <Table dataSource={users} rowKey="id" style={{ marginTop: "20px" }}>
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Phone Number" dataIndex="phoneNumber" />
        <Table.Column title="Role" dataIndex="role" />
        <Table.Column
          title="Actions"
          render={(_, user) => (
            <>
              <Button onClick={() => openEditModal(user)} style={{ marginRight: "10px" }}>Edit</Button>
              <Button danger onClick={() => deleteUser(user.id)}>Delete</Button>
            </>
          )}
        />
      </Table>

      {/* Modal for Adding/Editing User */}
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="CGM">Cluster GM</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
