import { createSlice } from "@reduxjs/toolkit";
import { userRegister } from "./userOperators";


const initialState = {
  isLoggedIn: false,
  isloading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, actions) => {
      state.isLoggedIn = actions.payload;
      console.log('setIsLoggedIn')
      console.log( state.isLoggedIn)
    },
    LoggedOut: (state, actions ) => {
      state.isLoggedIn = actions.payload;
            console.log('LoggedOut')
      console.log( state.isLoggedIn)

    },
   
  },
  extraReducers: (builder) =>
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
});
export const { setIsLoggedIn, LoggedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
