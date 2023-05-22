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
      getItem('Profilo', '/panel/home', <UserOutlined />),
      getItem('Pazienti', 'sub1', <FolderOpenOutlined />, [
        getItem('Pazienti Seguiti', '/panel/assistedpatientslist', <TeamOutlined />),
        getItem('Elenco Pazienti', '/panel/patientslist', <UsergroupAddOutlined />),
      ]),
      getItem('Admin', 'sub2', <ToolOutlined />, [
        getItem('Elenco Medici', '/panel/admin/medicslist', <FileOutlined />),
        getItem('Elenco Pazienti', '/panel/admin/patientslist', <FileOutlined />),
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
      getItem('Profilo', '/panel/home', <UserOutlined />),
      getItem('Storici', 'sub1', <FolderOpenOutlined />, [
        getItem('Storico FoG', '/panel/fogepisodeshistory', <TeamOutlined />),
        getItem('Storico Terapie', '/panel/therapieshistory', <UsergroupAddOutlined />),
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
