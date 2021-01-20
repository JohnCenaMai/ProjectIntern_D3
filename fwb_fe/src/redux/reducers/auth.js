import { getCookie } from "../../utils/cookie";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_FAIL,
  UPLOAD_PROFILE_SUCCESS,
  UPDATE_USER_HOBIT,
  AUTH_ERROR,
  JOIN_PREMIUM,
  LOGOUT,
} from "../actions/types";

const initialState = {
  token: getCookie("jwt"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        user: { ...state.user, imageUrl: payload },
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPLOAD_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_USER_HOBIT:
      return {
        ...state,
        user: { ...state.user, hobits: payload },
      };
    case JOIN_PREMIUM:
      return {
        ...state,
        user: { ...state, role: payload },
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
