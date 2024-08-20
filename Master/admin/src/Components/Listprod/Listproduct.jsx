import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../assets/cross_icon.png'

const Listproduct = () => {

  const [allproducts,setAllProducts] =useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => {
      setAllProducts(data)
    })
  }

  useEffect(() =>{
    fetchInfo();
  },[])
   
  return (
    <div className='listproduct'>
      <h1>ALL Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
            <div className="listallproduct">
        <hr />
        {allproducts.map((product,index) => {
              return <div key={index}  className="listproduct-format-main listproduct-format">
                    <img src={product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category}</p>
                    <img  className='listproduct-remove-icon'  src={cross_icon} alt="" />
              </div>
        })}
      </div>
    </div>
  )
}

export default Listproduct