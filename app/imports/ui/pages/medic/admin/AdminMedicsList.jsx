import React, { useState } from 'react';
import '../../../styles/HomeMedic.css';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';
import SideBar from '../../../components/SideBar';

const { Content, Footer, Sider } = Layout;

const AdminMedicsList = () => (
  <Layout>
    <SideBar />
    <Content>
      <Card title="Lista Medici">
        Placeholder
      </Card>
    </Content>
  </Layout>
);
export default AdminMedicsList;
