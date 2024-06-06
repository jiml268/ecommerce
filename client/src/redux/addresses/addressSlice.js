import { createSlice } from '@reduxjs/toolkit';
 import {addAddress, } from './addressOperators'
 

const initialState = {
    isLoggedIn: false,
    isloading: false
};

const addressSlice = createSlice({
  name: 'address',
    initialState,
        reducers: {
                setIsloggedIn: (state, action) => {
       state.isLoggedIn =action.payload 
                },
    },
         extraReducers: builder =>
        builder
        .addCase(addAddress.pending, (state, action) => {
                          state.isloading = true;

                  })
                  
                  .addCase(addAddress.fulfilled, (state, action) => {     
                           state.isloading = false
        
      })
                  .addCase(addAddress.rejected, (state, action) => {
                      state.isloading = false    
                  } 
    )
      
         
});
         export const { setIsloggedIn  } = addressSlice.actions;
  
export const addressReducer = addressSlice.reducer;