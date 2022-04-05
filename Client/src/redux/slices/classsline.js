import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../../utils/Class";



export const getclassByYear = createAsyncThunk(
  "Class/getclassByYear",
  async (_id,status) => {
    const promise = await axios
      .get("http://localhost:3000/class/byyear" + _id + status )

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);



export const ClassSlice = createSlice({
  name: "Class",
  initialState: {
    class: [],
    
  },
  extraReducers: {
    
    [getclassByYear.fulfilled]: (state, action) => {
      state.class = action.payload;
    },
    

   
  },
});

export default ClassSlice.reducer;
