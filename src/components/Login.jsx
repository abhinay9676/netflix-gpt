import React from 'react'
import Header from './Header'
import { useState, useRef } from 'react'
import { checkValidData } from "../utils/validate.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase.js';

import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  

  const handleButtonClick = () => {
    // Validate the form data
    const Message = checkValidData(
        name.current?.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(Message);
    if (Message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
                  displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                   }).then(() => {
                   const {uid,email,displayName,photoURL} = auth.currentUser;
                         dispatch(addUser({
                            uid:uid,
                           email:email,
                           displayName:displayName,
                           photoURL:photoURL,}));
                    

           }).catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
  // ...       
           });
          
           

          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          console.log(user);
        
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute top-0 left-0 w-full h-full -z-10'>
        <img
          className='w-full h-full object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c95abc7a-8124-4630-bb7a-3b160bdc6de3/web/IN-en-20250915-TRIFECTA-perspective_d3d87aa7-58ed-4c6b-98dc-231ed05ba675_small.jpg"
          alt='Netflix Background'
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/75 px-8 py-16 rounded-md'>
        <label className='text-white text-3xl font-bold mb-4 mr-20'>{isSignInForm ? "Sign In" : "Sign Up"}</label>
        {!isSignInForm && <input ref={name} type="text" placeholder='Full name' className='p-2 m-2 rounded-sm bg-gray-700' />}
        <input ref={email} type="text" placeholder='Email' className='p-2 m-2 rounded-sm bg-gray-700' />
        <input ref={password} type="password" placeholder='password' className='p-2 m-2 rounded-sm bg-gray-700' />
        <p className='text-red-500'>{errorMessage}</p>
        <button className='bg-red-600 px-6 py-2 rounded-sm m-4' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='text-white text-sm cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up" : "Already a User!"}</p>
      </form>
    </div>
  )
}

export default Login