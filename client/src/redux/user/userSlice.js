import { createSlice } from "@reduxjs/toolkit";

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
     
});
export const { setIsLoggedIn, LoggedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
