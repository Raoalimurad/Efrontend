import React from 'react'
import { CgSpinner } from 'react-icons/cg';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

const Spinner = ({path = "login"}) => {
    const [count,setCount] = useState(3)
    const navigate = useNavigate()
    const Location = useLocation()
    useEffect(()=>{
        const interval = setInterval(()=>{
           setCount((preValue)=> --preValue)
        },1000)
        count === 0 && navigate(`/${path}`,{
            state:Location.pathname
        })
        return() => clearInterval(interval)
    },[count,navigate,Location,path])
  return (
    <div  className='spinner-container'>
        <h1>Redirecting you in {count} secound</h1>
        <CgSpinner className="spinner-icon" />
    </div>
  )
}

export default Spinner