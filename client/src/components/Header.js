import React from 'react';
import { Layout, Menu } from 'antd';
// import {SettingOutlined} from '@ant-design/icons';
import './HeaderUSer.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';
const { Header} = Layout;
//const { SubMenu } = Menu;
export const HeaderStart=()=>{
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
        <Menu.Item key="/" ><Link  exact to='/'>Login</Link></Menu.Item>
        <Menu.Item key="/userRegister" ><Link  to='/userRegister'>User Register</Link></Menu.Item>
        <Menu.Item key="/busRegister" ><Link  to='/busRegister'>Bus Driver Register</Link></Menu.Item>
        <Menu.Item key="/rickRegister" ><Link  to='/rickRegister'>Bus Driver Register</Link></Menu.Item>
      </Menu>
    </Header>
    </Layout>
    )
}

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// export const Header = () => {
//     return (
//         <div>
//             <nav className="navbar navbar-dark bg-dark">
//                 <div className="navbar navbar-expand-md navbar-dark bg-dark mb-4" role="navigation">
//                     <p className="navbar-brand">Smart Travel</p>
//                     <div className="collapse navbar-collapse" id="navbarCollapse">
//                         <NavLink activeClassName='active' exact to='/'>Login</NavLink>
//                         &nbsp;&nbsp;&nbsp;&nbsp;
//                         <NavLink activeClassName='active' to='/userRegister'>User Register</NavLink>
//                         &nbsp;&nbsp;&nbsp;&nbsp;
//                         <NavLink activeClassName='active' to='/busRegister'>Bus Driver Register</NavLink>
//                         &nbsp;&nbsp;&nbsp;&nbsp;
//                         <NavLink activeClassName='active' to='/rickRegister'>E-Rick Driver Register</NavLink>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// }