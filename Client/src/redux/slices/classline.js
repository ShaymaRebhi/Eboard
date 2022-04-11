import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {createClass , getclassApi , getclassByYear} from  "../../utils/Class";


export const addClass = createAsyncThunk (
  "Class" , 
  async (Class ) => {
    const response = await createClass(Class);
    return response.data;
  }
)




let initialState = {
  class: [],
  errors: "",
};

const classlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    getClasss: (state, action) => {
      state.class = action.payload;
    },
    addClasss: (state, action) => {
      const payload = action.payload;
      state.class.push(payload);
    },
   
  },
});


//thunk
export const fetchclass = ( iduser,status) => async (dispatch) => {
  
    const resp = getclassApi.getclassByYear(iduser,status);
    resp.then((data) => {
      dispatch(getClasss(data));
    });

};
export const selectclass = (state) => {
  return [state.classs.class, state.classs.errors];
};

export const {
  getClasss,
  setErrors,
  addClasss,
} = classlice.actions;
export default classlice.reducer;





