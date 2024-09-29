import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const Addproduct = () => {

const [image,setimage] = useState(false);
const [productDetails,setProductDetail] = useState({
  name:"",
  image:"",
  category:"women",
  new_price:"",
  old_price:""

})

const imaghandle = (e) => {
  setimage(e.target.files[0])
}

const changhandler = (e) => {
  setProductDetail({...productDetails,[e.target.name]:e.target.value})
}

const add_product = async () => {
  console.log(productDetails)
  let responsedata;
  let product= productDetails;
  let formData = new FormData();

  formData.append('product',image);


  await fetch('http://localhost:4000/upload',{
    method:'POST',
    headers:{
      Accept:'application/json',
    },
    body:formData,
  }).then((resp) => resp.json()).then((data) =>{responsedata=data})

  if(responsedata.success){

    product.image = responsedata.image_url;
    await fetch('http://localhost:4000/addproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type' : 'application.json'


      },
      body :JSON.stringify(product),

    }).then((resp)=>resp.json()).then((data) =>{
      data.success?alert("Product Added"):alert("failed");
      
    })
  }




}


  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changhandler}  type='text' name='name' placeholder='Type Here '/>

      </div>
      <div className="addproduct-price">

        <div className="addproduct-itemfield">
          <p>Price</p>
          <input  value={productDetails.old_price} onChange={changhandler}  type="text" name="old_price" placeholder='Type here' />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input  value={productDetails.new_price} onChange={changhandler} type="text" name="new_price" placeholder='Type here' />
        </div>


      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select  value={productDetails.category} onChange={changhandler} name="category" className='add-selector'>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>

        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):upload_area} className='add-thumb-img' alt="" />
        </label>
        <input  onChange={imaghandle} type="file" name='image' id='file-input' hidden/>

      </div>
      <button onClick={() => {add_product()}} className='addprod-btn'>ADD</button>
    </div>
  )
}

export default Addproduct