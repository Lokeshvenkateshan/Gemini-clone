import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth,db } from '../firebase/firebasecon'
import { setDoc, doc } from 'firebase/firestore'
import {Link} from 'react-router-dom'


const Signup = () => {
    const [uname, setUname] = useState("")
    const [email,setEmail]=useState("")
    const [pass,setPass]= useState("")

    const handlesignup = async (e) =>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword (auth,email,pass);
            const user = auth.currentUser;
            console.log(user)
            if(user)
            {
                await setDoc(doc(db, "Users",user.uid),{
                    email : user.email,
                    name : uname,
                });
            }
            console.log("succeeded")
            window.location.href="/content"
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className='signin-body'>
      <div className='signin-main'>
      <form onSubmit={handlesignup}>
        <h3>Sign up</h3>
        <label htmlFor="signup-name">Name</label>
        <input type="text" id='signup-name' className='signin-email' 
        placeholder='enter your name'
        value={uname}
        onChange={(e)=> setUname(e.target.value)}
        />
        <label htmlFor="signup-email">Email</label>
        <input type="email" id='signup-email' className='signin-email' 
        placeholder='enter your email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <label htmlFor="signup-pass">Password</label>
        <input type="password" id='signup-pass' className='signin-pass' 
        placeholder='enter password'
        value={pass}
        onChange={(e)=> setPass(e.target.value)}
        />
        <button type='submit'>SignUp</button>
      </form>
      <p>Already a user? <Link to ='/signin'>Signin</Link></p>
    </div>
    </div>
  )
}

export default Signup
