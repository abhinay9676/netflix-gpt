import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReduce from "./gptSlice";
import  configReducer from "./configSlice";



const appStore= configureStore(
    {
        reducer:{
            user:userReducer,
            movies: movieReducer,
            gpt: gptReduce,
            config: configReducer,
        },

    }
)

export default appStore;