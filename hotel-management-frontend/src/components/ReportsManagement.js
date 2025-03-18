import React, { useState, useEffect } from "react";
import API from "../api";
import { Table, Button, message } from "antd";

const ReportsManagement = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await API.get("/api/reports");
      setReports(response.data);
    } catch (error) {
      message.error("Failed to fetch reports");
    }
  };

  const approveReport = async (id) => {
    try {
      await API.put(`/api/reports/${id}/approve`);
      message.success("Report approved!");
      fetchReports(); // Refresh list
    } catch (error) {
      message.error("Failed to approve report");
    }
  };

  return (
    <div>
      <h2>Manage Reports</h2>
      <Table dataSource={reports} rowKey="id">
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Department" dataIndex="department" />
        <Table.Column title="Status" dataIndex="status" />
        <Table.Column
          title="Actions"
          render={(_, report) => (
            report.status === "pending" && (
              <Button type="primary" onClick={() => approveReport(report.id)}>Approve</Button>
            )
          )}
        />
      </Table>
    </div>
  );
};

export default ReportsManagement;
