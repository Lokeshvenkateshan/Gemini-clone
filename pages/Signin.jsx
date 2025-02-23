import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebasecon';
import { ToastContainer, toast } from "react-toastify";
import '../pagestyling/Signin.css'
import SIgninwithGoogle from './SIgninwithGoogle';
const Signin = () => {
    const [email,setEmail]=useState("");
    const [pass,setPass]= useState("");

    const handlesignin =async(e)=>{
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email,pass)
            console.log("loginned")
            toast.success("successfully loginned.", {
              position: "top-right",
             
            });
            window.location.href="/Content"
        } catch (error) {
            console.log(error);
            
        }
    }
    
  return (
    <div className='signin-body'>
      <div className='signin-main'>
      <form onSubmit={handlesignin}>
        <h3>Sign in</h3>
        <label htmlFor="sign-email">Email</label>
        <input type="email" id='email' className='signin-email' 
        placeholder='enter your email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input type="password" id='pass' className='signin-pass' 
        placeholder='enter password'
        value={pass}
        onChange={(e)=> setPass(e.target.value)}
        />
        <button type='submit'>SignIn</button>
      </form>
      
      
    <p>Dont have an account? <Link to ='/signup'>signup</Link></p>
    <p>or</p>
    <SIgninwithGoogle/>
    
    </div>
    </div>
  )
}

export default Signin

