import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import '../../styles/SignIn.css';
import { Content } from 'antd/es/layout/layout';
/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirectToHome, setRedirect] = useState(false);
  const navigate = useNavigate();
  const gotoRegister = () => {
    navigate('/signup');
  };
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
      } else {
        console.log(localStorage.getItem('role'));
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('role', result.role);
        setRedirect(true);
        // window.location.reload(false);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };
  if (redirectToHome) {
    return <Navigate to="/panel/home" />;
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
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
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
      </Form.Item>
      <Content>
        Oppure
        <Button type="link" htmlType="submit" className="register-form-button" onClick={gotoRegister}>
          Registrati Ora!
        </Button>
      </Content>
    </Form>
  );
};
export default SignIn;
