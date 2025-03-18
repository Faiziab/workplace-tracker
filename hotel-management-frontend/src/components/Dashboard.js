import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { UserOutlined, HomeOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import ResortManagement from "./ResortManagement";
import ProtectedComponent from "./ProtectedComponent";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for selecting services */}
      <Sider collapsible>
        <div style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "18px" }}>
          Dashboard Menu
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedService]}
          onClick={({ key }) => setSelectedService(key)}
        >
          <Menu.Item key="userManagement" icon={<UserOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item key="resortManagement" icon={<HomeOutlined />}>
            Resort Management
          </Menu.Item>
          <Menu.Item key="protectedData" icon={<LockOutlined />}>
            Protected Data
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content Area */}
      <Layout>
        <Header style={{ background: "#fff", padding: "10px", textAlign: "right" }}>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
          <h1>Welcome to the Dashboard</h1>
          <p>Select a service from the sidebar.</p>

          {/* Render the selected service dynamically */}
          {selectedService === "userManagement" && <UserManagement />}
          {selectedService === "resortManagement" && <ResortManagement />}
          {selectedService === "protectedData" && <ProtectedComponent />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
