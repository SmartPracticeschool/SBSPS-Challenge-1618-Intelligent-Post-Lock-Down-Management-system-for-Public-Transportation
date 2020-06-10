import React from 'react';
import { NavLink } from 'react-router-dom';
export const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="navbar navbar-expand-md navbar-dark bg-dark mb-4" role="navigation">
                    <p className="navbar-brand">Booking System</p>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <NavLink activeClassName='active' exact to='/'>Login</NavLink>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <NavLink activeClassName='active' to='/userRegister'>User Register</NavLink>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <NavLink activeClassName='active' to='/busRegister'>Bus Driver Register</NavLink>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <NavLink activeClassName='active' to='/rickRegister'>E-Rick Driver Register</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}