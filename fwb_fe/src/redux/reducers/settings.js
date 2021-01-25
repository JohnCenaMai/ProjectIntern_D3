import { getCookie } from "../../utils/cookie";
import { CHANGE_THEME } from "../actions/types";
import { DARK_MODE, LIGHT_MODE } from "../../utils/colors";

const initialState = {
  isDarkMode: false,
  ...LIGHT_MODE,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_THEME:
      const isDarkMode = !state.isDarkMode;
      const colorObject = isDarkMode ? DARK_MODE : LIGHT_MODE;

      return {
        ...state,
        isDarkMode,
        ...colorObject,
      };
    default:
      return state;
  }
}

export default authReducer;
