import { createSlice } from '@reduxjs/toolkit';
 import {userRegister, userLogin, } from './usersOperators'
 

const initialState = {
    isLoggedIn: false,
    isloading: false
};

const usersSlice = createSlice({
  name: 'user',
    initialState,
        reducers: {
                setIsloggedIn: (state, action) => {
       state.isLoggedIn =action.payload 
                },
    },
         extraReducers: builder =>
        builder
        .addCase(userRegister.pending, (state, action) => {
                          state.isloading = true;

                  })
                  
                  .addCase(userRegister.fulfilled, (state, action) => {     
                           state.isloading = false
        
      })
                  .addCase(userRegister.rejected, (state, action) => {
                      state.isloading = false    
                  } 
    )
      
          .addCase(userLogin.pending, (state, action) => {
                          state.isloading = true;

                  })
                  
                  .addCase(userLogin.fulfilled, (state, action) => {     
                           state.isloading = false
        
      })
                  .addCase(userLogin.rejected, (state, action) => {
                      state.isloading = false    
                  } 
    )
         
});
         export const { setIsloggedIn  } = usersSlice.actions;
  
export const usersReducer = usersSlice.reducer;