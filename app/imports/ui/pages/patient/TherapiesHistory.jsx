import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import '../../styles/HomeMedic.css';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';
import SideBar from '../../components/SideBar';

const dayjs = require('dayjs');

const { Content, Footer, Sider } = Layout;

const TherapiesHistory = (patient) => {
  const { id } = patient ?? undefined;
  const personalId = id ?? JSON.parse(localStorage.getItem('user'))._id;
  const [therapiesHistory, setTherapiesHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTask, setModalTaskId] = useState('');
  const showModal = (record) => {
    setModalTaskId(record);
    setOpen(true);
  };
  const getTherapiesHistory = (patientId) => {
    Meteor.call('getTherapiesHistory', patientId, (_, result) => {
      setTherapiesHistory(result); // Store the fetched data in the state variable
    });
  };

  useEffect(() => {
    getTherapiesHistory(personalId); // Fetch the patient list when the component mounts
  }, []);

  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Storico Terapie">
          {localStorage.getItem('role') === 'medic'
            ? (
              <Button type="primary">
                Aggiungi Terapia
              </Button>
            )
            : ''}
          <Table
            columns={[
              {
                title: 'Medicinale',
                dataIndex: 'drug',
              },
              {
                title: 'Dosaggio',
                dataIndex: 'dosage',
              },
              {
                title: 'Data di Prescrizione',
                dataIndex: 'prescriptiondate',
              },
            ]}
            dataSource={therapiesHistory}
          />
        </Card>
      </Content>
    </Layout>
  );
};
export default TherapiesHistory;
