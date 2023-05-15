import React, { useState } from 'react';

import '../../styles/HomeMedic.css';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
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
const AssistedPatientsList = () => {
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
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: '#ac0606' }}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: '#ff0000',
          }}
        />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: '#ac0606', color: '#ffffff' }} onClick={onClick} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: '#ac0606',
          }}
        />
        <Content
          style={{
            margin: '16px 16px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
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
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AssistedPatientsList;
