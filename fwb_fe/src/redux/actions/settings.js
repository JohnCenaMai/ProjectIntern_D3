import { CHANGE_THEME } from "./types";

export const toogleDarkMode = () => (dispatch) => {
  dispatch({
    type: CHANGE_THEME,
  });
};
