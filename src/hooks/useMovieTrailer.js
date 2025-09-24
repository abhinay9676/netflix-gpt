import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constant.js';
import { addTrailerVideo } from '../utils/movieSlice.js';



const useMovieTrailer = (movieId) => {

     const dispatch = useDispatch();
    
        const getMovieVideo=async()=>{
            const videoapo = await fetch('https://api.themoviedb.org/3/movie/1311031/videos?language=en-US', API_OPTIONS);
            const json = await videoapo.json();
            console.log(json);
    
            const filterData = json.results.filter((video) => video.type==="Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
            console.log(trailer);
    
            dispatch(addTrailerVideo(trailer));
    
        }
    
        useEffect(() => {
            getMovieVideo();
    
            },[]);

}

export default useMovieTrailer;