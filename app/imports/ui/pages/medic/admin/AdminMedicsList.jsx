import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import '../../../styles/HomeMedic.css';
import { Layout, Button, Card, Space, Table, Modal, Popconfirm } from 'antd';
import SideBar from '../../../components/SideBar';

const dayjs = require('dayjs');

const { Content } = Layout;

const AdminMedicList = () => {
  const [medicsList, setMedicsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTask, setModalTaskId] = useState('');
  const showModal = (record) => {
    setModalTaskId(record);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const getMedicsList = () => {
    Meteor.call('getMedicsList', (_, result) => {
      setMedicsList(result); // Store the fetched data in the state variable
    });
  };

  useEffect(() => {
    getMedicsList(); // Fetch the patient list when the component mounts
  }, []);

  const deleteUserAccount = (accountId) => {
    Meteor.call('deleteUserAccount', accountId, () => {
      setOpen(false);
      getMedicsList(); // Store the fetched data in the state variable
    });
  };

  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Lista Medici (ADMIN)">
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
                      <p>Auth Token: {modalTask.authToken}</p>

                    </Modal>
                  </Space>
                ),
              },
            ]}
            dataSource={medicsList}
          />
        </Card>
      </Content>
    </Layout>
  );
};
export default AdminMedicList;
