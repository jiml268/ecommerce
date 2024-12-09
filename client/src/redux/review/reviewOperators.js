 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"

export const createReview = createAsyncThunk(
  
  "createReview",
  async (credentials, thunkAPI) => {
    console.log(credentials)
    try {
        const response = await axios.post(`/reviews/createReview`, credentials);
       
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);