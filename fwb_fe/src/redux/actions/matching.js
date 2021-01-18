import api from "./../../utils/api";
import {
  ACCEPT_LIKE,
  LIKE_PEOPLE,
  REJECT_LIKE,
  GET_RANDOM_USER,
} from "./types";

export const getRandomUser = () => async (dispatch) => {
  try {
    const response = await api.get("/users/random");

    console.log(response);
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
