import { createSlice } from "@reduxjs/toolkit";
import {
 
} from "./userOperators";


const initialState = {
 
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
     extraReducers: (builder) =>
    builder
     
     });

export const procuctReducer = productSlice.reducer;