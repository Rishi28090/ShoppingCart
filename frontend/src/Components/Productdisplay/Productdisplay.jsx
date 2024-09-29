import React, { useContext } from 'react';
import './Productdisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const Productdisplay = (props) => {
  const { product } = props;
  // Use the correct name: addToCart or addTocart
  const { addTocart } = useContext(ShopContext);  // Use the exact function name defined in context

  // Debug log to see if the product prop is passed correctly
  console.log("Product received in Productdisplay:", product);

  // If product is not defined, return a fallback UI
  if (!product) {
    return <div>Product data is missing</div>;
  }

  return (
    <div className='productdisplay'>
      <div className="pd-left">
        <div className="pd-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="pd-img">
          <img className='pd-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="pd-right">
        <h1>{product.name}</h1>
        <div className="pd-right-prices">
          <div className="pd-right-price-new">₹{product.new_price}</div>
          <div className="pd-right-price-old">₹{product.old_price}</div>
        </div>
        <div className="pd-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="pd-right-size">
          <h1>Select size</h1>
          <div className="pd-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        {/* Use the correct function name */}
        <Link onClick={() => { addTocart(product.Id) }} style={{ textDecoration: "none", color: "white" }} to='/cart'>
          <button >ADD TO CART</button>
        </Link>
        <div className="pd-right-descp">
          A Lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
        </div>
        <p className="pd-right-category">
          <span>Category : </span>Men, Women, T-Shirt, Crop Top
        </p>
        <p className="pd-right-category">
          <span>Tags : </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default Productdisplay;
