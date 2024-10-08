import { createSlice } from "@reduxjs/toolkit";
import {
  getCartByID,
  getCartByCartID,
  decreasequantity
} from "./cartOperators";


const initialState = {
  cartID: "",
  currentCart: null
    
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
           if (action.payload.data.cart.length > 0) {
             state.cartID = action.payload.data.cart[0].cartNun
             state.currentCart = action.payload.data.cart

           }
      })
     .addCase(getCartByCartID.fulfilled, (state, action) => { 
           if (action.payload.data.cart.length > 0) {
           state.currentCart = action.payload.data.cart

           }
           
     })
     .addCase(decreasequantity.fulfilled, (state, action) => { 
           if (action.payload.data.cart.length > 0) {
           state.currentCart = action.payload.data.cart
       }
           else {
            state.currentCart = null

       }
           
      })
});
     
export const { setCartID,  } = cartSlice.actions;


export const cartReducer = cartSlice.reducer;