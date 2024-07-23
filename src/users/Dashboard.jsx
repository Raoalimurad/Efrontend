import React from 'react'
import Layout from '../components/Layout/layout'
import { useAuth } from '../Context/auth'
import UserPanel from '../components/Layout/UserMenu'

const Dashboard = () => {
  const [auth,setAuth] = useAuth()
  return (
    <Layout>
    <div className="container-fluid dashborad">
      <div className="row">
          <div className="col-md-3">
                 <UserPanel/>
          </div>
          <div className="col-md-9">
              <h3> your Profile</h3>
              <div className="user-info">
                <h3>  Name : {auth?.user?.name}</h3>
                <h3>  Email : {auth?.user?.email}</h3>
               
             </div>
          </div>
      </div>
    </div>
   </Layout>
  )
}

export default Dashboard
