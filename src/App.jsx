import { useEffect, useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Content from '../pages/Content'
import { auth } from '../firebase/firebasecon'

function App() {
  const [user,setUser]= useState();
  useEffect (()=>{
    auth.onAuthStateChanged( (user)=>{
      setUser(user) 
    })
  })

  return (
    <div>
      <Routes>
        <Route  path='/' element={user ? <Navigate to ="/content"/>:<Signin/>}/>
        {/* <Route  path='/' element={<Signin/>}/> */}
        <Route  path='/signup' element={<Signup/>}/>
        <Route  path='/content' element={<Content/>}/>
        <Route  path='/signin' element={<Signin/>}/>
      </Routes>
    </div>
  )
}

export default App
