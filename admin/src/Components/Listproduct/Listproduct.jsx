import React, { useEffect, useState } from "react";
import "./Listproduct.css";
import cross_icon from "../../assets/cross_icon.png";

const Listproduct = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
  });

  // Fetch product information
  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:4000/allproducts");
      const data = await res.json();
      setAllproducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove product
  const remove_product = async (productId) => {
    try {
        const response = await fetch("http://localhost:4000/removeproduct", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }), // Corrected casing to match server
        });

        const result = await response.json(); // Optionally handle the response
        if (result.success) {
            alert("Product removed successfully");
            await fetchInfo(); // Re-fetch products after removal
        } else {
            alert(result.error || "Failed to remove product");
        }
    } catch (error) {
        console.error("Error removing product:", error);
    }
};

  // Start editing a product
  const editProduct = (product) => {
    setEditProductId(product.productId); // Use product.productId instead of product.id
    setEditFormData({
      name: product.name,
      old_price: product.old_price,
      new_price: product.new_price,
      category: product.category,
    });
  };

  // Handle form input changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update product details in backend and display an alert
  const updateProduct = async () => {
    try {
      const response = await fetch("http://localhost:4000/updateproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: editProductId, // Ensure you are sending the correct productId
          ...editFormData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Product updated successfully");
        setEditProductId(null); // Exit edit mode
        await fetchInfo(); // Re-fetch updated product list
      } else {
        alert(result.error || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error occurred while updating product");
    }
  };

  return (
    <div className="list-product">
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Actions</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product.productId}>
            <div className="listproduct-format-main listproduct-format">
              <img
                src={product.image}
                alt={product.name}
                className="listproduct-product-icon"
              />

              {editProductId === product.productId ? ( // Check against product.productId
                <>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                  />
                  <input
                    type="text"
                    name="old_price"
                    value={editFormData.old_price}
                    onChange={handleEditFormChange}
                  />
                  <input
                    type="text"
                    name="new_price"
                    value={editFormData.new_price}
                    onChange={handleEditFormChange}
                  />
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                  />
                  <button
                    className="btn-edit"
                    onClick={updateProduct} // Call updateProduct without passing product.id
                  >
                    <i className="fa-regular fa-floppy-disk"></i>
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => setEditProductId(null)}
                  >
                    <i className="fa-solid fa-circle-arrow-left"></i>
                  </button>
                </>
              ) : (
                <>
                  <span>{product.name}</span>
                  <span>{product.old_price}</span>
                  <span>{product.new_price}</span>
                  <span>{product.category}</span>
                  <button
                    className="btn-edit"
                    onClick={() => editProduct(product)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                </>
              )}

              <img
                onClick={() => remove_product(product.productId)} // Use product.productId
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Listproduct;
