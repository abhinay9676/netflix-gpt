import React from 'react'
import Header from './Header'
import { useState } from 'react'
const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div >
      <Header/>
      <div className='absolute top-0 left-0 w-full h-full -z-10'>
        <img
          className='w-full h-full object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c95abc7a-8124-4630-bb7a-3b160bdc6de3/web/IN-en-20250915-TRIFECTA-perspective_d3d87aa7-58ed-4c6b-98dc-231ed05ba675_small.jpg"
          alt='Netflix Background'
        />
      </div>
      <form className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/75 px-8 py-16 rounded-md'>
    <label className='text-white text-3xl font-bold mb-4 mr-20'>{isSignInForm ? "Sign In" : "Sign Up" }</label>
       {!isSignInForm &&<input type="text" placeholder='Full name' className='p-2 m-2 rounded-sm bg-gray-700'/>} 
        <input type="text" placeholder='Email or phone number' className='p-2 m-2 rounded-sm bg-gray-700'/>
        <input type="password" placeholder='password' className='p-2 m-2 rounded-sm bg-gray-700'/>
        <button className='bg-red-600 px-6 py-2 rounded-sm m-4'>{isSignInForm ? "Sign In" : "Sign Up" }</button>
        <p className='text-white text-sm cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix?SignUp" : "Alreday a User!"}</p>

      </form>
    </div>
  )
}

export default Login