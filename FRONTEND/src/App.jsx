import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/Signup'
import Login from './pages/Login'
const App = () => {
  return (
    <div className='bg-[#F1F5F9] h-screen text-white'>
      <section className='h-full flex items-center justify-center'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/adminsignup' element={<SignUp/>}/>
        <Route path='/adminlogin' element={<Login/>}/>
      </Routes>
      </section>
    </div>
  )
}

export default App