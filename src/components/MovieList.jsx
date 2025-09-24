import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
   <div className='px-6 bg-black'>
     <h2 className='text-3xl flex py-4 text-white'>{title}</h2>
    <div className="flex overflow-x-scroll">
      <div className="flex wrap"> 
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
    </div>

    
  );
};

export default MovieList;
