 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"

export const updateIDs = createAsyncThunk(
  "updateIDs",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/cart/updateIDs`, credentials); 
    return response;
    } catch (error) {
     
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCartByID = createAsyncThunk(
  "getCartByID",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/cart/getCartByID`, credentials); 
    return response;
    } catch (error) {
     
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

