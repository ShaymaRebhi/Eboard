import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  * as api from "../../utils/Forum";
import {updateComment} from "./CommentSlice";



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
    forum:null
};
export const ForumSlice = createSlice({
    name: "Forum",
    initialState,
    reducers: {
        getForums: ( state ,action)=> {
            state.values = action.payload
        },
        getForum: ( state ,action)=> {
            state.forum = action.payload
        },
        deleteForum:(state ,action)=>{
            const payload=action.payload;
            state.values=state.values.filter((forum)=>forum._id!==payload);
        },
        updateForum: (state, action) => {
            /*const payload = action.payload;
            const index = state.values.findIndex(
                (item) => item._id === payload._id
            );
            if (index !== -1) {
                state.values[index] = payload;
            }*/
            state.forum=action.payload;
        },

    },
    extraReducers: {
        [createForum.fulfilled]: (state, action) => {
            state.values.push(action.payload);
        },

    },


});

export const {
    getForums,
    getForum,
    deleteForum,
    updateForum
} = ForumSlice.actions;


export const affichage = () => async (dispatch) => {
    try {
        const {data} = await api.getForums();
        dispatch(getForums(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const searchForum = (search) => async (dispatch) => {
    try {
        const {data} = await api.searchForum(search);
        dispatch(getForums(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const getForumById = (id) => async (dispatch) => {
    try {
        const {data} = await api.getForumById(id);
        dispatch(getForum(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const update = (forum) => async (dispatch) => {
    try {
        let f=await api.updateForum(forum);
        console.log(f)
        dispatch(updateForum(f.data));
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
export const selectF = (state) => state.forumSlice.forum;


export default ForumSlice.reducer;
