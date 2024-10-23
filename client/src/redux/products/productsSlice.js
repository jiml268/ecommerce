import { createSlice } from "@reduxjs/toolkit";
import {
  singleProduct
} from "./productsOperators";


const initialState = {
    currentColor: null,
    currentSize: null
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
      .addCase(singleProduct.fulfilled, (state) => {
          state.currentColor = null
          state.currentSize = null

        
      }
    )
     });
     
export const { setCurrentColor, setCurrentSize } = productSlice.actions;


export const procuctReducer = productSlice.reducer;