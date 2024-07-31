import React from 'react'
import './CSS/login.css'

 const Login = () => {
  return (
    <div className='loginsignup'>
        <div className="login-container">
            <h1>Sign Up</h1>
            <div className="login-fields">
                <input type="text" placeholder='Enter Your Name' />
                <input type='email' placeholder='Email Address'/>
                <input type='password' placeholder='password'/>

            <button>Continue</button>
            </div>
            <p className="loginsign-login">
                Already Have an Account ? <span>Login Here</span></p>
            <div className='login-agree'>
                <input type="checkbox" name='' id="" />
                <p>By continuing , i agree to the terms of use & privacy policy</p>
            </div>
        </div>
    </div>
  )
}

export default Login;
