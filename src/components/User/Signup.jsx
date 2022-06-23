import { Grid, Paper, TextField, Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Joi from "joi-browser";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import LockIcon from "@mui/icons-material/Lock";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { signup } from "../../services/httpRequests";
import WelcomeNotes from "./../UI/WelcomeNotes";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "grid",
    placeItems: "center",
    borderRadius: "50px",
    height: "90vh",
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

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
};

const Signup = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [enableSignupButton, setEnableSignupButton] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    validate();
  }, [values]);

  const schema = {
    name: Joi.string().min(3).max(256).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).max(15).required().label("Password"),
    phoneNumber: Joi.number().min(8).max(15).label("Phone Number"),
    confirmPassword: Joi.string()
      .min(8)
      .max(15)
      .required()
      .label("Confirm Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values, schema, options);
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
    if (Object.keys(errors).length <= 1) setEnableSignupButton(false);
    else setEnableSignupButton(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await signup(values);
      localStorage.setItem("jwt", res.headers["x-auth-token"]);
      if (res.data) setSignupSuccess(true);
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  return (
    <>
      <WelcomeNotes />{" "}
      <Paper className={classes.paper}>
        {signupSuccess && <Navigate to="/verifyEmail" replace={true} />}
        <Grid align="center" sx={{ marginTop: "77px" }}>
          <Avatar>
            <LockIcon color="primary" />
          </Avatar>
          <Typography variant="h4" component="div" gutterBottom>
            Signup
          </Typography>
        </Grid>
        <Grid>
          <form onSubmit={handleSubmit} className={classes.inputs}>
            <TextField
              sx={{ margin: "5px 0px" }}
              variant="standard"
              onChange={handleChange}
              label="Name"
              name="name"
              value={values.name}
              autoComplete="off"
              required
              fullWidth
            />
            <TextField
              sx={{ margin: "5px 0px" }}
              variant="standard"
              onChange={handleChange}
              autoComplete="off"
              label="Email"
              name="email"
              type="email"
              value={values.email}
              required
              fullWidth
            />
            <TextField
              sx={{ margin: "5px 0px" }}
              variant="standard"
              autoComplete="off"
              onChange={handleChange}
              label="Password"
              name="password"
              type="password"
              value={values.password}
              required
              fullWidth
            />
            <TextField
              sx={{ margin: "5px 0px" }}
              variant="standard"
              onChange={handleChange}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              required
              fullWidth
            />
            <TextField
              sx={{ margin: "5px 0px" }}
              variant="standard"
              onChange={handleChange}
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={values.phoneNumber}
              required
              fullWidth
            />
            <Button
              variant="contained"
              sx={{ width: "150px", margin: "5px" }}
              type="submit"
              color="primary"
              disabled={enableSignupButton}
            >
              Signup
            </Button>
          </form>
        </Grid>
        <Link
          to="/login"
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
            Login
            <ArrowForwardIcon />
          </Button>
        </Link>
      </Paper>
    </>
  );
};

export default Signup;
