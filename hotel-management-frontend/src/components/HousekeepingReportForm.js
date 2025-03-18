import React from "react";
import ReportFormTemplate from "./ReportFormTemplate";

const HousekeepingReportForm = () => {
  const fields = [
    { name: "date", label: "Report Date", type: "date", required: true },
    { name: "housekeepingIndent", label: "Total Housekeeping Indent", type: "number", required: true },
    { name: "checkIns", label: "Number of C/ins", type: "number", required: true },
    { name: "checkOuts", label: "Number of C/outs", type: "number", required: true },
    { name: "dayUse", label: "Number of Day use", type: "number", required: true },
    { name: "reviews", label: "Number of Reviews", type: "number", required: true },
    { name: "hkTeam", label: "Number of HK Team", type: "number", required: true },
    { name: "presentCount", label: "Number of Present", type: "number", required: true },
    { name: "absentCount", label: "Number of Absent", type: "number", required: true },
    { name: "leaveCount", label: "Number of Leave", type: "number", required: true },
    { name: "lostFoundItems", label: "Lost and Found Items", type: "text", required: false },
    { name: "maintenanceRooms", label: "Maintenance Rooms", type: "text", required: false },
    { name: "pestControl", label: "Pest Control Rooms", type: "text", required: false },
  ];

  return (
    <ReportFormTemplate
      reportTitle="Daily Housekeeping Report"
      fields={fields}
      fileName="HousekeepingReport"
    />
  );
};

export default HousekeepingReportForm;
