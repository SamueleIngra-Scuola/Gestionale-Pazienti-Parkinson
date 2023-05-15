import React, { useState } from 'react';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Navigate } from 'react-router';

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
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = (e) => <Navigate to={e} />;
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
            PROFILO
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
export default SideBar;
