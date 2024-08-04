import React, { useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/clothing_logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import nav_dropdown from "../Assets/nav_dropdown.png";
 
const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open')
  }
  
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>CLOTHING</p>
      </div>
      <img className="nav-dropdown" src={nav_dropdown} alt="" onClick={dropdown_toggle}/>
      <ul className="nav-menu" ref={menuRef}>
        <li
          onClick={() => {
            setmenu("shop");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none", color: "#0d4f76"}} to="/"> SHOP </Link>
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
          <Link style={{ textDecoration: "none", color: "#0d4f76" }} to="/womens">
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
        <Link to="/login" style={{textDecoration: "none", color: "#0d4f76"}}>
          {" "}
          <span>
          Login{" "}
          </span>
        </Link>
        <Link to="/cart">
          {" "}
          <img src={cart_icon} alt="" />{" "}
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
