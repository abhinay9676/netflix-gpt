import React from 'react'
  import { signOut } from "firebase/auth";
  import { auth } from '../utils/firebase.js';
    import { useNavigate } from 'react-router-dom';
    import { useDispatch } from 'react-redux';
    import { addUser, removeUser } from '../utils/userSlice.js';
    import { useSelector } from 'react-redux';
    import { useEffect } from 'react'
    import { onAuthStateChanged } from "firebase/auth";
    






const Header = () => {

    const [errorMessage, setErrorMessage] = React.useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store)=>store.user);

    

  
const handleSignOut = () => {

signOut(auth).then(() => {
  // Sign-out successful.
//   dispatch(removeUser());
//   navigate("/");
}).catch((error) => {
      const errorMessage = error.message;
  // An error happened.
  setErrorMessage(errorMessage);
  console.log(error);
});
}

    useEffect(() => {
     
    
     const unsubscribe=  onAuthStateChanged(auth, (user) => {
       if (user) {
        const {uid,email,displayName,photoURL} = user;
       dispatch(addUser({
          uid:uid,
         email:email,
         displayName:displayName,
         photoURL:photoURL,}));

         navigate("/browse");
        
    // ...
      } else {
        dispatch(removeUser());
        navigate("/");        
       }
    });

    return () => unsubscribe();

    },[dispatch,navigate]);
  return (
    <div className='w-full top-0 left-0 absolute px-6 py-4 bg-gradient-to-b from-black flex justify-between'>

    <img className="w-44" src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
    alt='Netflix Logo'/>
{user && (
    <div>
        <button className='bg-red-600 px-4 py-2 rounded-sm text-lg font-semibold' onClick={handleSignOut}>Sign out</button>
    </div>)}
    </div>
    
  )
}

export default Header
