import React from "react";
import ReportFormTemplate from "./ReportFormTemplate";

const StoreReportForm = () => {
  const fields = [
    { name: "date", label: "Report Date", type: "date", required: true },
    { name: "totalPurchase", label: "Total Purchase", type: "number", required: true },
    { name: "totalIndent", label: "Total Indent", type: "number", required: true },
    { name: "totalIssued", label: "Total Issued", type: "number", required: true },
    { name: "remarks", label: "Remarks", type: "text", required: false },
  ];

  return <ReportFormTemplate reportTitle="Store Report" fields={fields} localStorageKey="StoreReportData" />;
};

export default StoreReportForm;
