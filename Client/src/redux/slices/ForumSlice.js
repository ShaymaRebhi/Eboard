import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  * as api from "../../utils/Forum";



export const createForum = createAsyncThunk(
    "forum",
    async (forum, thunkAPI) => {
        const response = await api.createForum(forum);
        console.log(response.data)
        return response.data;
    }
);

let initialState = {
    values: [],
};
export const ForumSlice = createSlice({
    name: "Forum",
    initialState,
    reducers: {
        getForums: ( state ,action)=> {
            state.values = action.payload
        },
        deleteForum:(state ,action)=>{
            const payload=action.payload;
            state.values=state.values.filter((forum)=>forum._id!==payload);
        }

    },
    extraReducers: {
        [createForum.fulfilled]: (state, action) => {
            state.values.push(action.payload);
        },

    },


});

export const {
    getForums,
    deleteForum
} = ForumSlice.actions;


export const affichage = () => async (dispatch) => {
    try {
        const {data} = await api.getForums();
        dispatch(getForums(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const supprimer = (id) => async (dispatch) => {
    try {
        await api.deleteForum(id);
        dispatch(deleteForum(id));
    } catch (error) {
        console.log(error.message);
    }
};
export const selectForum = (state) => state.forumSlice.values;


export default ForumSlice.reducer;
