import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookie = (name, value, path) => {
  cookies.set(name, value, path);
};

const getCookie = (name) => {
  let cookie = cookies.get(name);
  return cookie;
};

export { setCookie, getCookie };
