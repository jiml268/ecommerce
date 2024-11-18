import { createSlice } from "@reduxjs/toolkit";
// import {
 
// } from "./cartOperators";


const initialState = {

};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        
    },
     extraReducers: (builder) =>
    builder
     
});

     
// export const {  } = paymentSlice.actions;


export const playmentReducer = paymentSlice.reducer;