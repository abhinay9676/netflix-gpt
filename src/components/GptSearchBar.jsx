import React from 'react'
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';



 
const GptSearchBar = () => {
   const langKey = useSelector((store)=>store.config.lang);

   console.log("Redux config state:", langKey,lang);
 
  return (

    <div className='pt-[10%] flex justify-center'>
        
        <form className="w-1/2 bg-black grid grid-cols-12">
        <input 
        type="text"
        className="p-4 m-4 col-span-8"
         placeholder={lang[langKey]?.gptSearchPlaceholder || "what would you like to watch"}
         />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">{lang[langKey]?.search|| "Search"}</button>
      </form>
 
    </div>
   
    
      
    
  );
};

export default GptSearchBar;
