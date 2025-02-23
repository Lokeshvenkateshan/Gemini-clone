import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth,db } from '../firebase/firebasecon'
import '../pagestyling/Content.css'
import Sidebar from '../components/Sidebar'
import Workspace from '../components/Workspace'
const Content = () => {
    const [details, setDetails] = useState(null);
    const fetchdata= async ()=>{
        auth.onAuthStateChanged(async(user)=>{
            console.log(user)
            
            const dbdoc =  doc(db, "Users", user.uid)
            const docsnap = await getDoc(dbdoc);
            if(docsnap.exists){
                setDetails(docsnap.data())
                
            } 
            else{
                console.log("user is nnot loginned");
                
            }
        })
    }
    useEffect(()=>{
        fetchdata();
    },[])
async function handlelogout() {
    try {
        auth.signOut();
        window.location.href="/Signin"
        console.log("logged out");
        
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div>
      {details?
    <div className='main-content'>
        <Sidebar />
        <Workspace
        userName = {details.name}
        />
    </div>  : 
     <div className='parent'> 
     <div class="loader">
     <div class="circle"></div>
     <div class="circle"></div>
     <div class="circle"></div>
     <div class="circle"></div>
     </div>
 </div>  
    
    }
    </div>
  )
}

export default Content
 