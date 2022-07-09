import http from "./httpService";

export const getCities = async () => {
  const { data } = await http.get("http://localhost:4000/api/location");
  return data;
};

export const getCategories = async () => {
  const { data } = await http.get("http://localhost:4000/api/category");
  return data;
};

export const login = (values) => {
  const res = http.post("http://localhost:4000/api/user/login", values);
  return res;
};

export const signup = (values) => {
  const res = http.post("http://localhost:4000/api/user/signup", values);
  return res;
};

export const submitOtp = (values) => {
  const res = http.post("http://localhost:4000/api/user/verify-email", values);
  return res;
};

export const getAllProducts = async (pageNumber, pageSize) => {
  // const res = await http.get(
  //   "http://localhost:4000/api/products?pageNumber=1&pageSize=12"
  // );
  const res = await http.get(
    `http://localhost:4000/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return res;
};

export const getTotalNumberOfProducts = async () => {
  const res = await http.get(
    "http://localhost:4000/api/products/totalProducts"
  );
  return res;
};

export const updateProfile = async (values) => {
  const res = await http.put(
    "http://localhost:4000/api/user/profile/update",
    values
  );
  console.log(res);
};
