import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";
import { useState } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";


const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const [error,setError] = useState(null);


  //search movie in tmdb

  const searchMovieTMDB = async (movie) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
    API_OPTIONS
  );
    const json= await data.json()

    return json.results;
  }

  

  const handGptSearchClick = async () => {
    const query = searchText.current.value;
    if (!query) return;

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      query +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const gptResults = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: gptQuery },
        ],
      });
       console.log("GPT Response:", gptResults.choices[0]?.message?.content);
    

      const gptMovies=gptResults.choices[0]?.message?.content.split(",");

     const data = gptMovies.map(movie=> searchMovieTMDB(movie));

     const tmdbResults = await Promise.all(data);

     console.log(tmdbResults);

     dispatch(addGptMovieResult({movieNames: gptMovies,movieResults: tmdbResults}));
    } catch (err) {
       setError("Reached maximum daily limit");
    }
      

     
   
  };
    
      
    
  
  

  return (
    <div className="flex-col">
        <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-8"
          placeholder={
            lang[langKey]?.gptSearchPlaceholder || "What would you like to watch?"
          }
        />
        <button
          type="button"
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handGptSearchClick}
        >
          {lang[langKey]?.search || "Search"}
        </button>
      </form> 
      
    </div>
    <div>
        <p className="text-white text-xl font-bold">{error}</p>
      </div>
    </div>
    
  );
};

export default GptSearchBar;
