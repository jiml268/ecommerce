import { createSlice } from "@reduxjs/toolkit";
import {
  userRegister,
  userVerification,
  resendVarify,
  userLogin,
  deleteUser, 
  retreiveProfile,
  updateProfile,
  updatePassWord,
  resetPassword,
} from "./userOperators";


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
                    if (action.payload.data.code === 200) {
                   
                      state.isLoggedIn = true
                      state.userId = action.payload.data.id
                      state.userEmail = action.payload.data.email
                      

                    }

        
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
   .addCase(updatePassWord.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(updatePassWord.fulfilled, (state, ) => {     
                      state.isloading = false
                    

        
      })
                  .addCase(updatePassWord.rejected, (state, ) => {
                      state.isloading = false    
                  } 
                    
                    
    )
   .addCase(resetPassword.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(resetPassword.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(resetPassword.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
    .addCase(updateProfile.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(updateProfile.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(updateProfile.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
  .addCase(retreiveProfile.pending, (state, ) => {
                          state.isloading = true;

                  })
                  
                  .addCase(retreiveProfile.fulfilled, (state, ) => {     
                           state.isloading = false
        
      })
                  .addCase(retreiveProfile.rejected, (state, ) => {
                      state.isloading = false    
                  } 
    )
  
});
export const { setIsLoggedIn, LoggedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
