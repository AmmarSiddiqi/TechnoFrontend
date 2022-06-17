import { TextField } from "@mui/material";

const Textfeild = ({ value, title, type, error, required, ...rest }) => {
  return (
    <TextField
      {...rest}
      required={required}
      type={type}
      id="outlined-required"
      label={title}
      value={value}
      error={error}
    />
  );
};

export default Textfeild;
