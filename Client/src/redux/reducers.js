import {combineReducers} from "redux";
import forumSlice from "./slices/ForumSlice";
import commentSlice from "./slices/CommentSlice";
import classs from "./slices/classline";
const reducers =combineReducers({forumSlice,commentSlice,classs});

export default reducers;
