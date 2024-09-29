import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add from '../../assets/plus-icon.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
   <Link to={'/addproduct'} style={{textDecoration:"none"}}>
   
      <div className="sidebar-item">
        <img src={add} alt="" />
        <p>Add Product</p>
      </div>
      </Link>

      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
   
   <div className="sidebar-item">
    
     <p>List Product</p>
   </div>
   </Link>

    </div>
  )
}

export default Sidebar