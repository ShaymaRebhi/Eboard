import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  * as api from "../../utils/Forum";



export const createForum = createAsyncThunk(
    "forum",
    async (forum, thunkAPI) => {
        const response = await api.createForum(forum);
        return response.data;
    }
);

let initialState = {
    forums: [],
};
export const ForumSlice = createSlice({
    name: "Forum",
    initialState,
    reducers: {
        getForums: ( state ,action)=> {
            state.forums = action.payload
        },
        deleteForum:(state ,action)=>{
            const payload=action.payload;
            state.forums=state.values.filter((forum)=>forum._id!==payload);
        }

    },
    extraReducers: {
        [createForum.fulfilled]: (state, action) => {
            state.forums.push(action.payload.data);
        },

    },


});

export const {
    getForums,
    deleteForum
} = ForumSlice.actions;

//thunk
export const affichage = () => async (dispatch) => {
    try {
        const { data } = await api.getForums();

        dispatch(getForums(data.data));
        console.log(data.data)
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
export const selectForum = (state) => state.forums;


export default ForumSlice.reducer;
