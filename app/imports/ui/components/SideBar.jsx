import React, { useState } from 'react';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const getAccountSidebarElements = role => {
  switch (role) {
  case 'medic':
  {
    const items = [
      getItem('Profilo', '/medic/home', <UserOutlined />),
      getItem('Pazienti', 'sub1', <FolderOpenOutlined />, [
        getItem('Pazienti Seguiti', '/medic/assistedpatientslist', <TeamOutlined />),
        getItem('Elenco Pazienti', '/medic/patientslist', <UsergroupAddOutlined />),
      ]),
      getItem('Admin', 'sub2', <ToolOutlined />, [
        getItem('Elenco Medici', '/medic/admin/medicslist', <FileOutlined />),
        getItem('Elenco Pazienti', '/medic/admin/patientslist', <FileOutlined />),
      ]),
    ];
    const style = {
      backgroundColor: '#ac0606',
      textColor: '#ffffff',
    };
    return { items: items, style: style };
  }
  case 'patient':
  {
    const items = [
      getItem('Profilo', '/patient/home', <UserOutlined />),
      getItem('Storici', 'sub1', <FolderOpenOutlined />, [
        getItem('Storico FoG', '/patient/fogepisodeshistory', <TeamOutlined />),
        getItem('Storico Terapie', '/patient/therapieshistory', <UsergroupAddOutlined />),
      ]),
    ];
    const style = {
      backgroundColor: '#002eb8',
      textColor: '#ffffff',
    };
    return { items: items, style: style };
  }
  default:
  {
    return false;
  }
  }
};

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onClick = (e) => navigate(e.key);
  const style = getAccountSidebarElements(localStorage.getItem('role')).style;
  const items = getAccountSidebarElements(localStorage.getItem('role')).items;
  return (
    <Sider collapsible collapsed={collapsed} style={{ background: style.backgroundColor }} onCollapse={(value) => setCollapsed(value)}>
      <div
        style={{
          height: 32,
          margin: 16,
        }}
      />
      <Menu defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: style.backgroundColor, color: style.textColor }} onClick={onClick} />
    </Sider>
  );
};
export default SideBar;
