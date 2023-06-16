import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import './header.component.css';

const Header: React.FC = () => {
  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      Star War APIs
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        className="menu"
      >
        <Menu.Item key="1">
          <Link to="/characters">Characters</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/movies">Movies</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
