import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

//  const Item = ({productId,image,name,new_price,old_price}) => {
//   return (
//     <div className='item'>
//         <Link to={`/product/${productId}`}>
//         <img onClick={window.scrollTo(0,0)} src={image} alt="" />
//         </Link> 
//         <p>{name}</p>
//         <div className='item-prices'>
//             <div className="item-price-new">
//                 ₹ {new_price}
//             </div>
//             <div className="item-price-old">
//                 ₹ {old_price}
//             </div>
//         </div>
//     </div>
//   )
// }

const Item = ({ productId, image, name, new_price, old_price }) => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className='item'>
      <Link to={`/product/${productId}`} onClick={handleScrollToTop}>
        <img src={image} alt={name} />
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
  );
};

export default Item;
