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
import { Breadcrumb, Layout, Menu, theme, Select, Space } from 'antd';
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
    // const { email, password } = doc;
    // let { birthday } = doc;
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
    Meteor.call('createUserAccount', doc, (err, result) => {
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
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="Indirizzo E-Mail" />
                <TextField name="password" placeholder="Password" type="password" />
                <TextField name="name" placeholder="Nome" />
                <TextField name="surname" placeholder="Cognome" />
                <TextField name="phone" placeholder="+39 000 000 0000" />
                <TextField name="birthday" placeholder="DD/MM/YYYY" />
                <TextField name="birthplace" placeholder="Comune di Nascita" />
                <Space wrap style={{marginBottom: 10}}>
                  <Select
                    defaultValue="patient"
                    style={{
                      width: 120
                    }}
                    options={[
                      {
                        value: "medic",
                        label: "Medico"
                      },
                      {
                        value: "patient",
                        label: "Paziente"
                      },
                    ]}
                  />
                </Space>
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Errore: </Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
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
