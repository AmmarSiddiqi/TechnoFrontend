import React, { Fragment, useState } from "react";
import "./App.css";
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline /> {/* Add basic stying to all the components*/}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product" element={<Product />} />
          <Route path="/post" element={<AddProduct />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/messages" element={<Message />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
