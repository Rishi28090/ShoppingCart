import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetail] = useState({
    productId: '',
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
    description: '', // Add description field
  });

  const imaghandle = (e) => {
    setImage(e.target.files[0]);
  };

  const changhandler = (e) => {
    setProductDetail({ ...productDetails, [e.target.name]: e.target.value });
  };

  const add_product = async () => {
    console.log(productDetails);
    let responsedata;
    let formData = new FormData();

    formData.append('product', image);
    formData.append('productId', productDetails.productId);
    formData.append('name', productDetails.name);
    formData.append('category', productDetails.category);
    formData.append('new_price', productDetails.new_price);
    formData.append('old_price', productDetails.old_price);
    formData.append('description', productDetails.description); // Append description

    // Upload the image
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responsedata = data;
      });

    if (responsedata.success) {
      productDetails.image = responsedata.image_url;

      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert('Product Added') : alert('Failed');
        });
    } else {
      alert('Image upload failed');
    }
  };

  return (
    <div className='addproduct'>
      <div className='addproduct-itemfield'>
        <p>Product ID</p>
        <input
          value={productDetails.productId}
          onChange={changhandler}
          type='number'
          name='productId'
          placeholder='Type Product ID Here'
        />
      </div>

      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changhandler}
          type='text'
          name='name'
          placeholder='Type Product Name Here'
        />
      </div>

      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changhandler}
            type='text'
            name='old_price'
            placeholder='Type Original Price Here'
          />
        </div>

        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changhandler}
            type='text'
            name='new_price'
            placeholder='Type Offer Price Here'
          />
        </div>
      </div>

      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changhandler}
          name='category'
          className='add-selector'
        >
          <option value='men'>Men</option>
          <option value='women'>Women</option>
          <option value='kid'>Kid</option>
        </select>
      </div>

      <div className='addproduct-itemfield'>
        <p>Product Description</p>
        <textarea
          value={productDetails.description}
          onChange={changhandler}
          name='description'
          rows={3}
          cols={5}
          placeholder='Type Product Description Here'
        ></textarea>
      </div>

      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='add-thumb-img'
            alt=''
          />
        </label>
        <input onChange={imaghandle} type='file' name='image' id='file-input' hidden />
      </div>

      <button onClick={add_product} className='addprod-btn'>
        ADD
      </button>
    </div>
  );
};

export default Addproduct;
