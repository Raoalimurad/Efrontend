import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/layout'
import UserPanel from '../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../Context/auth'
import toast from 'react-hot-toast'


const Profile = () => {
const [auth,setAuth] = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  const getUpdate = async () => {
    try {
        const {data} = await axios.put(`https://ebackend-kappa.vercel.app/api/profile`, {
            name, email, password, address, phone,
        },{
          headers: {
            Authorization: auth?.token,
          },
        })
       if(data?.error){
        toast.error(data?.error)
       }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls =  localStorage.getItem("auth");
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success("profile updated successfully ")
       }
    } catch (error) {
        console.log(error)
        toast.error("something went wrong ")
    }
  
}
useEffect(()=>{
const {name,email,phone,address} = auth.user
setName(name)
setEmail(email)
setPhone(phone)
setAddress(address)

},[auth?.user])

  return (
    <Layout>
    <div className="container-fluid dashborad">
      <div className="row">
          <div className="col-md-3">
                 <UserPanel/>
          </div>
          <div className="col-md-9">
             
                <div className='register'>
                    <h2 className='heading'>Update</h2>
                    <div className="inputs">
                        <div>
                            <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}  disabled/>
                        </div>
                        <div>
                            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder='Enter your address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder='Enter your mobile number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <button onClick={getUpdate}>Update</button>
                        </div>
                    </div>
                </div>
                
          </div>
      </div>
    </div>
   </Layout>
  )
}

export default Profile