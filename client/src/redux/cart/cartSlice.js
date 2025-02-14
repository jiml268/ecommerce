import { createSlice } from "@reduxjs/toolkit";
import {
  getCartByID,
  getCartByCartID,
  decreasequantity,
  getCart, 
  emptyCart
} from "./cartOperators";


const initialState = {
  cartID: "",
  currentCart: null,
  allCartItems: null,
  allCartImages: null
    
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
         
         .addCase(getCart.fulfilled, (state, action) => { 
         
           if (action.payload.data.cart.length > 0) {
           state.allCartItems = action.payload.data.cart
state.allCartImages =action.payload.data.images
           } else {
           state.allCartItems = null
             state.allCartImages = null  
              state.cartID = ""
             state.currentCart = null
           
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
     
         .addCase(emptyCart.fulfilled, (state, ) => { 
          
           state.currentCart = null
      state.cartID = ""
         })
});

     
export const { setCartID,  } = cartSlice.actions;


export const cartReducer = cartSlice.reducer;