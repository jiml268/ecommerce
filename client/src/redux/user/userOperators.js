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