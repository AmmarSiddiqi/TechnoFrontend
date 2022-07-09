import { Avatar, Button, Grid, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import SecurityIcon from "@mui/icons-material/Security";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { submitOtp } from "../../services/httpRequests";
import WelcomeNotes from "./../UI/WelcomeNotes";
import { getCurrentUser } from "../../services/auth";

const initialValues = { userId: "", otp: "" };

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "grid",
    placeItems: "center",
    borderRadius: "50px",
    height: "70vh",
    width: "70vh",
    margin: "30px auto",
  },
  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  singleInput: {
    caretColor: "transparent",
    width: "40px",
    height: "40px",
    border: "none",
    margin: "5px",
    borderRadius: "8px",
    backgroundColor: "#b0aeae",
    textDecoration: "none",
    fontSize: "30px",
    textAlign: "center",
  },
}));

const VerifyEmail = () => {
  const [values, setValues] = useState(initialValues);
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [forthInput, setForthInput] = useState("");
  const [fifthInput, setFifthInput] = useState("");
  const [sixthInput, setSixthInput] = useState("");
  const [enableValidateButton, setEnableValidateButton] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(Object.values(values.otp).length);
    if (Object.values(values.otp).length === 6) {
      doSubmit();
    } else toast.error("Please enter the 6 digits OTP.");
  };

  const doSubmit = async () => {
    console.log(values);
    try {
      const res = await submitOtp(values);
      toast.success(res.data);
      // setEmailVerified(true);
      window.location = "/";
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  useEffect(() => {
    getOtp();
  }, [sixthInput]);

  const getOtp = () => {
    const result = [
      firstInput,
      secondInput,
      thirdInput,
      forthInput,
      fifthInput,
      sixthInput,
    ];
    const otpValue = Object.values(result).join("");
    if (otpValue.length >= 6) setEnableValidateButton(false);
    const data = { ...values };
    data["userId"] = getCurrentUser()._id;
    data["otp"] = otpValue;
    setValues(data);
  };

  const handleFirstInputChange = ({ target }) => {
    const { name, value } = target;
    setFirstInput(value);
    document.getElementById("secondInput").focus();
  };

  const handleSecondInputChange = ({ target }) => {
    const { name, value } = target;
    setSecondInput(value);
    document.getElementById("thirdInput").focus();
  };

  const handleThirdInputChange = ({ target }) => {
    const { name, value } = target;
    setThirdInput(value);
    document.getElementById("forthInput").focus();
  };

  const handleForthInputChange = ({ target }) => {
    const { name, value } = target;
    setForthInput(value);
    document.getElementById("fifthInput").focus();
  };

  const handleFifthInputChange = ({ target }) => {
    const { name, value } = target;
    setFifthInput(value);
    document.getElementById("sixthInput").focus();
  };
  const handleSixthInputChange = ({ target }) => {
    const { name, value } = target;
    setSixthInput(value);
  };

  return (
    <>
      <WelcomeNotes />
      <Paper elevation={10} className={classes.paper}>
        {/* {emailVerified && <Navigate to="/login" replace={true} />} */}
        <Grid align="center" sx={{ marginTop: "77px" }}>
          <Avatar>
            <SecurityIcon color="primary" />
          </Avatar>

          <Typography variant="h4" component="div" gutterBottom>
            OTP Verification
          </Typography>
        </Grid>
        <Grid>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className="inputs">
              <input
                id="firstInput"
                autoComplete="off"
                className={classes.singleInput}
                name="firstInput"
                value={firstInput}
                onChange={handleFirstInputChange}
                maxLength={1}
              />
              <input
                id="secondInput"
                autoComplete="off"
                className={classes.singleInput}
                name="secondInput"
                value={secondInput}
                onChange={handleSecondInputChange}
                maxLength={1}
              />
              <input
                id="thirdInput"
                autoComplete="off"
                className={classes.singleInput}
                name="thirdInput"
                value={thirdInput}
                onChange={handleThirdInputChange}
                maxLength={1}
              />
              <input
                id="forthInput"
                autoComplete="off"
                className={classes.singleInput}
                name="forthInput"
                value={forthInput}
                onChange={handleForthInputChange}
                maxLength={1}
              />
              <input
                className={classes.singleInput}
                name="fifthInput"
                autoComplete="off"
                id="fifthInput"
                value={fifthInput}
                onChange={handleFifthInputChange}
                maxLength={1}
              />
              <input
                autoComplete="off"
                className={classes.singleInput}
                name="sixthInput"
                value={sixthInput}
                id="sixthInput"
                onChange={handleSixthInputChange}
                maxLength={1}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "15px" }}
              disabled={enableValidateButton}
            >
              Verify
            </Button>
          </form>
        </Grid>
        <Grid>
          <Button
            sx={{
              textDecoration: "none",
              variant: "outlined",
            }}
          >
            <span style={{ textDecoration: "none" }}>Resend OTP</span>
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default VerifyEmail;
