import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/clothing_logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <h3>CLOTHING</h3>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setmenu("shop");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none", color: "#0d4f76", fontWeight: "light"}} to="/"> SHOP </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          className="dropdown"
          onClick={() => {
            setmenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none", color: "#0d4f76" }} to="/mens">
            MENS
          </Link>
          {menu === "mens" ? <hr /> : <></>}
          {/* <ul className="submenu">
            <li>
              <a href="">Top wear</a>
              <ul className="submenu_list">
                <li><a href="">T - shirts</a></li>
                <li><a href="">Shirts</a></li>
                <li><a href="">kurti</a></li>
                <li><a href="">jackets</a></li>
              </ul>
            </li>
            <li>
              <a href="">Bottom wear</a>
              <ul className="submenu_list">
              <li><a href="">T - shirts</a></li>
                <li><a href="">Shirts</a></li>
                <li><a href="">kurti</a></li>
                <li><a href="">jackets</a></li>
                </ul>
            </li>
          </ul> */}
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
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
