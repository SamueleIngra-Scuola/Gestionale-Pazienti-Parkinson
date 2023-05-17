import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import '../../styles/SignIn.css';
/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [patientRedirect, setPatientRedirect] = useState(false);
  const [medicRedirect, setMedicRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    /* Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    }); */
    Meteor.call('loginUserAccount', doc, (err, result) => {
      if (err) {
        setError(err.reason);
      } else if (result.role === 'medic') {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('role', result.role);
        localStorage.getItem('user');
        localStorage.getItem('role');
        setMedicRedirect(true);
        window.location.reload(false);
      } else if (result.role === 'patient') {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('role', result.role);
        localStorage.getItem('user');
        localStorage.getItem('role');
        setPatientRedirect(true);
        window.location.reload(false);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };
  if (patientRedirect) {
    return (<Navigate to="/" />);
  }
  if (medicRedirect) {
    return (<Navigate to="/" />);
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={submit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Oppure <a href="">registrati ora!</a>
      </Form.Item>
    </Form>
  );
};
export default SignIn;
