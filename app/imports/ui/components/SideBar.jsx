import React, { useState } from 'react';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const onClick = (e) => navigate(e.key);
  return (
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
  );
};
export default SideBar;
