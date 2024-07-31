import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/clothing_logo.png'
import insta from '../Assets/instagram_icon.png'
import pin from '../Assets/pintester_icon.png'
import what from '../Assets/whatsapp_icon.png'

 const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" width={200} height={150} />
            <p>CLOTHING</p>
        </div>
        <ul className="footlink">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footicon">
            <div className="foot-icon-container">
                <img src={insta} alt="" />
            </div>
            <div className="foot-icon-container">
                <img src={pin} alt="" />
            </div>
            <div className="foot-icon-container">
                <img src={what} alt="" />
            </div>
        </div>
        <div className="footcopy">
            <hr />
            <p>Copyright @ 2024 - All Rights are Reserve</p>
        </div>
    </div>
  )
}

export default Footer
