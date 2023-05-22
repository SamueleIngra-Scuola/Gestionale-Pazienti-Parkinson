import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import '../../../styles/HomeMedic.css';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';
import { isNil } from 'lodash';
import SideBar from '../../../components/SideBar';

const dayjs = require('dayjs');

const { Content, Footer, Sider } = Layout;

const AdminPatientsList = () => {
  const [patientsList, setPatientsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTask, setModalTaskId] = useState('');
  const showModal = (record) => {
    setModalTaskId(record);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const getPatientsList = (condition) => {
    Meteor.call('getPatientsList', condition, (_, result) => {
      setPatientsList(result); // Store the fetched data in the state variable
    });
  };

  const unassistPatient = (medicId, patientId) => {
    Meteor.call('unassistPatient', { medicId: medicId, patientId: patientId }, (_, result) => result);
    setOpen(false);
    getPatientsList(true);
  };

  useEffect(() => {
    getPatientsList(true); // Fetch the patient list when the component mounts
  }, []);

  const deleteUserAccount = (accountId) => {
    Meteor.call('deleteUserAccount', accountId, () => {
      setOpen(false);
      getPatientsList(true); // Store the fetched data in the state variable
    });
  };
  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Lista Pazienti (ADMIN)">
          <Table
            columns={[
              {
                title: 'E-Mail',
                dataIndex: 'username',
              },
              {
                title: 'Nome',
                dataIndex: 'name',
              },
              {
                title: 'Cognome',
                dataIndex: 'surname',
              },
              {
                align: 'right',
                render: (_, patient) => (
                  <Space size="middle">
                    <Button type="primary" onClick={() => showModal(patient)}>
                      Dettagli
                    </Button>
                    <Modal
                      className="Modal"
                      open={open}
                      title={`${modalTask.name} ${modalTask.surname}`}
                      onCancel={handleCancel}
                      centered
                      footer={[
                        <Button type="text" key="back" onClick={handleCancel}>
                          Indietro
                        </Button>,
                        <Button key="forceleavepatient" type="primary" danger ghost>
                          <Popconfirm title="Sicuro di voler abbandonare questo paziente?" onConfirm={() => unassistPatient(modalTask.assistedBy, modalTask._id)}>
                            Force-Leave
                          </Popconfirm>
                        </Button>,
                        <Button key="deleteaccount" type="primary" danger ghost>
                          <Popconfirm title="Sicuro di voler eliminare questo account?" onConfirm={() => deleteUserAccount(modalTask._id)}>
                            Elimina Account
                          </Popconfirm>
                        </Button>,
                      ]}
                    >
                      <p>ID: {modalTask._id}</p>
                      <p>E-Mail: {modalTask.username}</p>
                      <p>Nome: {modalTask.name} {modalTask.surname}</p>
                      <p>Data di Nascita: {dayjs(modalTask.birthday).format('DD/MM/YYYY')}</p>
                      <p>Comune di Nascita: {modalTask.birthplace}</p>
                      <p>Numero di Telefono: {modalTask.phone}</p>
                      <p>Seguito Da: {modalTask.assistedBy}</p>
                      <p>Auth Token: {modalTask.authToken}</p>

                    </Modal>
                  </Space>
                ),
              },
            ]}
            dataSource={patientsList}
          />
        </Card>
      </Content>
    </Layout>
  );
};
export default AdminPatientsList;
