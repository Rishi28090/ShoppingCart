import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/clothing_logo.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const [open , setopen] = useState(false);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  const onLogOutClick = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  // const logOutBtn = () => {
  //   if(localStorage.getItem("auth-token")) {
  //     return <button onClick={onLogOutClick}>Logout</button>
  //   } else {
  //     return <Link to="/login" style={{textDecoration: "none", color: "#0d4f76"}}>
  //     {" "}
  //     <span>
  //     Login{" "}
  //     </span>
  //   </Link>
  //   }
  // }


  return (
    <>
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>FASHIONHOOK</p>
      </div>
      <img
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
        onClick={dropdown_toggle}
      />
      <ul className="nav-menu" ref={menuRef}>
        <li
          onClick={() => {
            setmenu("shop");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none", color: "#0d4f76" }} to="/">
            {" "}
            SHOP{" "}
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none", color: "#0d4f76" }} to="/mens">
            MENS
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("womens");
          }}
        >
          {" "}
          <Link
            style={{ textDecoration: "none", color: "#0d4f76" }}
            to="/womens"
          >
            WOMENS
          </Link>{" "}
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("kids");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none", color: "#0d4f76" }} to="/kids">
            KIDS
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") 
        ? 
        (
          <Link
            onClick={onLogOutClick}
            style={{ textDecoration: "none", color: "#0d4f76" }}
          >
            {" "}
            <span>Logout </span>
          </Link>
        ) 
        : (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#0d4f76" }}
          >
            {" "}
            <span>Login </span>
          </Link>
        )}
        <Link to="/cart">
          {" "}
          <img src={cart_icon} alt="" />{" "}
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
        {/* <div className="login-user-icon" onClick={()=>setopen(!open)}>
          <div className="user-icon">
          <i class="fa-regular fa-user"></i>
          </div>
        </div> */}
      </div>
    </div>
    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
      <p>Profile</p>
      <span><i class="fa-regular fa-user"></i></span>
      <ul>
        <li><i class="fa-solid fa-user"></i>Krushna</li>
        <li> <i class="fa-regular fa-envelope"></i>Krushna069@gmail.com</li>
        <li><i class="fa-solid fa-lock"></i>Krish123</li>
        <button>Logout</button>
      </ul>
    </div>
    </>
  );
};

export default Navbar;
