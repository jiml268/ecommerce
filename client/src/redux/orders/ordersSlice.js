import { createSlice } from "@reduxjs/toolkit";
import {
 
} from "./ordersOperators";


const initialState = {

};

const ordersSlice = createSlice({
    name: "order",
    initialState,
  reducers: {
      
        
    },
     extraReducers: (builder) =>
    builder
         
});

     
// export const {  } = ordersSlice.actions;


export const orderReducer = ordersSlice.reducer;