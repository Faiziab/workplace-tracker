import React from "react";
import ReportFormTemplate from "./ReportFormTemplate";

const RestaurantReportForm = () => {
  const fields = [
    { name: "date", label: "Report Date", type: "date", required: true },
    { name: "restaurantRevenue", label: "Total Restaurant Revenue", type: "number", required: true },
    { name: "roomsSold", label: "Number of Rooms Sold", type: "number", required: true },
    { name: "roomServiceRevenue", label: "Total Room Service Revenue", type: "number", required: true },
    { name: "googleReviews", label: "Number of Google Reviews", type: "number", required: true },
    { name: "tripAdvisorReviews", label: "Number of Trip Advisor Reviews", type: "number", required: true },
    { name: "otaReviews", label: "Number of OTA Reviews", type: "number", required: true },
    { name: "phoneInquiries", label: "Number of Phone Inquiries", type: "number", required: true },
    { name: "barRevenue", label: "Bar Revenue", type: "number", required: true },
    { name: "teamCount", label: "Number of Team", type: "number", required: true },
    { name: "presentCount", label: "Number of Present", type: "number", required: true },
    { name: "absentCount", label: "Number of Absent", type: "number", required: true },
    { name: "briefing", label: "Today Briefing", type: "text", required: false },
    { name: "cleanliness", label: "Cleanliness of Restaurant", type: "text", required: false },
    { name: "maintenance", label: "Maintenance of Restaurant", type: "text", required: false },
  ];

  return (
    <ReportFormTemplate
      reportTitle="Daily Restaurant Sales Report"
      fields={fields}
      fileName="RestaurantReport"
    />
  );
};

export default RestaurantReportForm;
