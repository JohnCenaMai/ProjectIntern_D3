import {
  LIKE_PEOPLE,
  ACCEPT_LIKE,
  REJECT_LIKE,
  GET_RANDOM_USER,
} from "../actions/types";

const initialState = {
  randoms: [],
  likes: [],
};

function matchingReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RANDOM_USER:
      state.randoms = payload.slice(0);
      return state;
    case LIKE_PEOPLE:
      return state;
    default:
      return state;
  }
}

export default matchingReducer;
