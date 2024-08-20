import React from 'react'
import './Navbar.css'
import clothlogo from  '../../assets/clothicon.png'
import navprofile from '../../assets/nav-profile.svg'


const Navbar = () => {
  return (
    <div className='navbar'>

        <img src={clothlogo} alt="" className="nav-logo" />
        <h1>AdminPanel!</h1>
       
    </div>
  )
}

export default Navbar