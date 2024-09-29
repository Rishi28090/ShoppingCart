import React, { createContext, useState,useEffect } from "react";
import axios from "axios";


export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++){
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {

    const [all_product, setAllProduct] = useState([]);
    const [cartItems,setCartItem] = useState(getDefaultCart());

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
        .then((response) => response.json())
        .then((data) => setAllProduct(data))

        if(localStorage.getItem("auth-token")) {
            fetch("http://localhost:4000/getcart", {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json"
                },
                body: ""
            }).then((response) => response.json())
            .then((data) => setCartItem(data))
        }

    }, [])

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    
   
    const addTocart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem("auth-token")) {
            fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
        }
    }
    const removeFromcart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.gettem("auth-token")) {
            fetch("http://localhost:4000/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
        }
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

    useEffect(() => {
        setTotalAmount(getTotalCartAmount());
    }, [cartItems]);

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
   
    const contextValue = {promoCode,handlePromoCodeSubmit,handlePromoCodeChange,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addTocart,removeFromcart, totalAmount: (totalAmount * (1 - discount / 100)).toFixed(2),};
   return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
   )

}

export default ShopContextProvider;