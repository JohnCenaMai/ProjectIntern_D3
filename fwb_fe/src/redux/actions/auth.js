import { setCookie } from "../../utils/cookie";
import api from "./../../utils/api";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./types";

// Register
export const register = (username, age, gender, email, password) => async (
  dispatch
) => {
  const body = { username, age, gender, email, password };

  try {
    const response = await api.post("/auth/register", body);
    console.log(response.data.token);

    setCookie("jwt", response.data.token, { path: "/" });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const response = await api.post("/auth/login", body);
    console.log(response.data.token);

    setCookie("jwt", response.data.token, { path: "/" });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
