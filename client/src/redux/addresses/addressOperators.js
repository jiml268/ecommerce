import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"

export const addAddress = createAsyncThunk(
  "/addAddress",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`address/getAllAddress`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editAddress = createAsyncThunk(
  "/editAddress",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`address/editAddress`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/deleteAddress",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`address/deleteAddress`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllAddress = createAsyncThunk(
  "/getAllAddress",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`address/getAllAddress`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDefault = createAsyncThunk(
  "/updateDefault",
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials)
      const response = await axios.post(`address/updateDefault`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);