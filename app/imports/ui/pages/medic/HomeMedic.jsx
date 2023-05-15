import React from 'react';
import { useState } from 'react';
import '../../styles/HomeMedic.css';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

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
  getItem('Profilo', '2', <UserOutlined />),
  getItem('Medico', 'sub1', <FolderOpenOutlined />, [
    getItem('Pazienti Seguiti', '3', <TeamOutlined />),
    getItem('Elenco Pazienti', '4', <UsergroupAddOutlined />),
  ]),
  getItem('Admin', 'sub2', <ToolOutlined />, [
    getItem('Elenco Medici', '5', <FileOutlined />),
  ]),
];
const HomeMedic = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{background: '#ac0606'}}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: '#ff0000',
          }}
        />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} style={{background: '#ac0606', color: '#ffffff',}}/>
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
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Bill is a cat.
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
export default HomeMedic;
