import React from "react";
import "./Navbar.css";
// import nav_logo from "../../assets/clothicon.png";
import logo from "../../assets/clothing_logo.png";

const Navbar = () => {
  return (
    <>
      <div className="nav-container ">
        <div className="nav-logo">
          <img src={logo} alt="" className="nav-logo" />
          <p>FASHIONHOOK</p>
        </div>
        <div className="nav-h1">
          <h1>Admin Panel</h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
