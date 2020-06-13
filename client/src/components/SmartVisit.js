import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const smartVisit = () => {
    return (
        <div>
            smartVisit DASHBOARD

            <br />

            <br />
         NavLink (exact) check reviews of the place you wanna visit (CheckReview.js)
            <p><Link to="/checkReviews">Temp link to check Review component</Link></p>
            <br />
         NavLink (exact) give reviews of the place you have visited  (GiveReview.js)
            <p><Link to="/giveReview">Temp link to give Review component</Link></p>
            <br />

            <div>
                chosen component will be rendered here innstead of opening a new component for a while.
            </div>
        </div>
    )
}