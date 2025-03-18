import React from "react";
import ReportFormTemplate from "./ReportFormTemplate";

const MaintenanceReportForm = () => {
  const fields = [
    { name: "date", label: "Report Date", type: "date", required: true },
    { name: "totalRooms", label: "Total Rooms", type: "number", required: true },
    { name: "electricConsumption", label: "Electric Consumption", type: "number", required: true },
    { name: "waterConsumption", label: "Water Consumption", type: "number", required: true },
    { name: "majorComplaints", label: "Major Complaints", type: "text", required: false },
  ];

  return <ReportFormTemplate reportTitle="Maintenance Report" fields={fields} localStorageKey="MaintenanceReportData" />;
};

export default MaintenanceReportForm;
