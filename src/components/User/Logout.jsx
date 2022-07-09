const Logout = () => {
  localStorage.removeItem("jwt");
  window.location = "/login";
  return null;
};

export default Logout;
