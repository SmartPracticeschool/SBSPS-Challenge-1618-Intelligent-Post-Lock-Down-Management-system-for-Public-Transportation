import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { HeaderUser } from './HeaderUser';
import RedZone from './RedZone';

export const UserDashboard = () => {
    return (
        <>

            <div>
                <HeaderUser />
            </div>
            <div>

                <RedZone />
            </div>
        </>
    )
}