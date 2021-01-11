import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookie = (name, value, path) => {
  cookies.set(name, value, path);
};

export { setCookie };
