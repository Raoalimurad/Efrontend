import React, { useState } from 'react'
import Layout from '../../components/Layout/layout'
import {useNavigate,useLocation} from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/auth';
const Login = () => {
    const [auth,setAuth] = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
   
    const getLogin = async () => {
        try {
            const response = await axios.post(`https://ebackend-kappa.vercel.app/api/login`, {
                 email, password, 
            })
            if( response && response.data.success){
                toast.success("user signup successfully")
                setAuth({
                    ...auth,
                    user:response.data.user,
                    token:response.data.token
                })
                localStorage.setItem("auth",JSON.stringify(response.data))
                navigate(location.state || "/")
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong ")
        }

    }
  
    return (
        <div>
            <Layout>
                <div className="main1">
                <div className='register'>
                    <h2 className='heading'>Login</h2>
                    <div className="inputs">
                        
                        <div>
                            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div>
                            <button onClick={getLogin}>Login</button>
                            <p className='forgetPass' onClick={()=>navigate("/forgotPass")}>forgot password?</p>
                        </div>
                    </div>
                </div>
                </div>
            </Layout>
        </div>
    )
}

export default Login