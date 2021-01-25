import api from "./../../utils/api";
import {
  ACCEPT_LIKE,
  LIKE_PEOPLE,
  REJECT_LIKE,
  GET_RANDOM_USER,
  GET_RECEIVED_LIKES,
  GET_SENT_LIKES,
} from "./types";

export const getRandomUser = () => async (dispatch) => {
  try {
    const response = await api.get("/users/random");

    dispatch({
      type: GET_RANDOM_USER,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePeople = (like_for) => async (dispatch) => {
  try {
    const response = await api.post("/matching", JSON.stringify({ like_for }));

    dispatch({
      type: LIKE_PEOPLE,
    });
  } catch (error) {
    console.log(error);
  }
};

export const acceptLike = (id) => async (dispatch) => {
  try {
    const response = await api.put(`/matching/${id}`);

    dispatch({
      type: ACCEPT_LIKE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const rejectLike = (id) => async (dispatch) => {
  try {
    const response = await api.put(`/matching/reject/${id}`);

    dispatch({
      type: REJECT_LIKE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReceivedLikes = () => async (dispatch) => {
  try {
    const response = await api.get("/matching/receive/me");

    dispatch({
      type: GET_RECEIVED_LIKES,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSentLikes = () => async (dispatch) => {
  try {
    const response = await api.get("/matching/me");

    dispatch({
      type: GET_SENT_LIKES,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
