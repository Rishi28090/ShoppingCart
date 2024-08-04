import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import plus_icon from '../Assets/plus-icon.png'
import { ShopContext } from '../../Context/ShopContext';

const Cartitems = () => {
    const {getTotalCartAmount,addTocart,all_product,cartItems,removeFromcart, promoCode,
        discount,
        handlePromoCodeChange,
        handlePromoCodeSubmit,
        totalAmount, } = useContext(ShopContext);
    return (
      <div className='cartitems'>
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr/>
          {all_product.map((e)=>{
              if(cartItems[e.id]>0)
              {
                  return  <div>
                              <div className="cartItem-format cartitems-format-main">
                                  <img src={e.image} alt="" className='carticon-product-icon'/>
                                  <p>{e.name}</p>
                                  <p>₹{e.new_price}</p>
                                  <button className='cartitems-quantity'>
                                  <img src={plus_icon} alt="" onClick={()=>{addTocart(e.id)}} />{cartItems[e.id]}</button>
                                  <p>₹{e.new_price*cartItems[e.id]}</p>
                                  <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromcart(e.id)}} alt="" />
                               </div>
                              <hr/>
                          </div>
              }
              return null;
          })}
          <div className='cartitems-down'>
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-items">
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-items">
                        <h3>Total</h3>
                        <h3>₹{totalAmount}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' value={promoCode} 
          onChange={handlePromoCodeChange} />
                    <button onClick={handlePromoCodeSubmit}>Submit</button>
                </div>
                {discount > 0 && (
        <p>Promo code applied! You get a discount of {discount}%</p>
      )}
      <h3>Total Amount: ₹{totalAmount}</h3>
            </div>
          </div>
      </div>
    );
}

export default Cartitems
