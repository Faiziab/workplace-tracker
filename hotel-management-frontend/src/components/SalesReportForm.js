import React from "react";
import ReportFormTemplate from "./ReportFormTemplate";

const SalesReportForm = () => {
  const fields = [
    { name: "date", label: "Report Date", type: "date", required: true },
    { name: "totalRoomRevenue", label: "Total Room Revenue", type: "number", required: true },
    { name: "roomsSold", label: "Number of Rooms Sold", type: "number", required: true },
    { name: "adr", label: "Average Daily Rate (ADR)", type: "number", required: true },
    { name: "newLeads", label: "Number of New Leads", type: "number", required: true },
    { name: "closedInquiries", label: "Number of Inquiries Closed", type: "number", required: true },
    { name: "siteVisits", label: "Number of Site Visits", type: "number", required: true },
    { name: "phoneInquiries", label: "Number of Phone Inquiries", type: "number", required: true },
    { name: "comments", label: "Comments", type: "text", required: false },
  ];

  return (
    <ReportFormTemplate
      reportTitle="Daily Sales Report"
      fields={fields}
      fileName="SalesReport"
    />
  );
};

export default SalesReportForm;
