import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import Productdisplay from "../Components/Productdisplay/Productdisplay";
import DiscriptionBox from "../Components/DiscriptionBox/DiscriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { productId } = useParams(); // Retrieve `productId` from URL
  const { all_product } = useContext(ShopContext);

  // Find the product using `productId` (make sure it's cast to the right type)
  const product = all_product.find((e) => e.id === Number(productId));

  console.log("Product ID from params:", productId); // Should display a valid product ID
  console.log("All Products:", all_product);

  return (
    <div>
      <Breadcrum product={product} />
      <Productdisplay product={product} />
      <DiscriptionBox/>
      <RelatedProducts/>
    </div>
  );
};

export default Product;
