import React, { useState } from 'react'
import Layout from '../../components/Layout/layout'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast';
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()
   
    const getRegister = async () => {
        try {
            const response = await axios.post(`https://ebackend-kappa.vercel.app/api/register`, {
                name, email, password, address, phone,answer
            })
            if( response && response.data.success){
                toast.success("user signup successfully")
                navigate("/login")
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
                    <h2 className='heading'>Register</h2>
                    <div className="inputs">
                        <div>
                            <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
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
                            <input type="text" placeholder='Enter your favourite sport' value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>
                        <div>
                            <button onClick={getRegister}>Register</button>
                        </div>
                    </div>
                </div>
                </div>
            </Layout>
        </div>
    )
}

export default Register