import React from "react";
import ReportFormTemplate from "./ReportFormTemplate";

const HRReportForm = () => {
  const fields = [
    { name: "date", label: "Report Date", type: "date", required: true },
    { name: "totalStaffPresent", label: "Total Staff Present", type: "number", required: true },
    { name: "totalStaffAbsent", label: "Total Staff Absent", type: "number", required: true },
    { name: "totalOnLeave", label: "Total On Leave", type: "number", required: true },
    { name: "cvBank", label: "CV Bank", type: "number", required: true },
    { name: "staffManagement", label: "Staff Management", type: "text", required: false },
  ];

  return <ReportFormTemplate reportTitle="HR Report" fields={fields} localStorageKey="HRReportData" />;
};

export default HRReportForm;
