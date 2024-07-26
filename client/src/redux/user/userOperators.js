 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"

export const userRegister = createAsyncThunk(
  "registerUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/user/registerUser`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userVerification = createAsyncThunk(
  "userVerification",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/user/verify`, credentials);
      console.log(response)
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendVarify = createAsyncThunk(
  "resendVarify",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/user/resendVarify`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "userLogin",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/user/userLogin`, credentials);
      console.log(response)
      return response;
      
    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);