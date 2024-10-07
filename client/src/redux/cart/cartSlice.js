import { createSlice } from "@reduxjs/toolkit";
import {
 getCartByID
} from "./cartOperators";


const initialState = {
    cartID: "",
    
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      setCartID: (state, actions) => {
          state.cartID =actions.payload;
        },
        
    },
     extraReducers: (builder) =>
    builder
         .addCase(getCartByID.fulfilled, (state, action) => { 
           console.log(action.payload.data.cart)
           if (action.payload.data.cart.length > 0) {
                        console.log(action.payload.data.cart[0])

             
              state.cartID = action.payload.data.cart[0].cartNun
           }
           console.log(state.cartID)
      })
     
});
     
export const { setCartID,  } = cartSlice.actions;


export const cartReducer = cartSlice.reducer;