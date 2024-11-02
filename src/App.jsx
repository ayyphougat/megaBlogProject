import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import './App.css' 
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className="bg-[url('https://images.pexels.com/photos/628241/pexels-photo-628241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center min-h-screen flex flex-col ">
      <div className='flex-grow flex-col flex'>
        <Header />
        <main className='flex-grow'>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App