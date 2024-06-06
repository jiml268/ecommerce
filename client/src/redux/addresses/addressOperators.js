import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"

export const addAddress = createAsyncThunk(
  "/addAddress",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/addAddress`, credentials);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);