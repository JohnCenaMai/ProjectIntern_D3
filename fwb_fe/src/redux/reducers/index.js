import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import hobits from "./hobits";
import matching from "./matching";

export default combineReducers({
  auth,
  alert,
  hobits,
  matching,
});
