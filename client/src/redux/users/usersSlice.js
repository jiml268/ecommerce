import { createSlice } from '@reduxjs/toolkit';
 import {userRegister, userLogin, } from './usersOperators'
 

const initialState = {
    isLoggedIn: false,
    isloading: false,
    userId: null
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
        .addCase(userRegister.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(userRegister.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(userRegister.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
      
          .addCase(userLogin.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(userLogin.fulfilled, (state, action) => {     
                      state.isloading = false
                      state.userId = action.payload.data.id
                    

        
      })
                  .addCase(userLogin.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
         
});
         export const { setIsloggedIn  } = usersSlice.actions;
  
export const usersReducer = usersSlice.reducer;