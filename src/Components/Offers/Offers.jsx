import React from 'react'
import './offer.css'
import exculsives_image from "../Assets/exclusive_image.png"

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h2>Exclusive</h2>
            <h1>OFFERS For you</h1>
            <p>BEST SELLER PRODUCTS</p>
            <button>CHECK NOW</button>
        </div>
            <div className="offer-right">
                    <img src={exculsives_image} alt="" />
            </div>
    </div>
  )
}
export default  Offers