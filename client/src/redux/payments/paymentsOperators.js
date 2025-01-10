 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"


export const paymentIntent = createAsyncThunk(
  "paymentIntent",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`stripe/paymentIntent`, credentials); 
    
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);

export const getStripeID = createAsyncThunk(
  "getStripeID",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`stripe/getStripeID`, credentials); 
    
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);

export const CreateStripeAcct = createAsyncThunk(
  "CreateStripeAcct",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`stripe/CreateStripeAcct`, credentials); 
    
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);

export const getallCards = createAsyncThunk(
  "getallCards",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`stripe/getAllCards`, credentials); 
    
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);
