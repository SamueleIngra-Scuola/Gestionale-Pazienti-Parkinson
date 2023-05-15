import React, { useState } from 'react';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const Therapy = () => {
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
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout className="site-layout">
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
export default Therapy;
