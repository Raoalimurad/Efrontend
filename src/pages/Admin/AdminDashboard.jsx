import React from 'react'
import Layout from '../../components/Layout/layout'
import AdminPanel from '../../components/Layout/AdminMenu'
import { useAuth } from '../../Context/auth'

function AdminDashboard() {
    const [auth,setAuth] = useAuth()
  return (
    <Layout>
    <div className="dashborad">
        <div className="items">
            <div className='adminPanel'>
              <AdminPanel/>
            </div>
            <div class='userDetails'>
    <div class="user-info">
      <h2>Admin Information</h2>
        <div class="user-row">
            <div class="user-label">Name:</div>
            <div class="user-data">{auth?.user?.name}</div>
        </div>
        <div class="user-row">
            <div class="user-label">Email:</div>
            <div class="user-data">{auth?.user?.email}</div>
        </div>
        <div class="user-row">
            <div class="user-label">Address:</div>
            <div class="user-data">{auth?.user?.address}</div>
        </div>
        <div class="user-row">
            <div class="user-label">Phone:</div>
            <div class="user-data">{auth?.user?.phone}</div>
        </div>
    </div>
</div>

        </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard