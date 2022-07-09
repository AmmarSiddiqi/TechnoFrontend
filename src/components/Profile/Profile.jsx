import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ShieldIcon from "@mui/icons-material/Shield";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const useStyles = makeStyles((theme) => ({
  profileImage: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: "70%",
    margin: "15px auto",
  },
  key: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "center",
  },
  value: {
    right: 0,
  },
  detail: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    left: "0",
  },
  paper: {
    display: "grid",
    placeItems: "center",
    borderRadius: "50px",
    height: "70vh",
    width: "80vh",
    margin: "30px auto",
  },
  footer: {
    marginBottom: "0",
    width: "100%",
  },
}));

const Profile = ({ user }) => {
  const { name, countryCode, email, phone, isVerified, image } = user;
  const classes = useStyles();

  return (
    <>
      <Paper elevation={14} className={classes.paper}>
        <div className={classes.profileImage}>
          <PhotoProvider>
            <PhotoView src={image}>
              <Avatar
                alt="profile"
                src={image}
                sx={{ width: 200, height: 200, margin: 2, cursor: "pointer" }}
              />
            </PhotoView>
          </PhotoProvider>
          <Typography variant="h6">{name}</Typography>
        </div>

        <div className={classes.details}>
          <div className={classes.detail}>
            <Typography className={classes.key}>
              <MailOutlineIcon />
              Email
            </Typography>
            <Typography className={classes.value}>{email}</Typography>
          </div>
          <div className={classes.detail}>
            <Typography className={classes.key}>
              <ShieldIcon />
              Account Verified
            </Typography>
            {isVerified ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              <CancelIcon sx={{ color: "red" }} />
            )}
          </div>
          <div className={classes.detail}>
            <Typography className={classes.key}>
              <CallEndIcon />
              Phone Number
            </Typography>
            <Typography className={classes.value}>
              {`${countryCode ? countryCode : ""} ${phone}`}
            </Typography>
          </div>
        </div>

        <div className={classes.footer}>
          <Button
            variant="outlined"
            sx={{
              color: "#3365B5",
              width: "50%",
              borderBottom: "none",
              borderLeft: "none",
            }}
          >
            <Link
              to="/updateProfile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Update Profile
            </Link>
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "red",
              width: "50%",
              borderBottom: "none",
              borderRight: "none",
            }}
          >
            <Link
              to="/logout"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Logout
            </Link>
          </Button>
        </div>
      </Paper>
    </>
  );
};

// name email countryCode phoneNumber isVerified image
export default Profile;
