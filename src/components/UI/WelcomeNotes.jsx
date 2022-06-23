import { Paper, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "grid",
    placeItems: "center",
    margin: "20px auto",
    width: "80vh",
  },
  logo: {
    textShadow: `${theme.palette.primary.light} -2px 0, cyan 2px 0`,
    marginBottom: "20px",
  },
  welcome: { color: `${theme.palette.primary.dark}` },
  description: {
    textShadow: `${theme.palette.primary.light} .5px .5px , ${theme.palette.secondary.light}  .5px .5px`,
  },
}));

const WelcomeNotes = () => {
  const classes = useStyles();
  return (
    <Paper elevation={16} className={classes.paper}>
      <Typography variant="h4" className={classes.logo}>
        Techno Marketplace
      </Typography>
      <Typography className={classes.welcome}>
        WELCOME to TECHNO MARKETPLACE
      </Typography>
      <Typography className={classes.description}>
        The trusted community of buyers and sellers.
      </Typography>
    </Paper>
  );
};

export default WelcomeNotes;
