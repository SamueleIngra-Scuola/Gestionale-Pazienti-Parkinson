import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Button, Form, Input, DatePicker } from 'antd';
import { Alert } from 'react-bootstrap';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToHome, setRedirect] = useState(false);
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate('/signin');
  };

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, name, surname, prefix, phone, birthplace, role } = doc;
    let { birthday } = doc;
    birthday = dayjs.utc(birthday).format();
    const account = {
      username: email,
      password: password,
      name: name,
      surname: surname,
      phone: `+${prefix}${phone}`,
      birthday: birthday,
      birthplace: birthplace,
      role: role,
    };

    Meteor.call('createUserAccount', account, (err, result) => {
      if (err) {
        setError(err.reason);
      } else {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('role', result.role);
        setRedirect(true);
        // window.location.reload(false);
        // eslint-disable-next-line no-param-reassign
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
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
  if (redirectToHome) {
    navigate('/panel/home');
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
        role: 'patient',
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
        name="birthplace"
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
        <Button type="link" onClick={gotoLogin} style={{ marginLeft: 5 }}>
          Hai già un account? Accedi qui
        </Button>
      </Form.Item>
      {error === '' ? (
        ''
      ) : (
        <Alert variant="danger">
          <Alert.Heading>Errore: </Alert.Heading>
          {error}
        </Alert>
      )}
    </Form>

  );
};

export default SignUp;
