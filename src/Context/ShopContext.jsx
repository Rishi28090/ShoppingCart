import React, { createContext, useState,useEffect } from "react";
import all_product from "../Components/Assets/all_product";



export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++){
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {
    const [cartItems,setCartItem] = useState(getDefaultCart());

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        setTotalAmount(getTotalCartAmount());
    }, [cartItems]);
   
    const addTocart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    const removeFromcart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
       
    const validPromoCodes = {
        KRISH10: 10, // Example promo codes and their discount values
        PRAVIN20: 20,
    };

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    };

    const handlePromoCodeSubmit = () => {
        if (validPromoCodes[promoCode]) {
            setDiscount(validPromoCodes[promoCode]);
        } else {
            alert('Invalid promo code');
        }
    };
   
    const contextValue = {discount,promoCode,handlePromoCodeSubmit,handlePromoCodeChange,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addTocart,removeFromcart, totalAmount: (totalAmount * (1 - discount / 100)).toFixed(2),};
   return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
   )
}

export default ShopContextProvider;