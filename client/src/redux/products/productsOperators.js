 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "http://localhost:4000/api"

export const catmenu = createAsyncThunk(
  "catmenu",
  async (__, thunkAPI) => {
    try {
        const response = await axios.get(`/products/catmenu`);
        console.log(response)
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);