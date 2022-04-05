import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  * as api from "../../utils/Class";


export const addClass = createAsyncThunk (
  "Class" , 
  async (Class, thunkAPI ) => {
    const response = await api.createClass(Class);
    return response.data;
  }
)

let initialState = {
  classs: [],
};


export const ClassSlice = createSlice({
  name: "Class",
  initialState,
  reducers: {
      getClass: ( state ,action)=> {
          state.classs = action.payload
      },
      

  },
  extraReducers: {
    [addClass.fulfilled]: (state, action) => {
        state.classs.push(action.payload.data);
    },

},
});

export const {
  getClass
 
} = ClassSlice.actions;

//thunk
export const affichage = () => async (dispatch) => {
 
      const res = api.getClass();
          res.then((data)=>{
            dispatch(getClass(data));
          });
      
     
 
};


export const selectClass = (state) => state.Classs;



export default ClassSlice.reducer;