import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  // console.log(cart);

  return cart;
};
const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItem] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAllProduct(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItem(data));
    }
  }, []);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const addTocart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  const removeFromcart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // function getTotalCartAmount(cartItems) {
  //     // Ensure cartItems is an array before using forEach
  //     if (!Array.isArray(cartItems)) {
  //       console.error("cartItems is not an array or is undefined", cartItems);
  //       return 0; // Return 0 or any default value you prefer when cartItems is invalid
  //     }

  //     let total = 0;

  //     cartItems.forEach(item => {
  //       // Check if the item exists and has a 'new_price' property
  //       if (item && item.new_price !== undefined) {
  //         total += item.new_price;
  //       } else {
  //         console.warn("Item is undefined or missing 'new_price' property", item);
  //       }
  //     });

  //     return total;
  // }
  function getTotalCartAmount() {
    let total = 0;

    // Iterate over all products and check if they are in the cartItems object
    all_product.forEach((product) => {
      const quantity = cartItems[product.productId];
      if (quantity > 0) {
        total += product.new_price * quantity;
      }
    });

    return total;
  }

  // useEffect(() => {
  //     setTotalAmount(getTotalCartAmount());
  // }, [cartItems]);

  useEffect(() => {
    if (all_product.length > 0 && Object.keys(cartItems).length > 0) {
      setTotalAmount(getTotalCartAmount());
    }
  }, [cartItems, all_product]);

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

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
      alert("Invalid promo code");
    }
  };

  //   const contextValue = {
  //     promoCode,
  //     handlePromoCodeSubmit,
  //     handlePromoCodeChange,
  //     getTotalCartItems,
  //     getTotalCartAmount,
  //     all_product,
  //     cartItems,
  //     addTocart,
  //     removeFromcart,
  //     totalAmount: (totalAmount * (1 - discount / 100)).toFixed(2),
  //   };

  const contextValue = {
    promoCode,
    handlePromoCodeSubmit,
    handlePromoCodeChange,
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addTocart,
    removeFromcart,
    totalAmount: totalAmount, // No need to calculate discount here, do it in the component
    discount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
