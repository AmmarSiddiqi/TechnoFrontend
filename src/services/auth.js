import jwtDecode from "jwt-decode";

export const getCurrentUser = () => {
  const jwtCode = localStorage.getItem("jwt");
  return jwtDecode(jwtCode);
};

export const getJwt = () => {
  return localStorage.getItem("jwt");
};
