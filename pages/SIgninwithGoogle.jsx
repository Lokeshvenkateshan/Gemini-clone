import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase/firebasecon';
import { setDoc, doc } from 'firebase/firestore'

const SIgninwithGoogle = () => {
    const googlesignin=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then (async(result)=>{
          console.log(result);
          const user = result.user
          if(result.user){
            await setDoc(doc(db, "Users",user.uid),
            {
                email : user.email,
                name : user.displayName,
                });
            window.location.href="/Content"
          }
        })
      }
    
  return (
    <div>
      <button onClick={googlesignin} >Sign in with Google</button>
    </div>
  )
}

export default SIgninwithGoogle
