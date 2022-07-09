import React, { useState, useEffect } from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Message from "./components/Messages/Message";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Product from "./components/Products/Product";
import Favourites from "./components/Products/Favorites";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AddProduct from "./components/Products/AddProduct";
import VerifyEmail from "./components/User/VerifyEmail";
import MyAds from "../src/components/Products/MyAds";
import Logout from "./components/User/Logout";
import Products from "./components/Products/Products";
import UpdateProfile from "./components/Profile/UpdateProfile";

const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#578ee6",
      main: "#3365b5",
      dark: "#0f2e61",
    },
    secondary: {
      light: "#e3424a",
      dark: "#5c0509",
      main: "#a81d24",
    },
    background: {
      default: "#ede4e4",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    const currentTheme = theme.palette.mode;
    return currentTheme === "light"
      ? setTheme(darkTheme)
      : setTheme(lightTheme);
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("jwt");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (ex) {}
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Toaster />
        <CssBaseline /> {/* Add basic stying to all the components*/}
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/updateProfile"
            element={<UpdateProfile user={user} />}
          />
          <Route path="/post" element={<AddProduct />} />
          <Route path="/myAds" element={<MyAds />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
