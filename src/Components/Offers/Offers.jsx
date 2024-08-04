import React from 'react'
import './offer.css'
import exculsives_image from "../Assets/exclusive_image.png"
import { Link } from 'react-router-dom'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>OFFERS For you</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <Link to={"/womens"}>
            <button>CHECK NOW</button>
            </Link>
        </div>
            <div className="offer-right">
              <img src={exculsives_image} alt="" />
            </div>
    </div>
  )
}
export default  Offers