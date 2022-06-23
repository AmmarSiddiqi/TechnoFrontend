import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Joi from "joi-browser";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { login } from "./../../services/httpRequests";
import toast from "react-hot-toast";
import WelcomeNotes from "./../UI/WelcomeNotes";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "grid",
    placeItems: "center",
    borderRadius: "50px",
    height: "70vh",
    width: "70vh",
    margin: "30px auto",
  },
  inputs: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "5px",
    marginBottom: "20px",
  },
}));

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enableLoginButton, setEnableLoginButton] = useState(true);
  const [successLogin, setSuccessLogin] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    validate();
  }, [values.email, values.password]);

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  };

  const validate = () => {
    const { error } = Joi.validate(values, schema, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    error.details.map((error) => {
      errors[error.path] = error.message;
    });
    setErrors(errors);
  };

  function validateProperty(name, value) {
    const obj = { [name]: value };
    const singleSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, singleSchema, { abortEarly: false });
    if (error) return error.details[0].message || null;
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const data = { ...values };
    data[name] = value;
    setValues(data);
    const error = { ...errors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) error[name] = errorMessage;
    else delete error[name];
    setErrors(error);
    if (Object.keys(errors).length === 0) setEnableLoginButton(false);
    else setEnableLoginButton(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login(values);
      console.log(values);
      console.log(res);
      localStorage.setItem("jwt", res.headers["x-auth-token"]);
      // if (res.data) setSuccessLogin(true);
      window.location = "/";
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <WelcomeNotes />
      <Paper className={classes.paper}>
        {/* {successLogin && <Navigate to="/" replace={true} />} */}
        <Grid align="center" sx={{ marginTop: "77px" }}>
          <Avatar>
            <LockIcon color="primary" />
          </Avatar>
          <Typography variant="h4" component="div" gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid>
          <form onSubmit={handleSubmit} className={classes.inputs}>
            <TextField
              className={classes.input}
              label="Email"
              fullWidth
              required
              variant="standard"
              value={values.email}
              onChange={handleChange}
              type="email"
              name="email"
              sx={{ margin: "5px 0px" }}
            />
            <TextField
              className={classes.input}
              fullWidth
              required
              label="Password"
              variant="standard"
              value={values.password}
              onChange={handleChange}
              type="password"
              name="password"
              sx={{ margin: "5px 0px" }}
            />
            <FormControlLabel
              sx={{ margin: "5px 0px" }}
              control={<Checkbox name="rememberMe" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={enableLoginButton}
              sx={{ width: "150px", margin: "5px" }}
            >
              Login
            </Button>
          </form>
        </Grid>
        <Link
          to="/signup"
          style={{
            width: "100%",
            border: "none",
            backgroundColor: "#3C4D6D",
            textDecoration: "none",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "100%", border: "none", backgroundColor: "#3C4D6D" }}
          >
            Signup
            <ArrowForwardIcon />
          </Button>
        </Link>
      </Paper>
    </>
  );
};

export default Login;
