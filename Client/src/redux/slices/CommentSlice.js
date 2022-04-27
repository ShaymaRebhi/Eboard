import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  * as api from "../../utils/Comment";



export const createComment = createAsyncThunk(
    "comment",
    async (comment, thunkAPI) => {
        const response = await api.createComment(comment);
        console.log(response.data);
        return response.data;
    }
);

let initialState = {
    values: [],
};
export const CommentSlice = createSlice({
    name: "Comment",
    initialState,
    reducers: {
        getComments: ( state ,action)=> {
            state.values = action.payload
        },
        deleteComment:(state ,action)=>{
            const payload=action.payload;
            state.values=state.values.filter((comment)=>comment._id!==payload);
        },
        updateComment: (state, action) => {
            const payload = action.payload;
            const index = state.values.findIndex(
                (item) => item._id === payload._id
            );
            if (index !== -1) {
                state.values[index] = payload;
            }
        },

    },
    extraReducers: {
        [createComment.fulfilled]: (state, action) => {
            state.values.push(action.payload);
        },

    },
});

export const {
    getComments,
    deleteComment,
    updateComment
} = CommentSlice.actions;


export const affichageComment = (id) => async (dispatch) => {
    try {
        const {data} = await api.getCommentById(id);
        dispatch(getComments(data));
    } catch (error) {
        console.log(error.message);
    }
};

export const update = (comment) => async (dispatch) => {
    try {
        let c=await api.updateComment(comment);
        dispatch(updateComment(c.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const supprimer = (id) => async (dispatch) => {
    try {
        await api.deleteComment(id);
        dispatch(deleteComment(id));
    } catch (error) {
        console.log(error.message);
    }
};

export const like = (like) => async (dispatch) => {
    try {
        let comment= await api.likeComment(like);
        dispatch(updateComment(comment.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const dislike = (like) => async (dispatch) => {
    try {
        let comment= await api.dislikeComment(like);
        dispatch(updateComment(comment.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const selectComment = (state) => state.commentSlice.values;


export default CommentSlice.reducer;
