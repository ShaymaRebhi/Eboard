import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getUserById = createAsyncThunk("class/userid", async (id) => {
  const { data } = await axios.get(
    "http://localhost:3000/class/userid/" + id
  );

  return data;
});





export const UserSlice = createSlice({
  name: "user",
  initialState: {
    Resources: "",
    UserById: null,
   
    
  },

  extraReducers: {
    
    [getUserById.fulfilled]: (state, action) => {
      state.UserById = action.payload;
      state.Resources = state.UserById.picture;
    },
    
  },
});
export default UserSlice.reducer;
