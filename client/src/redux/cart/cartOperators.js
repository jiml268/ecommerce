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


export const getCartByCartID = createAsyncThunk(
  "getCartByCartID",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/cart/getCartByCartID`, credentials); 
    return response;
    } catch (error) {
     
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addtocart = createAsyncThunk(
  "addtocart",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/cart/addtocart`, credentials); 
    return response;
    } catch (error) {
     
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const decreasequantity = createAsyncThunk(
  "decreasequantity",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/cart/decreasequantity`, credentials); 
    return response;
    } catch (error) {
     
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addquantity = createAsyncThunk(
  "addquantity",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/cart/addquantity`, credentials); 
    return response;
    } catch (error) {
     
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "deleteItem",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`/cart/deleteItem`, credentials); 
      
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "getCart",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`/cart/getCart`, credentials); 
      
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const saveForLater = createAsyncThunk(
  "saveForLater",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`/cart/saveForLater`, credentials); 
      
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);

export const emptyCart = createAsyncThunk(
  "emptyCart",
  async (credentials, thunkAPI) => {
    try {
    
      const response = await axios.post(`/cart/emptyCart`, credentials); 
      
      return response;
    } catch (error) {
           

      return thunkAPI.rejectWithValue(error.message);
    }
  }

  
);