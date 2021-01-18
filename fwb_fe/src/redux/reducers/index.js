import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./post";
import alert from "./alert";
import hobits from "./hobits";

export default combineReducers({
  auth,
  alert,
  hobits,
  posts
});
