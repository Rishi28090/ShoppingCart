import React, { useState } from 'react'
import './CSS/login.css'
import user_icon from '../Components/Assets/person.png'
import email_icon from '../Components/Assets/email.png'
import password_icon from '../Components/Assets/password.png'

const Login = () => {
    const [action,setAction] = useState("Sign Up");
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: ""
    })

    const userLogin = async () => {
      console.log("Login", formData)
      let responseData;
      await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then((res)=>res.json()).then((data)=> responseData=data)

      if(responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.error)
      }
    }

    const userSignup = async () => {
      console.log("Sign Up", formData)
      let responseData;
      await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then((res)=>res.json()).then((data)=> responseData=data)

      if(responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.error)
      }
    }

    const changeHandler = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

  return (
    <div className="container-page">
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action==="Login"?<div></div>: <div className='input'>
            <img src={user_icon} alt="" />
            <input type="text" placeholder='Name' name='username' value={formData.username} onChange={changeHandler} />
        </div>}
       
        <div className='input'>
            <img src={email_icon} alt="" />
            <input type="email" placeholder='Email Id' name='email' value={formData.email} onChange={changeHandler} />
        </div>
        <div className='input'>
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password' name='password' value={formData.password} onChange={changeHandler} />
        </div>
        <div className="submitbtn">
          <button onClick={() => {action==="Login"?userLogin():userSignup()}}>{action}</button>
          </div>
        </div>
        {action==="Sign Up"?<div></div>: <div className="forgot-paswd">Lost password? <span>Click Here</span></div>}
       
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
    </div>
  )
}

export default Login