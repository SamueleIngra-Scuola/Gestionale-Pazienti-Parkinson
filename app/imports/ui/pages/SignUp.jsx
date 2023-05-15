import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
// import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Select, Space, Button, Form, Input, DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

// import { dayjs } from 'dayjs';

// eslint-disable-next-line no-var
// var utc = require('dayjs/plugin/utc');

// dayjs.extend(utc);

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {

  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    name: String,
    surname: String,
    phone: String,
    birthday: Date,
    birthplace: String,
    role: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    // eslint-disable-next-line global-require
    const utc = require('dayjs/plugin/utc');
    Dayjs.extend(utc);

    // const { email, password } = doc;
    console.log(doc);
    let { birthday } = doc;
    birthday = Dayjs.utc(birthday, 'DD/MM/YYYY').format(); // 2019-03-06T00:00:00Z
    console.log(birthday)
    /* Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    }); */
    // birthday = dayjs.utc(birthday).format('DD/MM/YYYY');
    // console.log(birthday);
    Meteor.call('createUserAccount', doc, birthday, (err, result) => {
      if (err) {
        setError(err.reason);
      } else {
        localStorage.setItem('user', JSON.stringify(result));
        window.location.reload(false);
        setRedirectToRef(true);
        // eslint-disable-next-line no-param-reassign
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  const { Option } = Select;

  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="39">+39</Option>
        <Option value="378">+378</Option>
      </Select>
    </Form.Item>
  );
  return (
    <Form
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...formItemLayout}
      form={form}
      name="register"
      initialValues={{
        prefix: '39',
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={data => submit(data)}
      scrollToFirstError
    >

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="Nome"
        rules={[
          {
            type: 'name',
            message: 'Inserire un nome valido!',
          },
          {
            required: true,
            message: 'Inserire un nome valido!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="surname"
        label="Cognome"
        rules={[
          {
            type: 'surname',
            message: 'Inserire un cognome valido!',
          },
          {
            required: true,
            message: 'Inserire un cognome valido!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Data di Nascita"
        rules={[
          {
            type: 'birthday',
            message: 'The input is not valid date',
          },
          {
            required: true,
            message: 'Per favore inserisci la tua data di nascita',
          },
        ]}
      >
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item
        name="birhplace"
        label="Comune di Nascita"
        rules={[
          {
            required: true,
            message: 'Inserisci il comune dove sei nato',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="role"
        label="Tipo Account:"
        initialValues="patient"
        rules={[
          {
            required: true,
            message: 'Inserire il tipo di account!',
          },
        ]}
      >
        <Select
          style={{
            width: 120,
          }}
          options={[
            {
              value: 'patient',
              label: 'Paziente',
            },
            {
              value: 'medic',
              label: 'Medico',
            },
          ]}
        />
      </Form.Item>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Registrati
        </Button>
        <Button type="link" htmlType="submit" style={{ marginLeft: 5 }}>
          Hai già un account? Accedi qui
        </Button>
      </Form.Item>
    </Form>
  );
};
/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
