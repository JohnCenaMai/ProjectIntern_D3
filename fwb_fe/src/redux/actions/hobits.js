import api from "./../../utils/api";
import { LOAD_HOBIT } from "./types";

export const getAllHobits = () => async (dispatch) => {
  try {
    const response = await api.get("/hobits");

    dispatch({
      type: LOAD_HOBIT,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
