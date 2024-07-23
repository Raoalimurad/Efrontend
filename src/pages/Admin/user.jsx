import React from 'react'
import Layout from '../../components/Layout/layout'
import AdminPanel from '../../components/Layout/AdminMenu'

const User = () => {
  return (
    <div>
        <Layout>
       <div className="row  users">
        <div className="col-md-3">
        <AdminPanel/>
        </div>
        <div className="col-md-9">
            <h4>All user</h4>
        </div>
       </div>
        </Layout>
        </div>
  )
}

export default User