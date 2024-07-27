import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <h3>Bewakoof</h3>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setmenu("shop");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none" }} to="/">
            SHOP
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
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
          <Link style={{ textDecoration: "none" }} to="/womens">
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
          <Link style={{ textDecoration: "none" }} to="/kids">
            KIDS
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          {" "}
          <button>Login</button>{" "}
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
