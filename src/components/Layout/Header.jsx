import React from 'react'
import {NavLink} from "react-router-dom"
import { FaStoreAlt } from "react-icons/fa";
import "../../App.css"
import { useAuth } from '../../Context/auth';
import SearchInput from '../SearchInput';
import useCategory from '../../Hooks/useCategory';
import { useSelector } from 'react-redux';

function Header() {
  const [auth,setAuth] = useAuth()
  const categories = useCategory()
  const {carts} = useSelector((state)=>state.allCart)

  const handleLogOut = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem("auth")
    
  }
  return (
    <div className='header'>
        <div>
            <h2>Ecomerce Store <FaStoreAlt /></h2>
        </div>
        <div>
          <SearchInput/>
        </div>
        <ul>
  <li><NavLink to="/">Home</NavLink></li>
  {/* <li><NavLink to="/about">About</NavLink></li> */}

  <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Categories
  </NavLink>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
  <NavLink className="dropdown-item" to={`/categories`}>
             All Categories
        </NavLink>
    {categories?.map((c) => (
      <li key={c._id}>
        <NavLink className="dropdown-item" to={`/category/${c.slug}`}>
          {c.name}
        </NavLink>
      </li>
    ))}
  </ul>
</li>















  <li><NavLink to="/contact">Contact</NavLink></li>
  {
    !auth.user ? (
      <>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        
      </>
    ) : (
      <>
         <li className="nav-item dropdown">
    <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {auth?.user?.name}
    </NavLink>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" :"user"}`}>Dashboard</NavLink></li>
      <li><NavLink  className="dropdown-item" onClick={handleLogOut} to="/login">Logout</NavLink></li>
     
    </ul>
  </li>
      </>
    )
  }
 
 <li><NavLink to="/cart">Cart({carts.length})</NavLink></li>
</ul>

    </div>
  )
}

export default Header


