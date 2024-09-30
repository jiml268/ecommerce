import { createSlice } from "@reduxjs/toolkit";
// import {
 
// } from "./userOperators";


const initialState = {
    currentColor: "",
    currentSize: ""
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      setCurrentColor: (state, actions) => {
        
        if (actions.payload) {
          state.currentColor = Number(actions.payload);
        } else {
          state.currentColor = null
      }

        },
         setCurrentSize:  (state, actions) => {
      state.currentSize = actions.payload;

    },
    },
     extraReducers: (builder) =>
    builder
     
});
     
export const { setCurrentColor, setCurrentSize } = productSlice.actions;


export const procuctReducer = productSlice.reducer;