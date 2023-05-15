import React, { useState } from 'react';
import '../../styles/HomeMedic.css';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Navigate } from 'react-router';
import SideBar from '../../components/SideBar';

const HomeMedic = () => (
  <SideBar>
    <div>
      Profilo
    </div>
  </SideBar>
);
export default HomeMedic;
