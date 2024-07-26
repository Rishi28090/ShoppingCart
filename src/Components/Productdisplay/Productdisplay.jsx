import React from 'react'
import './Productdisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'

 const Productdisplay = (props) => {
    const {product} = props;
  return (
    <div className='productdisplay'>
        <div className="pleft">
            <div className="pdimglist">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="pd-img">
                <img className='pd-main-img'  src={product.image} alt="" />
            </div>
        </div>
        <div className="pright">
            <h1>{product.name}</h1>
            <div className="pd-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>

        </div>
    </div>
  )
}

export  default Productdisplay
