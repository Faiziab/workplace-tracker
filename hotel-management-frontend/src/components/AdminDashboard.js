import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Card, Statistic, message } from "antd";
import { UserOutlined, HomeOutlined, FileTextOutlined, BarChartOutlined, LogoutOutlined } from "@ant-design/icons";
import API from "../api";
import UserManagement from "./UserManagement";
import ResortManagement from "./ResortManagement";
import ReportsManagement from "./ReportsManagement"; // Create this file later

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({ users: [], resorts: [], reports: [] });
  const [selectedMenu, setSelectedMenu] = useState("overview"); // Default to Overview
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await API.get("/api/admin/dashboard");
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <Sider collapsible>
        <div style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "18px" }}>
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="overview" icon={<BarChartOutlined />}>
            Overview
          </Menu.Item>
          <Menu.Item key="userManagement" icon={<UserOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item key="resortManagement" icon={<HomeOutlined />}>
            Resort Management
          </Menu.Item>
          <Menu.Item key="reportsManagement" icon={<FileTextOutlined />}>
            Reports Management
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
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
          {/* Overview Page - Shows Admin Stats */}
          {selectedMenu === "overview" && (
            <div>
              <h1>Admin Dashboard Overview</h1>
              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <Card>
                  <Statistic title="Total Users" value={dashboardData.users.length} loading={loading} />
                </Card>
                <Card>
                  <Statistic title="Total Resorts" value={dashboardData.resorts.length} loading={loading} />
                </Card>
                <Card>
                  <Statistic title="Pending Reports" value={dashboardData.reports.filter(r => r.status === "pending").length} loading={loading} />
                </Card>
              </div>
            </div>
          )}

          {/* Conditionally Render Pages Based on Menu Selection */}
          {selectedMenu === "userManagement" && <UserManagement />}
          {selectedMenu === "resortManagement" && <ResortManagement />}
          {selectedMenu === "reportsManagement" && <ReportsManagement />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
