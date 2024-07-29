import { createSlice } from "@reduxjs/toolkit";
import { userRegister, userVerification, resendVarify, userLogin, deleteUser } from "./userOperators";


const initialState = {
  isLoggedIn: false,
  isloading: false,
  userEmail: "",
  userId: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, actions) => {
      state.isLoggedIn = actions.payload;

    },
    LoggedOut: (state, actions ) => {
      state.isLoggedIn = actions.payload;
      state.userEmail = "";
      state.userId = "";

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
  .addCase(userVerification.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(userVerification.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(userVerification.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
  .addCase(resendVarify.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(resendVarify.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(resendVarify.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
  
         .addCase(userLogin.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(userLogin.fulfilled, (state, action) => {     
                    state.isloading = false
                    state.isLoggedIn =true
                    state.userId = action.payload.data.id
                    state.userEmail = action.payload.data.email
                    

        
      })
                  .addCase(userLogin.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
  .addCase(deleteUser.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(deleteUser.fulfilled, (state, action) => {     
                      state.isloading = false
                      state.userId = action.payload.data.id
                    

        
      })
                  .addCase(deleteUser.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
});
export const { setIsLoggedIn, LoggedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
