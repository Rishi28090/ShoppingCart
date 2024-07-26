import React, { useContext } from 'react'
import './CSS/Shcat.css'
import { ShopContext } from '../Context/ShopContext'
import dpdown from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

 const Shcat = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shcat'>
        <img className='shcat-banner' src={props.banner} alt="" />
        <div className="shopcat-indexS">
          <p>
            <span>Showing 1-128</span> Out of 36 Products

          </p>
          <div className="shopcat-sort">
            Sort by <img src={dpdown} alt="" />
          </div>
        </div>
        <div className="shopcat-products">
          {all_product.map((item,i) => {
            if(props.category===item.category){
                return <Item  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            }
            else{
              return null;
            }
          })}
        </div>
        <div className="shcatload">
          Explore More
        </div>
    </div>
  )
}

export default  Shcat
