// import React, { useState } from "react";
// import { Layout, Menu, Button } from "antd";
// import { UserOutlined, HomeOutlined, LockOutlined, SettingOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import UserManagement from "./UserManagement";
// import ResortManagement from "./ResortManagement";
// import ProtectedComponent from "./ProtectedComponent";

// const { Header, Sider, Content } = Layout;

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role"); // Get role from storage
//   const [selectedService, setSelectedService] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider collapsible>
//         <div style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "18px" }}>
//           Dashboard
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[selectedService]}
//           onClick={({ key }) => {
//             if (key === "AdminDashboard") {
//               navigate("/admin");
//             } else {
//               setSelectedService(key);
//             }
//           }}
//         >
//           {role === "admin" && (
//             <Menu.Item key="AdminDashboard" icon={<SettingOutlined />}>
//               Admin Dashboard
//             </Menu.Item>
//           )}
//           <Menu.Item key="UserManagement" icon={<UserOutlined />}>
//             User Management
//           </Menu.Item>
//           <Menu.Item key="ResortManagement" icon={<HomeOutlined />}>
//             Resort Management
//           </Menu.Item>
//           <Menu.Item key="ProtectedData" icon={<LockOutlined />}>
//             Protected Data
//           </Menu.Item>
//         </Menu>
//       </Sider>

//       {/* Main Content */}
//       <Layout>
//         <Header style={{ background: "#fff", padding: "10px", textAlign: "right" }}>
//           <Button type="primary" danger onClick={handleLogout}>
//             Logout
//           </Button>
//         </Header>
//         <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
//           <h1>Welcome to the Dashboard</h1>

//           {/* Show Only Selected Component */}
//           {selectedService === "userManagement" && <UserManagement />}
//           {selectedService === "resortManagement" && <ResortManagement />}
//           {selectedService === "protectedData" && <ProtectedComponent />}
          
//           {!selectedService && <p>Please select a service from the menu.</p>}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;





import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { FormOutlined, LogoutOutlined, FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SalesReportForm from "./SalesReportForm";
import RestaurantReportForm from "./RestaurantReportForm";
import KitchenReportForm from "./KitchenReportForm";
import HousekeepingReportForm from "./HousekeepingReportForm";
import HRReportForm from "./HRReportForm";
import MaintenanceReportForm from "./MaintenanceReportForm";
import StoreReportForm from "./StoreReportForm";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu; // Import SubMenu for dropdown functionality

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedForm, setSelectedForm] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "18px" }}>
          Dashboard
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedForm]}
          onClick={({ key }) => setSelectedForm(key)}
        >
          {/* Reports Dropdown */}
          <SubMenu key="reports" icon={<FileTextOutlined />} title="Reports">
            <Menu.Item key="SalesReport" icon={<FormOutlined />}>
              Sales Report
            </Menu.Item>
            <Menu.Item key="RestaurantReport" icon={<FormOutlined />}>
              Restaurant Report
            </Menu.Item>
            <Menu.Item key="KitchenReport" icon={<FormOutlined />}>
              Kitchen Report
            </Menu.Item>
            <Menu.Item key="HousekeepingReport" icon={<FormOutlined />}>
              Housekeeping Report
            </Menu.Item>
            <Menu.Item key="HRReport" icon={<FormOutlined />}>
              HR Report
            </Menu.Item>
            <Menu.Item key="MaintenanceReport" icon={<FormOutlined />}>
              Maintenance Report
            </Menu.Item>
            <Menu.Item key="StoreReport" icon={<FormOutlined />}>
              Store Report
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header style={{ background: "#fff", padding: "10px", textAlign: "right" }}>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
          <h1>Welcome to the Dashboard</h1>
          {!selectedForm && <p>Please select a form or report from the menu.</p>}
          {selectedForm === "SalesReport" && <SalesReportForm />}
          {selectedForm === "RestaurantReport" && <RestaurantReportForm />}
          {selectedForm === "KitchenReport" && <KitchenReportForm />}
          {selectedForm === "HousekeepingReport" && <HousekeepingReportForm />}
          {selectedForm === "HRReport" && <HRReportForm />}
          {selectedForm === "MaintenanceReport" && <MaintenanceReportForm />}
          {selectedForm === "StoreReport" && <StoreReportForm />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;


