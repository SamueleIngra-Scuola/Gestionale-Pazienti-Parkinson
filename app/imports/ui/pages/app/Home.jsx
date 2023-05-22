import React, { useState } from 'react';
import '../../styles/HomeMedic.css';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import utc from 'dayjs/plugin/utc';
import SideBar from '../../components/SideBar';

const dayjs = require('dayjs');

dayjs.extend(utc);

const { Content, Footer, Sider } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/signout');
  };
  const { name, surname, username, phone, birthday, birthplace } = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Profilo">
          <h1>Ciao, {name} {surname}</h1>
          <h3>Informazioni Profilo:</h3>
          <p>E-Mail: {username}</p>
          <p>Numero di Telefono: {phone}</p>
          <p>Data di Nascita: {dayjs(birthday).format('DD/MM/YYYY')}</p>
          <p>Comune di Nascita: {birthplace}</p>
          <p>Ruolo Account: {localStorage.getItem('role')}</p>
          <Button key="logout" type="primary" danger ghost>
            <Popconfirm title="Sicuro di voler effettuare il logout?" onConfirm={logout}>
              Log-out
            </Popconfirm>
          </Button>
        </Card>
      </Content>
    </Layout>
  );

};
export default Home;
