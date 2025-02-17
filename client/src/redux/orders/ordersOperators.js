 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"


export const allOrders = createAsyncThunk(
  "allOrders",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`/orders/allOrders`, credentials); 
      
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);

export const getdetails = createAsyncThunk(
  "getdetails",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`/orders/orderDatails`, credentials); 
      
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);