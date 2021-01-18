import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import hobits from "./hobits";

export default combineReducers({
  auth,
  alert,
  hobits,
});
