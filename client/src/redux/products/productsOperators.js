 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"

export const catmenu = createAsyncThunk(
  "catmenu",
  async (__, thunkAPI) => {
    try {
        const response = await axios.get(`/products/catmenu`);
       
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNewItems = createAsyncThunk(
  "getNewItems",
  async (credentials, thunkAPI) => {
    
    try {
        const response = await axios.post(`/products/newProducts`, credentials);
        
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const singleProduct = createAsyncThunk(
  "getSingleProduct",
  async (credentials, thunkAPI) => {
    try {
     
      const response = await axios.post(`/products/getSingleProduct`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

