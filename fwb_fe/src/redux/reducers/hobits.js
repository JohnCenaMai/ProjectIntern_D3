import { getCookie } from "../../utils/cookie";
import { LOAD_HOBIT } from "../actions/types";

const initialState = [];

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_HOBIT:
      state = payload.slice(0);
      return state;
    default:
      return state;
  }
}

export default authReducer;
