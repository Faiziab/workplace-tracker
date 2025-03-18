// src/components/Login.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Form as AntForm, Typography, Alert } from 'antd';
import * as Yup from 'yup';
import API from '../api';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Phone number is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await API.post("/api/login", values);
      setStatus({ success: response.data.message });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Decode JWT to extract role
      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1])); 
      console.log("Decoded token:", decodedToken); // Debug: check token payload
      localStorage.setItem("role", decodedToken.role);

      // Redirect based on role
      if (decodedToken.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

      console.log("Login successful, token:", response.data.token);
    } catch (error) {
      setStatus({ error: "Login failed. Please check your credentials." });
      console.error("Login error:", error.response ? error.response.data : error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '50px' }}>
      <Title level={2}>Login</Title>
      <Formik
        initialValues={{ phoneNumber: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, status }) => (
          <Form>
            {status && status.error && (
              <Alert
                message={status.error}
                type="error"
                style={{ marginBottom: '20px' }}
              />
            )}
            {status && status.success && (
              <Alert
                message={status.success}
                type="success"
                style={{ marginBottom: '20px' }}
              />
            )}
            <AntForm.Item
              label="Phone Number"
              validateStatus={
                errors.phoneNumber && touched.phoneNumber ? 'error' : ''
              }
              help={
                errors.phoneNumber && touched.phoneNumber
                  ? errors.phoneNumber
                  : null
              }
            >
              <Field name="phoneNumber">
                {({ field }) => (
                  <Input {...field} placeholder="Enter phone number" />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item
              label="Password"
              validateStatus={
                errors.password && touched.password ? 'error' : ''
              }
              help={
                errors.password && touched.password ? errors.password : null
              }
            >
              <Field name="password">
                {({ field }) => (
                  <Input.Password {...field} placeholder="Enter password" />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item>
              <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </AntForm.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
