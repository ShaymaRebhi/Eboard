import {combineReducers} from "redux";
import forumSlice from "./slices/ForumSlice";
import commentSlice from "./slices/CommentSlice";
import classs from "./slices/classline";
import user from "./slices/User";

const reducers =combineReducers({forumSlice,commentSlice,classs,user});

export default reducers;
