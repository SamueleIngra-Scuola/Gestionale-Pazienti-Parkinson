import React, { useState } from 'react';
import SideBar from '../../components/SideBar';
import '../../styles/HomeMedic.css';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Profilo', '/medic/home', <UserOutlined />),
  getItem('Medico', 'sub1', <FolderOpenOutlined />, [
    getItem('Pazienti Seguiti', '/medic/assistedpatientslist', <TeamOutlined />),
    getItem('Elenco Pazienti', '/medic/patientslist', <UsergroupAddOutlined />),
  ]),
  getItem('Admin', 'sub2', <ToolOutlined />, [
    getItem('Elenco Medici', '/medic/admin/mediclist', <FileOutlined />),
    getItem('Elenco Pazienti', '/medic/admin/patientlist', <FileOutlined />),
  ]),
];
const PatientsList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Pazienti Seguiti">
          <Table
            columns={[
              {
                title: 'Nome e cognome',
                dataIndex: 'name',
              },
              {
                align: 'right',
                render: () => (
                  <Space size="middle">
                    <Button type="primary" onClick={showModal}>
                      Dettagli
                    </Button>
                    <Modal
                      className="Modale"
                      open={open}
                      title="NOME PAZIENTE"
                      onCancel={handleCancel}
                      footer={[
                        <Button key="back" onClick={handleCancel}>
                          Indietro
                        </Button>,
                        <Button key="submit" type="primary">
                          Storico FoG
                        </Button>,
                        <Button key="submit" type="primary">
                          Storico Terapie
                        </Button>,
                        <Button key="back" style={{ color: 'white', background: 'red' }}>
                          <Popconfirm title="Sicuro di voler cancellare?" onConfirm={handleCancel}>
                            Abbandona
                          </Popconfirm>
                        </Button>,
                      ]}
                    >
                      <p>DETTAGLI PAZIENTE</p>
                    </Modal>
                  </Space>
                ),
              },
            ]}
            dataSource={[
              {
                key: '1',
                name: 'John Brown',
              },
              {
                key: '2',
                name: 'Jim Green',
              },
              {
                key: '3',
                name: 'Joe Black',
              },
            ]}
          />
        </Card>
      </Content>
    </Layout>
  );
};
export default PatientsList;
