import React, { useState } from 'react';
import '../../styles/HomeMedic.css';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';
import SideBar from '../../components/SideBar';

const { Content, Footer, Sider } = Layout;

const HomeMedic = () => (
  <Layout>
    <SideBar />
    <Content>
      <Card title="Profilo">
        Tette
      </Card>
    </Content>
  </Layout>
);
export default HomeMedic;
