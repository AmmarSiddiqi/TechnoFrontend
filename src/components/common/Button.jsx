import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

const Button = (props) => {
  const { onClick, variant, text, color, size, ...rest } = props;
  const classes = useStyles();
  return (
    <MuiButton
      {...rest}
      color={color || "primary"}
      variant={variant || "contained"}
      onClick={onClick}
      size={size || "large"}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
