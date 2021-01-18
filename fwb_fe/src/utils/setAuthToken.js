import api from "./api";
import { setCookie, removeCookie } from "./cookie";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
    removeCookie("jwt");
  }
};

export default setAuthToken;
