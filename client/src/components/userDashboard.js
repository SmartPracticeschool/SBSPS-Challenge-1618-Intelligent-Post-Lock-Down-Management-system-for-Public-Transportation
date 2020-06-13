import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const UserDashboard = () => {
    return (
        <div>
            USER DASHBOARD
            
           <br/>
            -ABOUT
            <br/>
            -BOOK a BUS
            <p><Link to="/busBooking">Temp link to busBooking component</Link></p>
            <br/>
            -BOOK a eRick
            <p><Link to="/eRickBooking">Temp link to eRickBooking component</Link></p>
            <br/>
            -plan a SMART VISIT
            <p><Link to="/smartVisit">Temp link to smart Visit component</Link></p>
            <br/>
            
        </div>
    )
}