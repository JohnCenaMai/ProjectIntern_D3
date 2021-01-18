import api from "./../../utils/api";
import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const response = await api.get("/posts");

    dispatch({
      type: GET_POSTS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

// Like posts
export const likePost = (id) => async (dispatch) => {
  try {
    const response = await api.put(`/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

// Add post
export const addPost = (text, file, token) => async (dispatch) => {
  try {
    let formData = new FormData();
    formData.append("content", text);
    formData.append("image", file);

    const res = await axios.post("http://localhost:5000/api/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data.data);

    dispatch({
      type: ADD_POST,
      payload: res.data.data,
    });
  } catch (err) {}
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
