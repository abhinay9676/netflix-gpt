import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
    },
    reducers: {
        toggleGptSerachView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
    }
});

export const { toggleGptSerachView } = gptSlice.actions;
export default gptSlice.reducer; 
