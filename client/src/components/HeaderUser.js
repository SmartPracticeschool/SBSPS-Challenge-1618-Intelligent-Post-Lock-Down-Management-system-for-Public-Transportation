import React from 'react';
import { Layout, Menu } from 'antd';
// import {SettingOutlined} from '@ant-design/icons';
import './HeaderUSer.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const { Header} = Layout;
const { SubMenu } = Menu;
export const HeaderUser=()=>{
  let href=window.location.href.split('/');
  href=href[3];
    return (
        <Layout className="layout">
    <Header>
      {/* <div className="logo" /> */}
      {/* {
            href=window.location.href.split('/');
            href=href[3];
      } */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/'+href]} selectedKeys={['/'+href]} >
        <Menu.Item key="/userDashboard" ><Link to="/userDashboard">User DashBoard</Link></Menu.Item>
        <Menu.Item key="/busBooking" ><Link to="/busBooking">Bus Booking</Link></Menu.Item>
        <Menu.Item key="/eRickBooking" ><Link to="/eRickBooking">Erick Booking</Link></Menu.Item>
        <SubMenu  title="Reviews">
          <Menu.ItemGroup >
            <Menu.Item key="/checkReviews"><Link to="/checkReviews">Check Reviews</Link></Menu.Item>
            <Menu.Item key="/giveReview"><Link to="/giveReview">Give Review</Link></Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </Header>
    </Layout>
    )
}

// icon={<SettingOutlined />}
// 
