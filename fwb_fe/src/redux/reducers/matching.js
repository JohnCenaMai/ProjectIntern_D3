import {
  LIKE_PEOPLE,
  ACCEPT_LIKE,
  REJECT_LIKE,
  GET_RANDOM_USER,
  GET_RECEIVED_LIKES,
  GET_SENT_LIKES,
} from "../actions/types";

const initialState = {
  randoms: [],
  likes: [],
  receives: [],
};

function matchingReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RANDOM_USER:
      state.randoms = payload.slice(0);
      return state;
    case GET_RECEIVED_LIKES:
      return { ...state, receives: payload };
    case GET_SENT_LIKES:
      return { ...state, likes: payload };
    case ACCEPT_LIKE:
    case REJECT_LIKE:
      return {
        ...state,
        receives: state.receives.filter(
          (receive) => receive.userId !== payload
        ),
      };
    case LIKE_PEOPLE:
      return state;
    default:
      return state;
  }
}

export default matchingReducer;
