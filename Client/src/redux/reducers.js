import {combineReducers} from "redux";
import forums from "./slices/ForumSlice";

const reducers =combineReducers({forums});

export default reducers;
