// import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";
import { useRef } from "react";
import { useState } from "react";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie.trim()
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error("TMDB Fetch Error:", err);
      return [];
    }
  };

  // GPT Search handler
  const handGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) {
      setError("Please enter a search query!");
      return;
    }

    setError(null);
    setLoading(true);

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${query}. 
    Only give me names of 5 movies, comma separated like the example result given ahead. 
    Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

    try {
      // Call OpenAI
      const gptResults = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: gptQuery }],
      });

      const gptResponse = gptResults.choices[0]?.message?.content;
      console.log("GPT Response:", gptResponse);

      if (!gptResponse) {
        throw new Error("No response from GPT");
      }

      const gptMovies = gptResponse.split(",").map((m) => m.trim());

      // Fetch TMDB results for each movie
      const tmdbResults = await Promise.all(
        gptMovies.map((movie) => searchMovieTMDB(movie))
      );

      console.log("TMDB Results:", tmdbResults);

      // Save results to Redux
      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (err) {
      console.error("Error in GPT search:", err);
      setError("Reached maximum daily limit or API error occurred.");
    } finally {
      setLoading(false);
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
            className="p-4 m-4 col-span-8 rounded-md"
            placeholder={
              lang[langKey]?.gptSearchPlaceholder ||
              "What would you like to watch?"
            }
          />
          <button
            type="button"
            className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg disabled:opacity-50"
            onClick={handGptSearchClick}
            disabled={loading}
          >
            {loading
              ? "Searching..."
              : lang[langKey]?.search || "Search"}
          </button>
        </form>
      </div>

      {error && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
