import React from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Loading = ({ type, color }) => {
  const classes = useStyles();
  <ReactLoading
    type={type}
    color={color}
    height={"20%"}
    width={"20%"}
    className={classes.loading}
  />;
};

export default Loading;
