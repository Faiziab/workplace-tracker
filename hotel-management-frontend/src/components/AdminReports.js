import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import * as XLSX from "xlsx";

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    const fileName = "SalesReport.xlsx"; // Example: You can have different files or a combined file
    fetch(fileName)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No reports found");
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setReports(jsonData);
      })
      .catch((error) => {
        message.warning(error.message);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Reports</h2>
      <Button type="primary" onClick={fetchReports}>
        Refresh Reports
      </Button>
      <Table dataSource={reports} rowKey="date" style={{ marginTop: "20px" }}>
        <Table.Column title="Report Date" dataIndex="date" />
        <Table.Column title="Total Room Revenue" dataIndex="totalRoomRevenue" />
        <Table.Column title="Comments" dataIndex="comments" />
      </Table>
    </div>
  );
};

export default AdminReports;
