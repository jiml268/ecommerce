import { createSlice } from '@reduxjs/toolkit';
 import {addAddress,editAddress, deleteAddress, getAllAddress, updateDefault } from './addressOperators'
 

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
        .addCase(addAddress.pending, (state, ) => {
            state.isloading = true;
            

                  })
                  
                  .addCase(addAddress.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(addAddress.rejected, (state, ) => {
                      state.isloading = false    
                  } 
        )     
    
                .addCase(editAddress.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(editAddress.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(editAddress.rejected, (state, ) => {
                      state.isloading = false    
                  } 
        ) 
         
                .addCase(deleteAddress.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(deleteAddress.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(deleteAddress.rejected, (state, ) => {
                      state.isloading = false    
                  } 
        ) 
         
                .addCase(getAllAddress.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(getAllAddress.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(getAllAddress.rejected, (state, ) => {
                      state.isloading = false    
                  } 
        ) 
          .addCase(updateDefault.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(updateDefault.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(updateDefault.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    ) 
         
});
         export const { setIsloggedIn  } = addressSlice.actions;
  
export const addressReducer = addressSlice.reducer;