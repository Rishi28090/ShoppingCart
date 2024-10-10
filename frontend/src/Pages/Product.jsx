import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import Productdisplay from "../Components/Productdisplay/Productdisplay";
import DiscriptionBox from "../Components/DiscriptionBox/DiscriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { productId } = useParams(); // Retrieve `productId` from URL
  const { all_product } = useContext(ShopContext);

  // Find the product using `productId` (make sure it's cast to the right type)
  // const products = all_product.find((e) => e.productId === Number(id));
  const product = all_product.find((p) => p.productId === Number(productId));

  console.log("Product ID from params:", product); // Should display a valid product ID
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
// const Product = () => {
//   const { productId } = useParams(); // Retrieve `productId` from URL
//   const { all_product } = useContext(ShopContext);
//   const [product, setProduct] = useState({}); // Create a state variable for the product data

//   useEffect(() => {
//     // Find the product using `productId` (make sure it's cast to the right type)
//     const foundProduct = all_product.find((e) => e.productId === Number(productId));
//     setProduct(foundProduct || {}); // Update the product state variable
//   }, [productId, all_product]); // Run the effect when productId or all_product changes

//   return (
//     <div>
//       <Breadcrum product={product} />
//       <Productdisplay product={product} />
//       <DiscriptionBox/>
//       <RelatedProducts/>
//     </div>
//   );
// };
// export default Product;
