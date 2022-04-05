import {combineReducers} from "redux";
import forumSlice from "./slices/ForumSlice";
import commentSlice from "./slices/CommentSlice";

const reducers =combineReducers({forumSlice,commentSlice});

export default reducers;
