import React from "react";
import ReportFormTemplate from "./ReportFormTemplate";

const KitchenReportForm = () => {
  const fields = [
    { name: "date", label: "Report Date", type: "date", required: true },
    { name: "foodIndent", label: "Total Food Indent", type: "number", required: true },
    { name: "breakfastCount", label: "Number of Breakfast", type: "number", required: true },
    { name: "lunchCount", label: "Number of Lunch", type: "number", required: true },
    { name: "hiTeaCount", label: "Number of Hi Tea", type: "number", required: true },
    { name: "dinnerCount", label: "Number of Dinner", type: "number", required: true },
    { name: "teamCount", label: "Number of Kitchen Team", type: "number", required: true },
    { name: "presentCount", label: "Number of Present", type: "number", required: true },
    { name: "absentCount", label: "Number of Absent", type: "number", required: true },
    { name: "leaveCount", label: "Number of Leave", type: "number", required: true },
    { name: "newFoodInnovation", label: "New Innovations Food", type: "text", required: false },
    { name: "newDrinkInnovation", label: "New Innovation Drinks", type: "text", required: false },
  ];

  return (
    <ReportFormTemplate
      reportTitle="Daily Kitchen Report"
      fields={fields}
      fileName="KitchenReport"
    />
  );
};

export default KitchenReportForm;
