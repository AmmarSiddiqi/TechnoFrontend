import axios from "axios";
import { getJwt } from "./auth";

// axios.defaults.headers.common["x-auth-token"] = getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status > 399 &&
    error.response.status < 500;
  if (!expectedError) {
    console.error(error);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
