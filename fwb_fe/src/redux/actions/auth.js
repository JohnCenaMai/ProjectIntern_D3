import { removeCookie, setCookie } from "../../utils/cookie";
import api from "./../../utils/api";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  UPLOAD_PROFILE_IMAGE,
  LOGOUT,
  UPLOAD_PROFILE_SUCCESS,
  JOIN_PREMIUM,
  UPDATE_USER_HOBIT,
} from "./types";
import { setAlert } from "./alert";

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    const response = await api.get("/users/me");

    console.log("Load User");
    dispatch({
      type: USER_LOADED,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register
export const register = (username, birthday, gender, email, password) => async (
  dispatch
) => {
  const body = { username, birthday, gender, email, password };

  try {
    const response = await api.post("/auth/register", body);
    console.log(response.data.token);

    setCookie("jwt", response.data.token, {
      path: "/",
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
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

    setCookie("jwt", response.data.token, {
      path: "/",
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Upload profile image
export const uploadProfilePic = (id, token, file) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let formData = new FormData();
    formData.append("image", file);

    const response = await axios.patch(
      `http://localhost:5000/api/users/image/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// log out
export const logout = () => async (dispatch) => {
  try {
    removeCookie("jwt");

    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

// Edit profile
export const editProfile = (
  id,
  token,
  username,
  fullname,
  email,
  birthday,
  gender,
  description,
  country,
  region
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    let data = {
      username,
      fullname,
      email,
      birthday,
      gender,
      description,
      country,
      region,
    };

    const response = await axios.put(
      `http://localhost:5000/api/users/${id}`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: UPLOAD_PROFILE_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const joinPremium = (method, amount) => async (dispatch) => {
  try {
    const data = {
      method,
      amount,
    };

    const response = await api.post("/payment", data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data.data);
    dispatch({
      type: JOIN_PREMIUM,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserHobits = (id, hobits = []) => async (dispatch) => {
  try {
    let data = {
      hobits,
    };

    const response = await api.patch(
      `/users/hobits/${id}`,
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: UPDATE_USER_HOBIT,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
