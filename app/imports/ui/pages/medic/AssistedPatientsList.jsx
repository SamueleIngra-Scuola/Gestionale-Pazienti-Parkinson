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
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';

const dayjs = require('dayjs');

const { Content, Footer, Sider } = Layout;

const AssistedPatientsList = () => {
  const navigate = useNavigate();
  const personalId = JSON.parse(localStorage.getItem('user'))._id;
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
  const getAssistedPatientsList = (medicId) => {
    Meteor.call('getAssistedPatientsList', { medicId: medicId }, (_, result) => {
      setPatientsList(result); // Store the fetched data in the state variable
    });
  };

  const openTherapiesHistory = (patient) => {
    console.log(patient);
    navigate('/patient/therapieshistory', {
      state: {
        patient: patient,
      },
    });
  };

  const openFogEpisodesHistory = (patient) => {
    console.log(patient);
    navigate('/patient/fogepisodeshistory', {
      state: {
        patient: patient,
      },
    });
  };

  useEffect(() => {
    getAssistedPatientsList(JSON.parse(localStorage.getItem('user'))._id); // Fetch the patient list when the component mounts
  }, []);

  const unassistPatient = (medicId, patientId) => {
    Meteor.call('unassistPatient', { medicId: medicId, patientId: patientId }, (_, result) => result);
    setOpen(false);
    getAssistedPatientsList(personalId);
  };

  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Pazienti Seguiti">
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
                    <Button key="foghistory" type="primary" onClick={() => openFogEpisodesHistory(patient)} ghost>
                      Storico FoG
                    </Button>
                    <Button key="therapyhistory" type="primary" onClick={() => openTherapiesHistory(patient)} ghost>
                      Storico Terapie
                    </Button>
                    <Button key="details" type="primary" onClick={() => showModal(patient)}>
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
                        <Button key="leavepatient" type="primary" danger ghost>
                          <Popconfirm title="Sicuro di voler abbandonare questo paziente?" onConfirm={() => unassistPatient(personalId, modalTask._id)}>
                            Abbandona
                          </Popconfirm>
                        </Button>,
                      ]}
                    >
                      <p>E-Mail: {modalTask.username}</p>
                      <p>Nome: {modalTask.name} {modalTask.surname}</p>
                      <p>Data di Nascita: {dayjs(modalTask.birthday).format('DD/MM/YYYY')}</p>
                      <p>Comune di Nascita: {modalTask.birthplace}</p>
                      <p>Numero di Telefono: {modalTask.phone}</p>

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
export default AssistedPatientsList;
