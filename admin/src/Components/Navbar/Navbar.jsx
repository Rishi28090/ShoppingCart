import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/clothicon.png'

const Navbar = () => {
  return (
    <div className='navbar'>
   <img src={nav_logo} alt="" className="nav-logo" />
   <h1>Admin Panel!</h1>

    </div>
  )
}

export default Navbar