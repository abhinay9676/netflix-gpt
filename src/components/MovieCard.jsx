import React from 'react'
import { BASE_IMAGE_URL } from '../utils/constant'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48 pr-4'>
      <img alt='movie-poster' src={BASE_IMAGE_URL + posterPath}/>
    </div>
  )
}

export default MovieCard
