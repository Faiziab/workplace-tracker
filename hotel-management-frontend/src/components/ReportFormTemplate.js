import React from "react";
import { Form, Input, Button, message } from "antd";
import * as XLSX from "xlsx";

const ReportFormTemplate = ({ reportTitle, fields, fileName }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Create a worksheet from form data
    const wsData = [Object.values(values)];
    const ws = XLSX.utils.aoa_to_sheet([Object.keys(values), ...wsData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, reportTitle);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    message.success(`${reportTitle} saved successfully!`);
    form.resetFields();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{reportTitle}</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {fields.map(({ name, label, type, required }) => (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={[{ required, message: "This field is required" }]}
          >
            {type === "number" ? (
              <Input type="number" min="0" />
            ) : type === "date" ? (
              <Input type="date" />
            ) : (
              <Input.TextArea maxLength={255} />
            )}
          </Form.Item>
        ))}
        <Button type="primary" htmlType="submit">
          Save Report
        </Button>
      </Form>
    </div>
  );
};

export default ReportFormTemplate;
