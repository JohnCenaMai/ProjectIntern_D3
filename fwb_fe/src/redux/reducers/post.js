import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  LOAD_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  comments: [],
  loading: true,
  error: {},
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? { ...post, like: payload.like } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
        loading: false,
      };
    case LOAD_COMMENT:
      return {
        ...state,
        comments: payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [payload, ...state.comments],
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== payload),
      };
    default:
      return state;
  }
}

export default postReducer;
