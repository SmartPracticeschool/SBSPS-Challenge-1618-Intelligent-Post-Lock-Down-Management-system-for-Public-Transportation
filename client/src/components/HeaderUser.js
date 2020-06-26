import React from 'react';
import { Layout, Menu } from 'antd';
// import {SettingOutlined} from '@ant-design/icons';
import './HeaderUSer.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const { Header} = Layout;
const { SubMenu } = Menu;

export const HeaderUser=()=>{
    return (
        <Layout className="layout">
    <Header>
      {/* <div className="logo" /> */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/userDashboard">User DashBoard</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/busBooking">Bus Booking</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/eRickBooking">Erick Booking</Link></Menu.Item>
        <SubMenu  title="Reviews">
          <Menu.ItemGroup >
            <Menu.Item key="setting:1"><Link to="/checkReviews">Check Reviews</Link></Menu.Item>
            <Menu.Item key="setting:2"><Link to="/giveReview">Give Review</Link></Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </Header>
    </Layout>
    )
}

// icon={<SettingOutlined />}
// 
