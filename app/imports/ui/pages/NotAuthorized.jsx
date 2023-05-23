import { Button } from 'antd';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */

const NotAuthorized = () => {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/signin');
  };
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={4} className="text-center">
          <h2>
            <p>Not Authorized</p>
            <Button onClick={gotoHome}>
              Accedi
            </Button>
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default NotAuthorized;
