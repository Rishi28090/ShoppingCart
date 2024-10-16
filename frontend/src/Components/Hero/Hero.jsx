import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";
import { slideImage } from "./carosole_data";

const Hero = () => {
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
      <div className="carousel_wrapper">
        {slideImage.map((image, index) => {
          return (
            <div
              key={index}
              className={
                index === current
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
            >
              <img
                className="card_image"
                onMouseEnter={() => {
                  setAutoplay(false);
                  clearTimeout(timeout);
                }}
                onMouseLeave={() => {
                  setAutoplay(true);
                }}
                src={image.image}
                alt=""
                />
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
  );
};

export default Hero;
