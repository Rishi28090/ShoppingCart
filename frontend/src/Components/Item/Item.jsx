import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

 const Item = ({productId, name, image, new_price, old_price}) => {
  return (
    <div className='item'>
        <Link to={`/product/${productId}`}><img onClick={window.scrollTo(0,0)} src={image} alt="" />
        </Link> 
        <p>{name}</p>
        <div className='item-prices'>
            <div className="item-price-new">
                ₹ {new_price}
            </div>
            <div className="item-price-old">
                ₹ {old_price}
            </div>
        </div>
    </div>
  )
}

export default  Item
