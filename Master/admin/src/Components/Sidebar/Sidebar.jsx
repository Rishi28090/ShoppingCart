import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct from '../../assets/plus-icon.png'
import listprod from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
<Link to={'/addproduct'} style={{textDecoration:"none"}}>

      <div className="sidebar_item">
        <img src={addproduct} alt="" />
        <p>ADD product</p>
      </div>
</Link>

<Link to={'/listproduct'} style={{textDecoration:"none"}}>

      <div className="sidebar_item">
        <img src={listprod} alt="" />
        <p>Product list</p>
      </div>
</Link>

    </div>
  )
}

export default Sidebar