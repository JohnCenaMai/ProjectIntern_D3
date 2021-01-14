import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookie = (name, value, path) => {
  cookies.set(name, value, path);
};

const getCookie = (name) => {
  let cookie = cookies.get(name);
  return cookie;
};

const removeCookie = (name) => {
  cookies.remove(name);
};

export { setCookie, getCookie, removeCookie };
