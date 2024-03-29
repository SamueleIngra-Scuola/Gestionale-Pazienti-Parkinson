import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import '../../styles/HomeMedic.css';
import { Layout, Button, Card, Space, Table, Modal, Popconfirm } from 'antd';
import SideBar from '../../components/SideBar';

const dayjs = require('dayjs');

const { Content } = Layout;

const PatientsList = () => {
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
  const getPatientsList = () => {
    Meteor.call('getPatientsList', (_, result) => {
      setPatientsList(result); // Store the fetched data in the state variable
    });
  };

  useEffect(() => {
    getPatientsList(); // Fetch the patient list when the component mounts
  }, []);

  const assistPatient = (medicId, patientId) => {
    Meteor.call('assistPatient', { medicId: medicId, patientId: patientId }, (_, result) => result);
    setOpen(false);
    getPatientsList();
  };

  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Lista Pazienti">
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
                    <Button key="assist" type="primary" ghost>
                      <Popconfirm title="Sei sicuro di voler seguire questo paziente?" onConfirm={() => assistPatient(personalId, patient._id)}>
                        Segui
                      </Popconfirm>
                    </Button>
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
                        <Button key="assist" type="primary">
                          <Popconfirm title="Sei sicuro di voler seguire questo paziente?" onConfirm={() => assistPatient(personalId, modalTask._id)}>
                            Segui
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
export default PatientsList;
