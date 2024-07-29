import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";
// import hand_icon from '../Assets/hand_icon.png'
// import arrow_icon from '../Assets/arrow.png'
// import hero from '../Assets/hero.png'
// import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { slideImage } from "./carosole_data";

const Hero = () => {
  // const [Text] = useTypewriter({
  //    words: ['Mens','Womens','Kids'],
  //    loop: {},
  //    typeSpeed: 150,
  //  });
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoplay] = useState(true);
  const timeoutRef = useRef(null);
  const timeout = null;

  useEffect(() => {
    timeoutRef.timeout =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 1500);
  });

  const slideLeft = () => {
    setCurrent(current === 0 ? slideImage.length - 1 : current - 1);
  };
  const slideRight = () => {
    setCurrent(current === slideImage.length - 1 ? 0 : current + 1);
  };
  return (
    <div className="hero">
      <div
        className="carousel_wrapper">
        {slideImage.map((image, index) => {
          return (
            <div
              key={index}
              className={
                index === current
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
              onMouseEnter={() => {
                setAutoplay(false);
                clearTimeout(timeout);
              }}
              onMouseLeave={() => {
                setAutoplay(true);
              }}
            >
              <img className="card_image" src={image.image} alt="" />
              {/* <div className="">
                <h2 className="card_title">{image.caption}</h2>
              </div> */}
            </div>
          );
        })}
        <div className="carousel_arrow_left" onClick={slideLeft}>
          &lsaquo;
        </div>
        <div className="carousel_arrow_right" onClick={slideRight}>
          &rsaquo;
        </div>
        <div className="carousel_pagination">
          {slideImage.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index === current
                    ? "pagination_dot pagination_dot-active"
                    : "pagination_dot"
                }
                onClick={() => {
                  setCurrent(index);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
    // <div className="hero">
    //   <div className="hero-left">
    //           <h2>NEW ARRIVALS ONLY</h2>
    //           <div>
    //             <div className="hero-hand-icon">
    //               <p>New</p>
    //               <img src={hand_icon} alt="" />
    //             </div>
    //             <p>collections</p>
    //             <p>for { Text}
    //               <span style={{color:'red'}}>
    //               <Cursor className="Cursor"/>
    //               </span>
    //             </p>
    //           </div>
    //           <div className="hero-latest-btn">
    //             <div>Latest Collection</div>
    //             <img src={arrow_icon} alt="" />
    //           </div>
    //   </div>
    //   <div className="hero-right">
    //         {/* <img src={hero} alt="" /> */}
    //         {/* <img src={hero_women} alt="" /> */}
    //   </div>
    // </div>
  );
};

export default Hero;
