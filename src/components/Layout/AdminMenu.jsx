import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => (
  <div>
    <h4>Admin Panel</h4>
    <ul className="list-group">
      <NavLink to="/dashboard/admin/create-category" className="list-group-item   items" aria-current="true">
        Create Category
      </NavLink>
      <NavLink to="/dashboard/admin/create-product" className="list-group-item items">
        Create Product
      </NavLink>
      <NavLink to="/dashboard/admin/products" className="list-group-item items">
         Products
      </NavLink>
      <NavLink to="/dashboard/admin/user" className="list-group-item  items">
        Users
      </NavLink>
      <NavLink to="/dashboard/admin/orders" className="list-group-item  items">
        Orders
      </NavLink>
    </ul>
  </div>
);

export default AdminPanel;
