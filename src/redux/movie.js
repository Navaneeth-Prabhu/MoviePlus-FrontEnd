// Provider
// Store
// Reducer
// Action

import {createSlice} from '@reduxjs/toolkit'

const INITIAL_State ={
    movieList:[],
}

const movie = createSlice({
    name:"moviedetial",
    initialState:INITIAL_State,
    reducers: {
        getMovie: (state)=>{
            state.movieList
        }
    }
})