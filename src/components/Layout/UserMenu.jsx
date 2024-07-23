import React from 'react';
import { NavLink } from 'react-router-dom';


const UserPanel = () => (
  <div>

    <h4>Dashborad</h4>
    <ul className="list-group">
      <NavLink to="/dashboard/user/Profile" className="list-group-item   items" aria-current="true">
        Profile
      </NavLink>
      <NavLink to="/dashboard/user/orders" className="list-group-item items">
        Orders
      </NavLink>
    </ul>
  </div>
);

export default UserPanel;
